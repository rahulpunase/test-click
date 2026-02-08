import { v } from "convex/values";
import { mutation } from "../_generated/server";
import {
  updateMemberProfile as updateMemberProfileService,
  getMember,
} from "./service";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getOneFrom } from "convex-helpers/server/relationships";

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

/**
 * Removes a member from a workspace.
 * Only admins and creators can remove members.
 * Cannot remove self or the workspace creator.
 */
export const removeMember = mutation({
  args: { memberId: v.id("members") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const memberToRemove = await ctx.db.get(args.memberId);
    if (!memberToRemove) {
      throw Errors.Member.notFound();
    }

    // Get current user's member record
    const currentMember = await getMember(
      ctx,
      memberToRemove.workspaceId,
      userId,
    );
    if (!currentMember) {
      throw Errors.Auth.unauthorized();
    }

    // Only admins and creators can remove members
    if (currentMember.role !== "admin" && currentMember.role !== "creator") {
      throw Errors.Auth.unauthorized();
    }

    // Cannot remove self
    if (memberToRemove._id === currentMember._id) {
      throw Errors.Member.cannotRemoveSelf();
    }

    // Cannot remove the creator
    if (memberToRemove.role === "creator") {
      throw Errors.Member.cannotRemoveCreator();
    }

    // Delete member profile first
    const profile = await getOneFrom(
      ctx.db,
      "member_profiles",
      "by_memberId",
      args.memberId,
    );
    if (profile) {
      await ctx.db.delete(profile._id);
    }

    // Delete the member
    await ctx.db.delete(args.memberId);
  },
});

/**
 * Changes a member's role in the workspace.
 * Only admins and creators can change roles.
 * Cannot change the creator's role or own role.
 */
export const changeMemberRole = mutation({
  args: {
    memberId: v.id("members"),
    newRole: v.union(
      v.literal("admin"),
      v.literal("member"),
      v.literal("guest"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const memberToUpdate = await ctx.db.get(args.memberId);
    if (!memberToUpdate) {
      throw Errors.Member.notFound();
    }

    // Get current user's member record
    const currentMember = await getMember(
      ctx,
      memberToUpdate.workspaceId,
      userId,
    );
    if (!currentMember) {
      throw Errors.Auth.unauthorized();
    }

    // Only admins and creators can change roles
    if (currentMember.role !== "admin" && currentMember.role !== "creator") {
      throw Errors.Auth.unauthorized();
    }

    // Cannot change the creator's role
    if (memberToUpdate.role === "creator") {
      throw Errors.Member.cannotModifyCreator();
    }

    // Cannot change own role
    if (memberToUpdate._id === currentMember._id) {
      throw Errors.Member.cannotModifySelf();
    }

    // Update the member's role
    await ctx.db.patch(args.memberId, {
      role: args.newRole,
    });
  },
});
