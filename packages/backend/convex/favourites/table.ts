import { defineTable } from "convex/server";
import { v } from "convex/values";

export const favourites = defineTable({
  memberId: v.id("members"), // Who favourited
  itemId: v.string(), // Generic ID (spaces/projects/folders)
  itemType: v.union(
    // Type discriminator
    v.literal("space"),
    v.literal("project"),
    v.literal("folder"),
  ),
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
})
  .index("by_memberId", ["memberId"])
  .index("by_memberId_and_itemId", ["memberId", "itemId"]);
