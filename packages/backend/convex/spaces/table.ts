import { defineTable } from "convex/server";
import { v } from "convex/values";

export const spaces = defineTable({
  workspaceId: v.id("workspaces"),
  name: v.string(),
  color: v.optional(v.string()), // Hex color code
  icon: v.optional(v.string()), // Icon name or emoji
  createdBy: v.id("members"),
  isPrivate: v.optional(v.boolean()), // If true, only the creator and invited members can see the space
  updatedAt: v.optional(v.number()),
}).index("by_workspaceId", ["workspaceId"]);
