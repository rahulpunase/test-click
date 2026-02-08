import { useAddFavourite } from "@repo/backend/favourites/mutations";
import { useRemoveFavourite } from "@repo/backend/favourites/mutations";
import { useIsFavourite } from "@repo/backend/favourites/queries";
import type { Id } from "@repo/backend/types";

type UseFavoritesActionsArgs = {
  workspaceId: Id<"workspaces">;
  itemId: Id<"spaces"> | Id<"projects"> | Id<"folders">;
  itemType: "space" | "project" | "folder";
};

export const useFavoritesActions = ({
  workspaceId,
  itemId,
  itemType,
}: UseFavoritesActionsArgs) => {
  const { mutate: addFavourite, isPending: isAdding } = useAddFavourite();
  const { mutate: removeFavourite, isPending: isRemoving } =
    useRemoveFavourite();
  const { data: isFavourite } = useIsFavourite(workspaceId, itemId);

  const isActionPending = isAdding || isRemoving;

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFavourite({ workspaceId, itemId });
    } else {
      addFavourite({ workspaceId, itemId, itemType });
    }
  };

  return {
    addFavourite,
    removeFavourite,
    isFavourite,
    toggleFavourite,
    isActionPending,
  };
};
