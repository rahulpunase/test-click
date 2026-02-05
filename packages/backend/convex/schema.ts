import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { sidebar } from "./sidebar/table";
import { workspaces } from "./workspaces/table";
import { members, member_profiles } from "./members/table";
import { sample } from "./sample/table";
import { spaces } from "./spaces/table";
import { projects } from "./projects/table";
import { folders } from "./folders/table";

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
  sample,
  workspaces,
  members,
  member_profiles,
  sidebar,
  spaces,
  projects,
  folders,
});
