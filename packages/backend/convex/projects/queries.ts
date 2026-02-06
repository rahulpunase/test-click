import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";
import { getManyFrom } from "convex-helpers/server/relationships";

/**
 * Lists all projects in a space.
 */
export const getProjects = query({
  args: { spaceId: v.id("spaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    const space = await ctx.db.get(args.spaceId);
    if (!space) {
      throw Errors.Space.notFound();
    }

    const member = await getMember(ctx, space.workspaceId, userId);

    if (!member) {
      throw Errors.Member.notAMember();
    }

    // Check if space is private and user is not the creator
    if (space.isPrivate && space.createdBy !== member._id) {
      // Ideally we might want to return empty or throw not authorized
      // depending on how strict we want to be about "existence" of private spaces.
      // Usually if listing projects IN a space, you must have access to the space first.
      // logic from spaces/queries.ts implies private spaces are only visible to creator.
      throw Errors.Space.notFound(); // Or unauthorized
    }

    const projects = await getManyFrom(
      ctx.db,
      "projects",
      "by_spaceId",
      args.spaceId,
    );

    return projects;
  },
});
