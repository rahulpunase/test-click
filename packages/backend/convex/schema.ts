import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

/**
 * Database schema definition
 *
 * Define your tables and their structure here.
 * This provides TypeScript type safety and runtime validation.
 *
 * Example:
 * tasks: defineTable({
 *   text: v.string(),
 *   isCompleted: v.boolean(),
 * }),
 */
export default defineSchema({
  ...authTables,
  sample: defineTable({
    name: v.string(),
    dob: v.string(), // Date of birth stored as ISO string
    gender: v.string(),
  }),

  workspaces: defineTable({
    name: v.string(),
    slug: v.string(),
    logoId: v.optional(v.id("_storage")),
  }).index("by_slug", ["slug"]),

  members: defineTable({
    userId: v.id("users"),
    workspaceId: v.id("workspaces"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_userId", ["userId"])
    .index("by_workspaceId", ["workspaceId"])
    .index("by_workspaceId_and_userId", ["workspaceId", "userId"]),
});
