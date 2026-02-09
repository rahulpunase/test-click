import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";
import { getManyFrom } from "convex-helpers/server/relationships";

/**
 * Lists all spaces in a workspace.
 * - Admins/Creators: See all spaces
 * - Members: See public spaces + private spaces they created or have access to
 * - Guests: Only see spaces they have explicit access to via entity_access
 */
export const getSpaces = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    const member = await getMember(ctx, args.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    const spaces = await ctx.db
      .query("spaces")
      .withIndex("by_workspaceId", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    // Admins and Creators see all spaces
    if (member.role === "creator") {
      return spaces;
    }

    // Get all spaces this member has explicit access to
    const accessEntries = await ctx.db
      .query("entity_access")
      .withIndex("by_memberId", (q) => q.eq("memberId", member._id))
      .collect();

    const accessibleSpaceIds = new Set(
      accessEntries
        .filter((entry) => entry.entityType === "space")
        .map((entry) => entry.entityId),
    );

    return spaces.filter((space) => {
      // Guests can ONLY see spaces they have explicit access to
      if (member.role === "guest") {
        return accessibleSpaceIds.has(space._id);
      }

      // For private spaces: only creator or those with explicit access
      if (space.visibility === "private") {
        // Creator can always see their private spaces
        if (space.createdBy === member._id) return true;
        // Check for explicit access via entity_access
        return accessibleSpaceIds.has(space._id);
      }

      // Public spaces are visible to all members
      return true;
    });
  },
});

/**
 * Gets a single space by ID.
 */
export const getSpaceById = query({
  args: { id: v.id("spaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    const space = await ctx.db.get(args.id);
    if (!space) {
      return null;
    }

    const member = await getMember(ctx, space.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    return space;
  },
});

/**
 * Represents a single item in the space contents tree.
 * Can be either a project or a folder.
 */
export type SpaceContentItem = {
  _id: string;
  type: "project" | "folder";
  name: string;
  spaceId: string;
  parentId: string | null;
  color?: string;
  icon?: string;
  createdBy: string;
  updatedAt?: number;
  visibility?: "public" | "private";
  children: SpaceContentItem[];
};

/**
 * Fetches all content (projects, folders) for a space in a hierarchical tree structure.
 *
 * @param ctx - The query context.
 * @param args - The arguments for the query.
 * @param args.spaceId - The ID of the space to fetch contents for.
 * @returns An array of root-level content items, each with nested children.
 * @throws {Errors.Auth.unauthorized} If user is not authenticated.
 * @throws {Errors.Space.notFound} If space does not exist.
 * @throws {Errors.Member.notAMember} If user is not a workspace member.
 */
export const getSpaceContents = query({
  args: { spaceId: v.id("spaces") },
  handler: async (ctx, args): Promise<SpaceContentItem[]> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    const space = await ctx.db.get(args.spaceId);
    if (!space) {
      throw Errors.Space.notFound();
    }

    const member = await getMember(ctx, space.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    // Check space access based on visibility and role
    if (space.visibility === "private") {
      // Admins/Creators can always access
      if (member.role !== "admin" && member.role !== "creator") {
        // Check if user is creator or has explicit access
        const hasAccess = await ctx.db
          .query("entity_access")
          .withIndex("by_entity_and_member", (q) =>
            q
              .eq("entityType", "space")
              .eq("entityId", args.spaceId)
              .eq("memberId", member._id),
          )
          .first();

        if (space.createdBy !== member._id && !hasAccess) {
          throw Errors.Space.notFound();
        }
      }
    } else {
      // Public space - but guests still need explicit access
      if (member.role === "guest") {
        const hasAccess = await ctx.db
          .query("entity_access")
          .withIndex("by_entity_and_member", (q) =>
            q
              .eq("entityType", "space")
              .eq("entityId", args.spaceId)
              .eq("memberId", member._id),
          )
          .first();

        if (!hasAccess) {
          throw Errors.Space.notFound();
        }
      }
    }

    // Fetch all projects for the space
    const projects = await getManyFrom(
      ctx.db,
      "projects",
      "by_spaceId",
      args.spaceId,
    );

    // Fetch all folders for the space
    const allFolders = await getManyFrom(
      ctx.db,
      "folders",
      "by_spaceId",
      args.spaceId,
    );

    // Filter folders based on visibility
    const folders = allFolders.filter((folder) => {
      if (folder.visibility !== "private") return true;
      return folder.createdBy === member._id;
    });

    // Normalize projects to SpaceContentItem format
    const normalizedProjects: SpaceContentItem[] = projects.map((project) => ({
      _id: project._id,
      type: "project" as const,
      name: project.name,
      spaceId: args.spaceId,
      parentId: project.folderId ?? null,
      createdBy: project.createdBy,
      updatedAt: project.updatedAt,
      children: [], // Projects cannot have children
    }));

    // Normalize folders to SpaceContentItem format
    const normalizedFolders: SpaceContentItem[] = folders.map((folder) => ({
      _id: folder._id,
      type: "folder" as const,
      name: folder.name,
      spaceId: args.spaceId,
      parentId: folder.parentId ?? null,
      color: folder.color,
      icon: folder.icon,
      createdBy: folder.createdBy,
      updatedAt: folder.updatedAt,
      visibility: folder.visibility,
      children: [], // Will be populated by buildTree
    }));

    // Combine all items
    const allItems = [...normalizedProjects, ...normalizedFolders];

    // Build tree structure
    const buildTree = (items: SpaceContentItem[]): SpaceContentItem[] => {
      const itemMap = new Map<string, SpaceContentItem>();
      const rootItems: SpaceContentItem[] = [];

      // Create a map for quick lookup
      for (const item of items) {
        itemMap.set(item._id, { ...item, children: [] });
      }

      // Build parent-child relationships
      for (const item of items) {
        const mappedItem = itemMap.get(item._id)!;
        if (item.parentId === null) {
          rootItems.push(mappedItem);
        } else {
          const parent = itemMap.get(item.parentId);
          if (parent) {
            parent.children.push(mappedItem);
          } else {
            // Parent not found (could be private), treat as root
            rootItems.push(mappedItem);
          }
        }
      }

      return rootItems;
    };

    return buildTree(allItems);
  },
});
