import { List, Button, Dropdown, Separator } from "@repo/ui";
import {
  Edit,
  Ellipsis,
  Hash,
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

interface SpaceItemProps {
  space: Spaces[0];
}

export const SpaceItem = ({ space }: SpaceItemProps) => {
  return (
    <List.Item
      key={space._id}
      label={space.name}
      icon={<Hash />}
      action={
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button
              variant="ghost"
              icon={Ellipsis}
              color="tertiary"
              size="sm"
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
                <Dropdown.Item icon={<ListCheck />} label="Project" />
                <Separator className="my-2" />
                <Dropdown.Item icon={<Folder />} label="New Folder" />
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
      }
    />
  );
};
