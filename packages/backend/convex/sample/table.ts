import { defineTable } from "convex/server";
import { v } from "convex/values";

export const sample = defineTable({
  name: v.string(),
  dob: v.string(), // Date of birth stored as ISO string
  gender: v.string(),
});
