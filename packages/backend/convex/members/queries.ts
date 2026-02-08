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
