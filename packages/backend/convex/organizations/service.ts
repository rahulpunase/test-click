import { QueryCtx } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getAll } from "convex-helpers/server/relationships";

export const fetchUserMemberships = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);

  if (!userId) {
    return [];
  }

  const memberships = await ctx.db
    .query("members")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .collect();

  const organizations = await getAll(
    ctx.db,
    memberships.map((m) => m.organizationId),
  );

  return memberships
    .map((membership, index) => ({
      ...membership,
      organization: organizations[index],
    }))
    .filter((m) => m.organization !== null);
};
