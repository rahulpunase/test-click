import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import {
  fetchUserMemberships as fetchUserMembershipsService,
  getMemberWithProfile as getMemberWithProfileService,
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
      return null;
    }
    return await getMemberWithProfileService(ctx, userId, args.workspaceId);
  },
});
