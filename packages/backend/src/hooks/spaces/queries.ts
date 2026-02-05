import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const useGetSpaces = (workspaceId: Id<"workspaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.spaces.queries.getSpaces, { workspaceId }),
  );
  return { data, isPending, error };
};

export const useGetSpace = (id: Id<"spaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.spaces.queries.getSpaceById, { id }),
  );
  return { data, isPending, error };
};
