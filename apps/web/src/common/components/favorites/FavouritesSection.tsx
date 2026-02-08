import { List, Skeleton } from "@repo/ui";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import { useGetFavourites } from "@repo/backend/favourites/queries";
import { FavouriteItem } from "./FavouriteItem";

const NoFavourites = () => {
  return (
    <div className="flex flex-col gap-1 px-2">
      <span className="text-xs text-text-muted-2">
        No favourites -- Add favorites to see in this section{" "}
      </span>
    </div>
  );
};

export const FavouritesSection = () => {
  const { workSpace } = useGlobalData();
  const { data: favourites, isPending } = useGetFavourites(workSpace._id);

  // // Don't render the section if there are no favourites
  // if (!isPending) {
  //   return null;
  // }

  return (
    <List>
      <List.Group label="Favourites">
        {isPending ? (
          <div className="flex flex-col gap-1 px-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ) : favourites?.length === 0 ? (
          <NoFavourites />
        ) : (
          favourites?.map((favourite) => (
            <FavouriteItem key={favourite._id} favourite={favourite} />
          ))
        )}
      </List.Group>
    </List>
  );
};
