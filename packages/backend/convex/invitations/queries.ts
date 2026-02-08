import { query } from "../_generated/server";
import { v } from "convex/values";
import {
  getInvitationByToken,
  isInvitationExpired,
  validateInvitePermission,
} from "./service";
import { Errors } from "../errors/service";

/**
 * Retrieves an invitation by its token along with workspace details.
 * This is a public query - anyone with the token can view.
 *
 * @param ctx - The query context.
 * @param args - The arguments for the query.
 * @param args.token - The unique invitation token.
 * @returns The invitation with workspace details, or throws if not found.
 */
export const getByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const invitation = await getInvitationByToken(ctx, args.token);

    if (!invitation) {
      throw Errors.Invitation.notFound();
    }

    const workspace = await ctx.db.get(invitation.workspaceId);

    if (!workspace) {
      throw Errors.Workspace.notFound();
    }

    // Check if expired and update status display
    const isExpired = isInvitationExpired(invitation.expiresAt);
    const displayStatus =
      isExpired && invitation.status === "pending"
        ? "expired"
        : invitation.status;

    return {
      ...invitation,
      status: displayStatus,
      workspace: {
        _id: workspace._id,
        name: workspace.name,
        logoId: workspace.logoId,
      },
    };
  },
});

/**
 * Retrieves all invitations for a workspace.
 * Only admins and creators can view this list.
 *
 * @param ctx - The query context.
 * @param args - The arguments for the query.
 * @param args.workspaceId - The workspace ID.
 * @returns List of invitations for the workspace.
 */
export const getWorkspaceInvitations = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    await validateInvitePermission(ctx, args.workspaceId);

    const invitations = await ctx.db
      .query("invitations")
      .withIndex("by_workspaceId", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    // Update display status for expired invitations
    return invitations.map((invitation) => ({
      ...invitation,
      status:
        isInvitationExpired(invitation.expiresAt) &&
        invitation.status === "pending"
          ? ("expired" as const)
          : invitation.status,
    }));
  },
});
