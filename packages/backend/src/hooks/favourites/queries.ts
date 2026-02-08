import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const useGetFavourites = (workspaceId: Id<"workspaces">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.favourites.queries.getFavourites, { workspaceId }),
  );
  return { data, isPending, error };
};

export const useIsFavourite = (
  workspaceId: Id<"workspaces">,
  itemId: string,
) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.favourites.queries.isFavourite, { workspaceId, itemId }),
  );
  return { data, isPending, error };
};
