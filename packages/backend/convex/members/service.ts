import { MutationCtx, QueryCtx } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import {
  getAll,
  getOneFrom,
  getOneFromOrThrow,
} from "convex-helpers/server/relationships";
import { Id } from "../_generated/dataModel";
import { pruneNull } from "convex-helpers";
import { Errors } from "../errors/service";

export const fetchUserMemberships = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);

  if (!userId) {
    return [];
  }

  const memberships = await ctx.db
    .query("members")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .collect();

  const workspaces = await getAll(
    ctx.db,
    memberships.map((m) => m.workspaceId),
  );

  return pruneNull(
    memberships.map((membership, index) => {
      const workspace = workspaces[index];
      return workspace ? { ...membership, workspace } : null;
    }),
  );
};

export const createMember = async (
  ctx: MutationCtx,
  args: {
    userId: Id<"users">;
    workspaceId: Id<"workspaces">;
    role: "admin" | "member" | "creator";
  },
) => {
  const memberId = await ctx.db.insert("members", {
    userId: args.userId,
    workspaceId: args.workspaceId,
    role: args.role,
  });

  await createMemberProfile(ctx, memberId);
  // also create member

  return memberId;
};

export const createMemberProfile = async (
  ctx: MutationCtx,
  memberId: Id<"members">,
) => {
  await ctx.db.insert("member_profiles", {
    memberId,
  });
};

export const updateMemberProfile = async (
  ctx: MutationCtx,
  memberId: Id<"members">,
  updates: {
    name?: string;
    displayName?: string;
    role?: string;
    location?: string;
    bio?: string;
    contactEmail?: string;
    contactPhone?: string;
  },
) => {
  const existingProfile = await getOneFrom(
    ctx.db,
    "member_profiles",
    "by_memberId",
    memberId,
  );

  if (!existingProfile) {
    await ctx.db.insert("member_profiles", {
      memberId,
      ...updates,
    });
  } else {
    await ctx.db.patch(existingProfile._id, updates);
  }
};

export const getMemberWithProfile = async (
  ctx: QueryCtx,
  userId: Id<"users">,
  workspaceId: Id<"workspaces">,
) => {
  const member = await getMember(ctx, workspaceId, userId);

  if (!member) {
    throw Errors.Member.notFound();
  }

  const user = await ctx.db.get(member.userId);

  if (!user) {
    throw Errors.User.notFound();
  }

  const profile = await getOneFromOrThrow(
    ctx.db,
    "member_profiles",
    "by_memberId",
    member._id,
  );

  return { member, profile, user };
};

export const getMember = async (
  ctx: QueryCtx,
  workspaceId: Id<"workspaces">,
  userId: Id<"users">,
) => {
  return await ctx.db
    .query("members")
    .withIndex("by_workspaceId_and_userId", (q) =>
      q.eq("workspaceId", workspaceId).eq("userId", userId),
    )
    .unique();
};

/**
 * Gets all members of a workspace with their profiles and user data.
 */
export const getWorkspaceMembers = async (
  ctx: QueryCtx,
  workspaceId: Id<"workspaces">,
) => {
  const members = await ctx.db
    .query("members")
    .withIndex("by_workspaceId", (q) => q.eq("workspaceId", workspaceId))
    .collect();

  const membersWithData = await Promise.all(
    members.map(async (member) => {
      const user = await ctx.db.get(member.userId);
      const profile = await getOneFrom(
        ctx.db,
        "member_profiles",
        "by_memberId",
        member._id,
      );
      return { member, profile, user };
    }),
  );

  return pruneNull(membersWithData);
};
