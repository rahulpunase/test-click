import { defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Entity Access table for managing fine-grained permissions
 *
 * Used to control who can access private entities (spaces, projects, folders).
 * When an entity has visibility: "private", only members listed here can access it.
 *
 * This is a FLAT permission model - each entity has independent visibility,
 * no inheritance from parent entities.
 *
 * Roles:
 * - owner: Full control (edit, delete, manage access)
 * - editor: Can create/edit content within the entity
 * - viewer: Read-only access
 */
export const entity_access = defineTable({
  // What type of entity this permission applies to
  entityType: v.union(
    v.literal("space"),
    v.literal("project"),
    v.literal("folder"),
  ),

  // The ID of the entity (stored as string to work with any table)
  entityId: v.string(),

  // The member who has access
  memberId: v.id("members"),

  // Level of access
  role: v.union(
    v.literal("owner"), // Full control, can delete, manage access
    v.literal("editor"), // Can edit content, create sub-items
    v.literal("viewer"), // Read-only
  ),

  // Metadata
  grantedBy: v.id("members"), // Who granted this access
  grantedAt: v.number(), // Timestamp when access was granted
})
  .index("by_entity", ["entityType", "entityId"])
  .index("by_memberId", ["memberId"])
  .index("by_entity_and_member", ["entityType", "entityId", "memberId"]);
