import { Doc, Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

/**
 * Gets all projects in a space that are visible to a member.
 * Filters out private projects not created by the member.
 */
export async function getProjectsForMember(
  ctx: QueryCtx,
  spaceId: Id<"spaces">,
  memberId: Id<"members">,
) {
  return await ctx.db
    .query("projects")
    .withIndex("by_spaceId", (q) => q.eq("spaceId", spaceId))
    .filter((q) =>
      q.or(
        q.neq(q.field("visibility"), "private"),
        q.eq(q.field("createdBy"), memberId),
      ),
    )
    .collect();
}
