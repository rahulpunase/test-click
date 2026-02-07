import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";

/**
 * Creates a new folder in a space.
 */
export const createFolder = mutation({
  args: {
    spaceId: v.id("spaces"),
    name: v.string(),
    // Optional fields
    parentId: v.optional(v.id("folders")),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    type: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    // Get the space to find the workspace
    const space = await ctx.db.get(args.spaceId);
    if (!space) {
      throw Errors.Space.notFound();
    }

    // Check membership
    const member = await getMember(ctx, space.workspaceId, userId);
    if (!member) {
      throw Errors.Member.notAMember();
    }

    // If parentId is provided, validate it exists and belongs to the same space
    if (args.parentId) {
      const parentFolder = await ctx.db.get(args.parentId);
      if (!parentFolder) {
        throw new ConvexError("Parent folder not found");
      }
      if (parentFolder.spaceId !== args.spaceId) {
        throw new ConvexError("Parent folder must belong to the same space");
      }
    }

    const folderId = await ctx.db.insert("folders", {
      spaceId: args.spaceId,
      parentId: args.parentId,
      name: args.name,
      color: args.color,
      icon: args.icon,
      type: args.type,
      isPrivate: args.isPrivate,
      createdBy: member._id,
      updatedAt: Date.now(),
    });

    return folderId;
  },
});
