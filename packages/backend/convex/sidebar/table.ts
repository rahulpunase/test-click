import { defineTable } from "convex/server";
import { v } from "convex/values";

export const navigationSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.string(),
  isPinned: v.boolean(),
  description: v.optional(v.string()),
});

export const homeSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.string(),
  isPinned: v.optional(v.boolean()),
  description: v.optional(v.string()),
});

export const sectionSchema = v.object({
  id: v.string(),
  title: v.string(),
  icon: v.string(),
  isPinned: v.optional(v.boolean()),
  description: v.optional(v.string()),
  isUserCreated: v.optional(v.boolean()),
});

export const sidebar = defineTable({
  memberId: v.id("members"),
  configuration: v.object({
    navigation: v.array(navigationSchema),
    home: v.array(homeSchema),
    sections: v.array(sectionSchema),
  }),
}).index("by_memberId", ["memberId"]);
