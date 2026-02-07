import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const useGetFolders = (spaceId: Id<"spaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.folders.queries.getFolders, { spaceId }),
  );
  return { data, isPending, error };
};

export const useGetFoldersByParent = (parentId: Id<"folders">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.folders.queries.getFoldersByParent, { parentId }),
  );
  return { data, isPending, error };
};

export const useGetFolder = (id: Id<"folders">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.folders.queries.getFolderById, { id }),
  );
  return { data, isPending, error };
};
