import { defineTable } from "convex/server";
import { v } from "convex/values";

export const projects = defineTable({
  spaceId: v.id("spaces"),
  name: v.string(),
  templateId: v.optional(v.id("templates")), // Future proofing
  createdBy: v.id("members"),
  updatedAt: v.optional(v.number()),
  folderId: v.optional(v.id("folders")),
  // Projects can contain Folders and Items directly
})
  .index("by_spaceId", ["spaceId"])
  .index("by_folderId", ["folderId"]);
