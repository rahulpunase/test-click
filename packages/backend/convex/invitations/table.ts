import { defineTable } from "convex/server";
import { v } from "convex/values";

export const invitations = defineTable({
  workspaceId: v.id("workspaces"),
  createdBy: v.id("members"),
  token: v.string(),
  role: v.literal("member"),
  status: v.union(
    v.literal("pending"),
    v.literal("accepted"),
    v.literal("cancelled"),
    v.literal("expired"),
  ),
  expiresAt: v.number(),
  acceptedBy: v.optional(v.id("users")),
  acceptedAt: v.optional(v.number()),
})
  .index("by_token", ["token"])
  .index("by_workspaceId", ["workspaceId"])
  .index("by_workspaceId_and_status", ["workspaceId", "status"]);
