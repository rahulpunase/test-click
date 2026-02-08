import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

/**
 * Hook to fetch an invitation by its token.
 * Returns invitation details along with workspace info.
 */
export const useGetInvitationByToken = (token: string) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.invitations.queries.getByToken, { token }),
  );
  return { data, isPending, error };
};

/**
 * Hook to fetch all invitations for a workspace.
 * Only accessible by admins and creators.
 */
export const useGetWorkspaceInvitations = (workspaceId: Id<"workspaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.invitations.queries.getWorkspaceInvitations, {
      workspaceId,
    }),
  );
  return { data, isPending, error };
};
