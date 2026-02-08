import { List, Button, Dropdown, Separator } from "@repo/ui";
import {
  Folder as FolderIcon,
  Ellipsis,
  Plus,
  ChevronRight,
  ListCheck,
  Folder,
} from "lucide-react";
import type { SpaceContentItem } from "@repo/backend/spaces/queries";
import type { Id } from "@repo/backend/types";
import { SpaceContentRenderer } from "../spaces/SpaceContents";
import { useCreateFolderStore } from "./store";
import { useCreateProjectStore } from "../projects/store";

export interface FolderItemProps {
  item: SpaceContentItem;
  level: number;
}

/**
 * Renders a folder item with its children recursively
 */
export const FolderItem = ({ item, level }: FolderItemProps) => {
  const { open: openFolderDialog } = useCreateFolderStore();
  const { open: openProjectDialog } = useCreateProjectStore();
  const hasChildren = item.children && item.children.length > 0;

  const folderId = item._id as unknown as Id<"folders">;
  const spaceId = item.spaceId as unknown as Id<"spaces">;

  const handleCreateFolder = () => {
    openFolderDialog(spaceId, folderId);
  };

  const handleCreateProject = () => {
    openProjectDialog(spaceId, folderId);
  };

  return (
    <List.Item label={item.name} level={level}>
      <List.Item.Icon icon={FolderIcon} size="sm" />
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
            <Dropdown.Submenu>
              <Dropdown.SubmenuTrigger asChild>
                <Dropdown.Item icon={<Plus />} label="Create new">
                  <Dropdown.Item.RightAction>
                    <ChevronRight className="h-4 w-4 text-text-muted transition-colors ml-auto" />
                  </Dropdown.Item.RightAction>
                </Dropdown.Item>
              </Dropdown.SubmenuTrigger>
              <Dropdown.SubmenuContent sideOffset={5}>
                <Dropdown.Item
                  icon={<ListCheck />}
                  label="Project"
                  onClick={handleCreateProject}
                />
                <Separator className="my-2" />
                <Dropdown.Item
                  icon={<Folder />}
                  label="New Folder"
                  onClick={handleCreateFolder}
                />
              </Dropdown.SubmenuContent>
            </Dropdown.Submenu>
          </Dropdown.Content>
        </Dropdown>
      </List.Item.Action>
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
