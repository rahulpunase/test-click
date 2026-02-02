import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getMember } from "../members/service";

export const getSidebarConfiguration = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const member = await getMember(ctx, args.workspaceId, userId);

    if (!member) {
      throw new Error("User is not a member of this workspace");
    }

    const sidebar = await ctx.db
      .query("sidebar")
      .withIndex("by_memberId", (q) => q.eq("memberId", member._id))
      .unique();

    return sidebar?.configuration;
  },
});
