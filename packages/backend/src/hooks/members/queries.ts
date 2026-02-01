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
