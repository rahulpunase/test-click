import { List, Button, Dropdown, Separator, Icon } from "@repo/ui";
import {
  Edit,
  Ellipsis,
  Link,
  Settings,
  Star,
  Trash,
  Plus,
  ChevronRight,
  ListCheck,
  Folder,
} from "lucide-react";
import type { Spaces } from "./Spaces.types";
import { useCreateProjectStore } from "../projects/store";
import { useCreateFolderStore } from "@/common/components/folders/store";
import { useGetSpaceContents } from "@repo/backend/spaces/queries";
import { SpaceContents } from "./SpaceContents";

interface SpaceItemProps {
  space: Spaces[0];
}

export const SpaceItem = ({ space }: SpaceItemProps) => {
  const { open: openProjectDialog } = useCreateProjectStore();
  const { open: openFolderDialog } = useCreateFolderStore();
  const { data: spaceContents } = useGetSpaceContents(space._id);

  const firstLetter = space.name.charAt(0).toUpperCase();
  const hasContents = spaceContents && spaceContents.length > 0;

  return (
    <List.Item label={space.name}>
      <List.Item.Icon letter={firstLetter} size="sm" />
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
            <Dropdown.Item icon={<Star />} label="Favorite" />
            <Dropdown.Item icon={<Edit />} label="Edit Space" />
            <Dropdown.Item icon={<Link />} label="Copy link" />
            <Separator className="my-1" />
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
                  onClick={() => openProjectDialog(space._id)}
                />
                <Separator className="my-2" />
                <Dropdown.Item
                  icon={<Folder />}
                  label="New Folder"
                  onClick={() => openFolderDialog(space._id)}
                />
              </Dropdown.SubmenuContent>
            </Dropdown.Submenu>
            <Dropdown.Item icon={<Settings />} label="Space settings" />
            <Separator className="my-1" />
            <Dropdown.Item
              icon={<Trash />}
              variant="destructive"
              label="Delete Space"
            />
          </Dropdown.Content>
        </Dropdown>
      </List.Item.Action>
      {hasContents && (
        <List.Item.Expandable>
          <SpaceContents contents={spaceContents} />
        </List.Item.Expandable>
      )}
    </List.Item>
  );
};
