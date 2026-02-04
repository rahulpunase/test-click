import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";
import { createSidebar, getSidebar } from "./service";
import { homeSchema, navigationSchema, sectionSchema } from "./table";

/**
 * Updates the navigation items in the sidebar configuration.
 *
 * If the sidebar configuration exists, it updates the `navigation` field.
 * If not, it creates a new sidebar configuration with the provided `navigation`
 * and default values for other fields.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.workspaceId - The ID of the workspace.
 * @param args.navigation - The list of navigation items.
 * @throws {Errors.Auth.unauthenticated} If the user is not authenticated.
 * @throws {Errors.Member.notAMember} If the user is not a member of the workspace.
 */
export const updateNavigation = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    navigation: v.array(navigationSchema),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) {
      throw Errors.Member.notAMember();
    }

    const existingSidebar = await getSidebar(ctx, member._id);

    if (existingSidebar) {
      await ctx.db.patch(existingSidebar._id, {
        configuration: {
          ...existingSidebar.configuration,
          navigation: args.navigation,
        },
      });
    } else {
      await createSidebar(ctx, member._id, {
        navigation: args.navigation,
      });
    }
  },
});

/**
 * Updates the home items in the sidebar configuration.
 *
 * If the sidebar configuration exists, it updates the `home` field.
 * If not, it creates a new sidebar configuration with the provided `home`
 * and default values for other fields.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.workspaceId - The ID of the workspace.
 * @param args.home - The list of home items.
 * @throws {Errors.Auth.unauthenticated} If the user is not authenticated.
 * @throws {Errors.Member.notAMember} If the user is not a member of the workspace.
 */
export const updateHome = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    home: v.array(homeSchema),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) {
      throw Errors.Member.notAMember();
    }

    const existingSidebar = await getSidebar(ctx, member._id);

    if (existingSidebar) {
      await ctx.db.patch(existingSidebar._id, {
        configuration: {
          ...existingSidebar.configuration,
          home: args.home,
        },
      });
    } else {
      await createSidebar(ctx, member._id, {
        home: args.home,
      });
    }
  },
});

/**
 * Updates the custom sections in the sidebar configuration.
 *
 * If the sidebar configuration exists, it updates the `sections` field.
 * If not, it creates a new sidebar configuration with the provided `sections`
 * and default values for other fields.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.workspaceId - The ID of the workspace.
 * @param args.sections - The list of custom sections.
 * @throws {Errors.Auth.unauthenticated} If the user is not authenticated.
 * @throws {Errors.Member.notAMember} If the user is not a member of the workspace.
 */
export const updateSections = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    sections: v.array(sectionSchema),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) {
      throw Errors.Member.notAMember();
    }

    const existingSidebar = await getSidebar(ctx, member._id);

    if (existingSidebar) {
      await ctx.db.patch(existingSidebar._id, {
        configuration: {
          ...existingSidebar.configuration,
          sections: args.sections,
        },
      });
    } else {
      await createSidebar(ctx, member._id, {
        sections: args.sections,
      });
    }
  },
});
