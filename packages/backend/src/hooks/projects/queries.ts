import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const useGetProjects = (spaceId: Id<"spaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.projects.queries.getProjects, { spaceId }),
  );
  return { data, isPending, error };
};
