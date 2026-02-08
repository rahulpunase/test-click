import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";

/**
 * Gets all favourites for the current member in the workspace.
 * Also fetches the actual item info (name, id) for each favourite.
 *
 * @param ctx - The query context.
 * @param args - The arguments for the query.
 * @param args.workspaceId - The workspace to get favourites for.
 * @returns An array of favourite objects with item info.
 * @throws {Errors.Auth.unauthorized} If user is not authenticated.
 * @throws {Errors.Member.notAMember} If user is not a member of the workspace.
 */
export const getFavourites = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    // Check membership in the workspace
    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) {
      throw Errors.Member.notAMember();
    }

    // Get all favourites for this member
    const favourites = await ctx.db
      .query("favourites")
      .withIndex("by_memberId", (q) => q.eq("memberId", member._id))
      .collect();

    // Fetch item info for each favourite
    const favouritesWithInfo = await Promise.all(
      favourites.map(async (favourite) => {
        let itemInfo: { name: string; _id: string } | null = null;

        switch (favourite.itemType) {
          case "space": {
            const space = await ctx.db.get(
              favourite.itemId as unknown as import("../_generated/dataModel").Id<"spaces">,
            );
            if (space) {
              itemInfo = { name: space.name, _id: space._id };
            }
            break;
          }
          case "project": {
            const project = await ctx.db.get(
              favourite.itemId as unknown as import("../_generated/dataModel").Id<"projects">,
            );
            if (project) {
              itemInfo = { name: project.name, _id: project._id };
            }
            break;
          }
          case "folder": {
            const folder = await ctx.db.get(
              favourite.itemId as unknown as import("../_generated/dataModel").Id<"folders">,
            );
            if (folder) {
              itemInfo = { name: folder.name, _id: folder._id };
            }
            break;
          }
        }

        return {
          ...favourite,
          itemInfo,
        };
      }),
    );

    // Filter out favourites where the item no longer exists
    return favouritesWithInfo.filter((fav) => fav.itemInfo !== null);
  },
});

/**
 * Checks if a specific item is favourited by the current member.
 *
 * @param ctx - The query context.
 * @param args - The arguments for the query.
 * @param args.workspaceId - The workspace the user is in.
 * @param args.itemId - The ID of the item to check.
 * @returns True if the item is favourited, false otherwise.
 * @throws {Errors.Auth.unauthorized} If user is not authenticated.
 * @throws {Errors.Member.notAMember} If user is not a member of the workspace.
 */
export const isFavourite = query({
  args: {
    workspaceId: v.id("workspaces"),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthorized();
    }

    // Check membership in the workspace
    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) {
      throw Errors.Member.notAMember();
    }

    // Check if the item is favourited
    const favourite = await ctx.db
      .query("favourites")
      .withIndex("by_memberId_and_itemId", (q) =>
        q.eq("memberId", member._id).eq("itemId", args.itemId),
      )
      .unique();

    return favourite !== null;
  },
});
