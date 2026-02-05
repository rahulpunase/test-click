import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";

/**
 * Creates a new space in a workspace.
 */
export const createSpace = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
    // Optional fields
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    // Check membership and role
    const member = await getMember(ctx, args.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    // Only Admin or Creator can create spaces (public or private)
    // Members can ONLY create private spaces
    if (member.role !== "admin" && member.role !== "creator") {
      if (!args.isPrivate) {
        throw Errors.Member.permissions();
      }
    }

    const spaceId = await ctx.db.insert("spaces", {
      workspaceId: args.workspaceId,
      name: args.name,
      color: args.color,
      icon: args.icon,
      isPrivate: args.isPrivate,
      createdBy: member._id,
      updatedAt: Date.now(),
    });

    return spaceId;
  },
});
