import { QueryCtx, MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { Errors } from "../errors/service";
import { getMember } from "../members/service";
import { getAuthUserId } from "@convex-dev/auth/server";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Generates a unique invite token using crypto.randomUUID
 */
export const generateInviteToken = (): string => {
  return crypto.randomUUID();
};

/**
 * Calculates the expiration timestamp (7 days from now)
 */
export const getExpirationTimestamp = (): number => {
  return Date.now() + SEVEN_DAYS_MS;
};

/**
 * Checks if an invitation has expired
 */
export const isInvitationExpired = (expiresAt: number): boolean => {
  return Date.now() > expiresAt;
};

/**
 * Validates that the current user has permission to manage invitations
 * Only admins and creators can invite members
 */
export const validateInvitePermission = async (
  ctx: QueryCtx,
  workspaceId: Id<"workspaces">,
): Promise<Id<"members">> => {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw Errors.Auth.unauthenticated();
  }

  const member = await getMember(ctx, workspaceId, userId);
  if (!member) {
    throw Errors.Member.notAMember();
  }

  if (member.role !== "admin" && member.role !== "creator") {
    throw Errors.Member.permissions();
  }

  return member._id;
};

/**
 * Gets an invitation by token
 */
export const getInvitationByToken = async (ctx: QueryCtx, token: string) => {
  return await ctx.db
    .query("invitations")
    .withIndex("by_token", (q) => q.eq("token", token))
    .unique();
};

/**
 * Validates an invitation is valid for acceptance
 */
export const validateInvitationForAcceptance = (
  invitation: {
    status: "pending" | "accepted" | "cancelled" | "expired";
    expiresAt: number;
  } | null,
) => {
  if (!invitation) {
    throw Errors.Invitation.notFound();
  }

  if (invitation.status === "accepted") {
    throw Errors.Invitation.alreadyAccepted();
  }

  if (invitation.status === "cancelled") {
    throw Errors.Invitation.cancelled();
  }

  if (
    invitation.status === "expired" ||
    isInvitationExpired(invitation.expiresAt)
  ) {
    throw Errors.Invitation.expired();
  }
};
