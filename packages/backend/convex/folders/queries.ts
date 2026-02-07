import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";
import { getManyFrom } from "convex-helpers/server/relationships";

/**
 * Lists all folders in a space.
 */
export const getFolders = query({
  args: { spaceId: v.id("spaces") },
  handler: async (ctx, args) => {
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

    const folders = await getManyFrom(
      ctx.db,
      "folders",
      "by_spaceId",
      args.spaceId,
    );

    // Filter private folders
    return folders.filter((folder) => {
      if (!folder.isPrivate) return true;
      return folder.createdBy === member._id;
    });
  },
});

/**
 * Lists all child folders of a parent folder.
 */
export const getFoldersByParent = query({
  args: { parentId: v.id("folders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    const parentFolder = await ctx.db.get(args.parentId);
    if (!parentFolder) {
      return [];
    }

    const space = await ctx.db.get(parentFolder.spaceId);
    if (!space) {
      throw Errors.Space.notFound();
    }

    const member = await getMember(ctx, space.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    const folders = await getManyFrom(
      ctx.db,
      "folders",
      "by_parentId",
      args.parentId,
    );

    // Filter private folders
    return folders.filter((folder) => {
      if (!folder.isPrivate) return true;
      return folder.createdBy === member._id;
    });
  },
});

/**
 * Gets a single folder by ID.
 */
export const getFolderById = query({
  args: { id: v.id("folders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    const folder = await ctx.db.get(args.id);
    if (!folder) {
      return null;
    }

    const space = await ctx.db.get(folder.spaceId);
    if (!space) {
      return null;
    }

    const member = await getMember(ctx, space.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    // Check access to private folder
    if (folder.isPrivate && folder.createdBy !== member._id) {
      return null;
    }

    return folder;
  },
});
