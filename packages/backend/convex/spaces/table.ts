import { defineTable } from "convex/server";
import { v } from "convex/values";

export const spaces = defineTable({
  workspaceId: v.id("workspaces"),
  name: v.string(),
  color: v.optional(v.string()), // Hex color code
  icon: v.optional(v.string()), // Icon name or emoji
  createdBy: v.id("members"),
  visibility: v.optional(v.union(v.literal("public"), v.literal("private"))), // "public" = all workspace members, "private" = only members in entity_access. Default: public
  updatedAt: v.optional(v.number()),
}).index("by_workspaceId", ["workspaceId"]);
