import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";
import { getManyFrom } from "convex-helpers/server/relationships";

/**
 * Lists all spaces in a workspace.
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

    return spaces.filter((space) => {
      // Public spaces are visible to everyone
      if (!space.isPrivate) return true;
      // Private spaces are visible only to the creator
      // In future: or if they are shared with the user
      return space.createdBy === member._id;
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
  isPrivate?: boolean;
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

    // Check if space is private and user is not the creator
    if (space.isPrivate && space.createdBy !== member._id) {
      throw Errors.Space.notFound();
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

    // Filter private folders
    const folders = allFolders.filter((folder) => {
      if (!folder.isPrivate) return true;
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
      isPrivate: folder.isPrivate,
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
