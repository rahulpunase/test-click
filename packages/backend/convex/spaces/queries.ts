import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";

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
