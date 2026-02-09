import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../types";

export const useFetchUserMemberships = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.members.queries.fetchUserMemberships, {}),
  );

  return { data, isPending, error };
};

export const useGetMemberWithProfile = (workspaceId: Id<"workspaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.members.queries.getMemberWithProfile, {
      workspaceId,
    }),
  );

  return { data, isPending, error };
};

export const useGetWorkspaceMembers = (workspaceId: Id<"workspaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.members.queries.getWorkspaceMembers, {
      workspaceId,
    }),
  );

  return { data, isPending, error };
};

export const useGetMemberStatus = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.members.queries.getMemberStatus, {}),
  );

  return { data, isPending, error };
};

export const useGetAnyMemberStatus = (memberId: Id<"members"> | undefined) => {
  const { data, isPending, error } = useQuery(
    convexQuery(
      api.members.queries.getAnyMemberStatus,
      memberId ? { memberId } : "skip",
    ),
  );

  return { data, isPending, error };
};
