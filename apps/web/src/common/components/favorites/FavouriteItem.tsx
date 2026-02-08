import { List, Button, Dropdown } from "@repo/ui";
import {
  Star,
  ListCheck,
  Folder as FolderIcon,
  Ellipsis,
  StarOff,
} from "lucide-react";
import { useRemoveFavourite } from "@repo/backend/favourites/mutations";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";

interface FavouriteWithInfo {
  _id: string;
  _creationTime: number;
  memberId: string;
  itemId: string;
  itemType: "space" | "project" | "folder";
  createdAt: number;
  updatedAt?: number;
  itemInfo: {
    name: string;
    _id: string;
  } | null;
}

interface FavouriteItemProps {
  favourite: FavouriteWithInfo;
}

const getIconForType = (type: "space" | "project" | "folder") => {
  switch (type) {
    case "space":
      return Star;
    case "project":
      return ListCheck;
    case "folder":
      return FolderIcon;
    default:
      return Star;
  }
};

export const FavouriteItem = ({ favourite }: FavouriteItemProps) => {
  const { workSpace } = useGlobalData();
  const { mutate: removeFavourite } = useRemoveFavourite();

  const handleRemoveFavourite = () => {
    removeFavourite({
      workspaceId: workSpace._id,
      itemId: favourite.itemId,
    });
  };

  const IconComponent = getIconForType(favourite.itemType);

  // Use the item name from itemInfo, or fallback to item type
  const displayName =
    favourite.itemInfo?.name ??
    `${favourite.itemType.charAt(0).toUpperCase()}${favourite.itemType.slice(1)}`;

  return (
    <List.Item label={displayName}>
      <List.Item.Icon icon={IconComponent} size="sm" />
      <List.Item.Action>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button
              variant="ghost"
              icon={Ellipsis}
              color="tertiary"
              size="xs"
            />
          </Dropdown.Trigger>
          <Dropdown.Content align="start" side="bottom">
            <Dropdown.Item
              icon={<StarOff />}
              label="Remove from favourites"
              onClick={handleRemoveFavourite}
            />
          </Dropdown.Content>
        </Dropdown>
      </List.Item.Action>
    </List.Item>
  );
};
