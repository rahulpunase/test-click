import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getMember } from "../members/service";
import { Home, Navigations } from "../constants";
import { Errors } from "../errors/service";

export const getUserSidebarConfiguration = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const member = await getMember(ctx, args.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    const sidebar = await ctx.db
      .query("sidebar")
      .withIndex("by_memberId", (q) => q.eq("memberId", member._id))
      .unique();

    return sidebar?.configuration;
  },
});

export const getConstants = query({
  args: {},
  handler: async () => {
    return {
      navigations: Navigations,
      home: Home,
    };
  },
});
