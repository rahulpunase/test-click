import { v } from "convex/values";
import { Errors } from "../errors/service";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getOneFromOrThrow } from "convex-helpers/server/relationships";

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

    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    const workspace = await getOneFromOrThrow(
      ctx.db,
      "workspaces",
      "by_slug",
      args.slug,
    );

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspaceId_and_userId", (q) =>
        q.eq("workspaceId", workspace._id).eq("userId", userId),
      )
      .unique();

    if (!member) {
      throw Errors.Member.notAMember();
    }

    return workspace;
  },
});
