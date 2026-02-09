import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import {
  fetchUserMemberships as fetchUserMembershipsService,
  getMemberWithProfile as getMemberWithProfileService,
  getWorkspaceMembers as getWorkspaceMembersService,
} from "./service";

export const fetchUserMemberships = query({
  args: {},
  handler: async (ctx) => {
    return await fetchUserMembershipsService(ctx);
  },
});

export const getMemberWithProfile = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }
    return await getMemberWithProfileService(ctx, userId, args.workspaceId);
  },
});

/**
 * Gets all members of a workspace with their profiles and user data.
 * Requires the requesting user to be authenticated.
 */
export const getWorkspaceMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }
    return await getWorkspaceMembersService(ctx, args.workspaceId);
  },
});

/**
 * Gets the current user's status.
 *
 * @returns The member status or null if no status is set.
 */
export const getMemberStatus = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    // Get any existing member record for this user
    const members = await ctx.db
      .query("members")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    if (members.length === 0) {
      return null;
    }

    const member = members[0]!;

    // Get the status for this member
    const status = await ctx.db
      .query("member_status")
      .withIndex("by_memberId", (q) => q.eq("memberId", member._id))
      .first();

    return status;
  },
});

/**
 * Gets any member's status by their member ID.
 *
 * @param args.memberId - The ID of the member to get status for.
 * @returns The member status or null if no status is set.
 */
export const getAnyMemberStatus = query({
  args: { memberId: v.id("members") },
  handler: async (ctx, args) => {
    const status = await ctx.db
      .query("member_status")
      .withIndex("by_memberId", (q) => q.eq("memberId", args.memberId))
      .first();

    return status;
  },
});
