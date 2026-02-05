import { defineTable } from "convex/server";
import { v } from "convex/values";

export const workspaces = defineTable({
  name: v.string(),
  slug: v.string(),
  logoId: v.optional(v.id("_storage")),
}).index("by_slug", ["slug"]);
