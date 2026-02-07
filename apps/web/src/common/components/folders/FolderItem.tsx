import { List } from "@repo/ui";
import { Folder as FolderIcon } from "lucide-react";
import type { SpaceContentItem } from "@repo/backend/spaces/queries";
import { SpaceContentRenderer } from "../spaces/SpaceContents";

export interface FolderItemProps {
  item: SpaceContentItem;
  level: number;
}

/**
 * Renders a folder item with its children recursively
 */
export const FolderItem = ({ item, level }: FolderItemProps) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <List.Item label={item.name} level={level}>
      <List.Item.Icon icon={FolderIcon} size="sm" />
      {hasChildren && (
        <List.Item.Expandable>
          {item.children.map((child) => (
            <SpaceContentRenderer
              key={child._id}
              item={child}
              level={level + 1}
            />
          ))}
        </List.Item.Expandable>
      )}
    </List.Item>
  );
};
