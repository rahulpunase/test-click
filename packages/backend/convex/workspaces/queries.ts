import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getWorkspaceById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.workspaceId);
  },
});

export const getWorkspaceBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const workspace = await ctx.db
      .query("workspaces")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!workspace) {
      return null;
    }

    let isMember = false;
    if (userId) {
      const member = await ctx.db
        .query("members")
        .withIndex("by_workspaceId_and_userId", (q) =>
          q.eq("workspaceId", workspace._id).eq("userId", userId),
        )
        .unique();
      isMember = !!member;
    }

    return {
      workspace,
      isMember,
    };
  },
});
