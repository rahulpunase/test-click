import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../types";

export const useGetWorkspaceById = (workspaceId: Id<"workspaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.workspaces.queries.getWorkspaceById, { workspaceId }),
  );

  return { data, isPending, error };
};

export const useGetWorkspaceBySlug = (slug: string) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.workspaces.queries.getWorkspaceBySlug, { slug }),
  );

  return { data, isPending, error };
};
