import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";

/**
 * Adds an item to the user's favourites.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.workspaceId - The workspace the user is currently in.
 * @param args.itemId - The ID of the item to favourite.
 * @param args.itemType - The type of item (space, project, or folder).
 * @returns The ID of the created favourite.
 * @throws {Errors.Auth.unauthorized} If user is not authenticated.
 * @throws {Errors.Member.notAMember} If user is not a member of the workspace.
 * @throws {Errors.Favourite.alreadyExists} If item is already favourited.
 */
export const addFavourite = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    itemId: v.string(),
    itemType: v.union(
      v.literal("space"),
      v.literal("project"),
      v.literal("folder"),
    ),
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

    // Check if already favourited
    const existingFavourite = await ctx.db
      .query("favourites")
      .withIndex("by_memberId_and_itemId", (q) =>
        q.eq("memberId", member._id).eq("itemId", args.itemId),
      )
      .unique();

    if (existingFavourite) {
      throw Errors.Favourite.alreadyExists();
    }

    // Create the favourite
    const favouriteId = await ctx.db.insert("favourites", {
      memberId: member._id,
      itemId: args.itemId,
      itemType: args.itemType,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return favouriteId;
  },
});

/**
 * Removes an item from the user's favourites.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.workspaceId - The workspace the user is currently in.
 * @param args.itemId - The ID of the item to unfavourite.
 * @returns True if successfully removed.
 * @throws {Errors.Auth.unauthorized} If user is not authenticated.
 * @throws {Errors.Member.notAMember} If user is not a member of the workspace.
 * @throws {Errors.Favourite.notFound} If the favourite doesn't exist.
 */
export const removeFavourite = mutation({
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

    // Find the favourite
    const favourite = await ctx.db
      .query("favourites")
      .withIndex("by_memberId_and_itemId", (q) =>
        q.eq("memberId", member._id).eq("itemId", args.itemId),
      )
      .unique();

    if (!favourite) {
      throw Errors.Favourite.notFound();
    }

    // Delete the favourite
    await ctx.db.delete(favourite._id);

    return true;
  },
});
