import { defineTable } from "convex/server";
import { v } from "convex/values";

export const folders = defineTable({
  projectId: v.id("projects"), // Root container
  parentId: v.optional(v.id("folders")), // Recursive: Parent folder (null if top-level in project)
  name: v.string(),
  color: v.optional(v.string()), // Hex color code
  icon: v.optional(v.string()), // Icon name or emoji
  type: v.optional(v.string()), // Optional: For future "versatility" (e.g., custom folder types)
  createdBy: v.id("members"),
  updatedAt: v.optional(v.number()),
})
  .index("by_projectId", ["projectId"])
  .index("by_parentId", ["parentId"]);
