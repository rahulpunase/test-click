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
});
