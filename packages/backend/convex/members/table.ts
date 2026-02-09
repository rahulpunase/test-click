import { defineTable } from "convex/server";
import { v } from "convex/values";

export const members = defineTable({
  userId: v.id("users"),
  workspaceId: v.id("workspaces"),
  role: v.union(
    v.literal("admin"),
    v.literal("member"),
    v.literal("creator"),
    v.literal("guest"),
  ),
})
  .index("by_userId", ["userId"])
  .index("by_workspaceId", ["workspaceId"])
  .index("by_workspaceId_and_userId", ["workspaceId", "userId"]);

export const member_profiles = defineTable({
  memberId: v.id("members"),
  name: v.optional(v.string()),
  displayName: v.optional(v.string()),
  role: v.optional(v.string()),
  location: v.optional(v.string()),
  bio: v.optional(v.string()),
  contactEmail: v.optional(v.string()),
  contactPhone: v.optional(v.string()),
}).index("by_memberId", ["memberId"]);

export const member_status = defineTable({
  memberId: v.id("members"),
  status: v.union(
    v.literal("in_meeting"),
    v.literal("focus"),
    v.literal("sick"),
    v.literal("vacation"),
    v.literal("custom"),
  ),
  customText: v.optional(v.string()), // For custom status text
  emoji: v.optional(v.string()), // Status emoji
  expiresAt: v.optional(v.number()), // Unix timestamp for auto-clear
}).index("by_memberId", ["memberId"]);
