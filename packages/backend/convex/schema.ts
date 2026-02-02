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
    role: v.union(
      v.literal("admin"),
      v.literal("member"),
      v.literal("creator"),
    ),
  })
    .index("by_userId", ["userId"])
    .index("by_workspaceId", ["workspaceId"])
    .index("by_workspaceId_and_userId", ["workspaceId", "userId"]),

  member_profiles: defineTable({
    memberId: v.id("members"),
    name: v.optional(v.string()),
    displayName: v.optional(v.string()),
    role: v.optional(v.string()),
    location: v.optional(v.string()),
    bio: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
  }).index("by_memberId", ["memberId"]),

  sidebar: defineTable({
    memberId: v.id("members"),
    configuration: v.object({
      navigation: v.array(
        v.object({
          id: v.string(),
          title: v.string(),
          icon: v.string(),
          isSelected: v.optional(v.boolean()),
          description: v.optional(v.string()),
        }),
      ),
      home: v.array(
        v.object({
          id: v.string(),
          title: v.string(),
          icon: v.string(),
          isSelected: v.optional(v.boolean()),
          description: v.optional(v.string()),
        }),
      ),
      sections: v.array(
        v.object({
          id: v.string(),
          title: v.string(),
          icon: v.string(),
          isSelected: v.optional(v.boolean()),
          description: v.optional(v.string()),
          isUserCreated: v.optional(v.boolean()),
        }),
      ),
    }),
  }).index("by_memberId", ["memberId"]),
});
