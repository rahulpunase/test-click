import { query } from "../_generated/server";
import * as service from "./service";

/**
 * Fetch the current user's information (nullable)
 */
export const fetchCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await service.fetchCurrentUser(ctx);
  },
});

/**
 * Get the current user's information (throws if null)
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await service.fetchCurrentUser(ctx);
    if (!currentUser) {
      throw new Error("User is not authenticated");
    }
    return currentUser;
  },
});

export const getIdentity = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.auth.getUserIdentity();
  },
});
