import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { getOneFrom } from "convex-helpers/server/relationships";
import { createMember } from "../members/service";

export const createTemporaryWorkspace = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User is not authenticated");
    }

    // Generate a temporary name and slug
    // Since we don't have nanoid, we'll use a simple random string
    const randomString = Math.random().toString(36).substring(2, 8);
    const name = "Untitled Workspace";
    const slug = `untitled-workspace-${randomString}`;

    const workspaceId = await ctx.db.insert("workspaces", {
      name,
      slug,
    });

    await createMember(ctx, {
      userId,
      workspaceId,
      role: "creator",
    });

    return workspaceId;
  },
});

export const updateName = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspaceId_and_userId", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId),
      )
      .unique();

    if (!member || member.role !== "creator") {
      throw new Error(
        "Unauthorized: Only creator can update workspace details during onboarding",
      );
    }

    const newSlug = args.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check for uniqueness
    const existing = await getOneFrom(ctx.db, "workspaces", "by_slug", newSlug);

    if (existing && existing._id !== args.workspaceId) {
      throw new Error(
        "Workspace with this URL already exists. Please choose a different name.",
      );
    }

    await ctx.db.patch(args.workspaceId, {
      name: args.name,
      slug: newSlug,
    });

    return args.workspaceId;
  },
});
