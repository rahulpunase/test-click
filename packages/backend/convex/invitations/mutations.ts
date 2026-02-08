import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Errors } from "../errors/service";
import { getMember, createMember } from "../members/service";
import {
  generateInviteToken,
  getExpirationTimestamp,
  getInvitationByToken,
  validateInvitationForAcceptance,
  validateInvitePermission,
} from "./service";

/**
 * Creates a new invitation for a workspace.
 * Only admins and creators can create invitations.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.workspaceId - The workspace to create an invitation for.
 * @returns The created invitation with token.
 */
export const createInvitation = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const memberId = await validateInvitePermission(ctx, args.workspaceId);

    const token = generateInviteToken();
    const expiresAt = getExpirationTimestamp();

    const invitationId = await ctx.db.insert("invitations", {
      workspaceId: args.workspaceId,
      createdBy: memberId,
      token,
      role: "member",
      status: "pending",
      expiresAt,
    });

    return {
      _id: invitationId,
      token,
      expiresAt,
    };
  },
});

/**
 * Cancels an existing invitation.
 * Only admins and creators can cancel invitations.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.invitationId - The invitation to cancel.
 */
export const cancelInvitation = mutation({
  args: { invitationId: v.id("invitations") },
  handler: async (ctx, args) => {
    const invitation = await ctx.db.get(args.invitationId);

    if (!invitation) {
      throw Errors.Invitation.notFound();
    }

    await validateInvitePermission(ctx, invitation.workspaceId);

    if (invitation.status !== "pending") {
      throw Errors.Invitation.alreadyAccepted();
    }

    await ctx.db.patch(args.invitationId, {
      status: "cancelled",
    });
  },
});

/**
 * Resends an invitation by resetting its expiration.
 * Only admins and creators can resend invitations.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.invitationId - The invitation to resend.
 * @returns The updated invitation with new expiration.
 */
export const resendInvitation = mutation({
  args: { invitationId: v.id("invitations") },
  handler: async (ctx, args) => {
    const invitation = await ctx.db.get(args.invitationId);

    if (!invitation) {
      throw Errors.Invitation.notFound();
    }

    await validateInvitePermission(ctx, invitation.workspaceId);

    if (invitation.status === "accepted") {
      throw Errors.Invitation.alreadyAccepted();
    }

    if (invitation.status === "cancelled") {
      throw Errors.Invitation.cancelled();
    }

    const newExpiresAt = getExpirationTimestamp();

    await ctx.db.patch(args.invitationId, {
      status: "pending",
      expiresAt: newExpiresAt,
    });

    return {
      _id: args.invitationId,
      token: invitation.token,
      expiresAt: newExpiresAt,
    };
  },
});

/**
 * Accepts an invitation and adds the user as a member.
 * User must be authenticated.
 *
 * @param ctx - The mutation context.
 * @param args - The arguments for the mutation.
 * @param args.token - The invitation token.
 * @returns The workspace ID the user was added to.
 */
export const acceptInvitation = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Errors.Auth.unauthenticated();
    }

    const invitation = await getInvitationByToken(ctx, args.token);
    validateInvitationForAcceptance(invitation);

    // TypeScript knows invitation is not null after validation
    const validInvitation = invitation!;

    // Check if user is already a member of this workspace
    const existingMember = await getMember(
      ctx,
      validInvitation.workspaceId,
      userId,
    );
    if (existingMember) {
      throw Errors.Invitation.alreadyMember();
    }

    // Create the member
    await createMember(ctx, {
      userId,
      workspaceId: validInvitation.workspaceId,
      role: validInvitation.role,
    });

    // Update the invitation
    await ctx.db.patch(validInvitation._id, {
      status: "accepted",
      acceptedBy: userId,
      acceptedAt: Date.now(),
    });

    return {
      workspaceId: validInvitation.workspaceId,
    };
  },
});
