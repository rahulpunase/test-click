import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx } from "../_generated/server";

/**
 * Service layer for user-related operations
 */

/**
 * Fetch the current user's identity and database record
 */
export const fetchCurrentUser = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);

  let user = null;
  if (userId) {
    user = await ctx.db.get(userId);
  }

  return user;
};
