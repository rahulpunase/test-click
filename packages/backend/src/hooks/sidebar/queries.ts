import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const useGetUserSidebarConfiguration = (
  workspaceId: Id<"workspaces">,
) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.sidebar.queries.getUserSidebarConfiguration, {
      workspaceId,
    }),
  );
  return { data, isPending, error };
};

export const useGetConstants = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.sidebar.queries.getConstants),
  );
  return { data, isPending, error };
};
