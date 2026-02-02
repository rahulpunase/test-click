import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { updateMemberProfile as updateMemberProfileService } from "./service";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";

export const updateMemberProfile = mutation({
  args: {
    memberId: v.id("members"),
    name: v.optional(v.string()),
    displayName: v.optional(v.string()),
    role: v.optional(v.string()),
    location: v.optional(v.string()),
    bio: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const member = await ctx.db.get(args.memberId);
    if (!member) {
      throw Errors.Member.notFound();
    }

    if (member.userId !== userId) {
      throw Errors.Auth.unauthorized();
    }

    const { memberId, ...updates } = args;
    await updateMemberProfileService(ctx, memberId, updates);
  },
});
