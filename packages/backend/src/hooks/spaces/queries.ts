import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// Re-export type for frontend usage
export type { SpaceContentItem } from "../../../convex/spaces/queries";

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

/**
 * Hook to fetch all content (projects, folders) for a space in a hierarchical tree structure.
 * @param spaceId - The ID of the space to fetch contents for.
 * @returns data - Array of root-level content items with nested children.
 */
export const useGetSpaceContents = (spaceId: Id<"spaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.spaces.queries.getSpaceContents, { spaceId }),
  );
  return { data, isPending, error };
};
