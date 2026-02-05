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
            <Dropdown.Item icon={<Star />}>Favorite</Dropdown.Item>
            <Dropdown.Item icon={<Edit />}>Edit Space</Dropdown.Item>
            <Dropdown.Item icon={<Link />}>Copy link</Dropdown.Item>
            <Separator className="my-1" />
            <Dropdown.Item icon={<Plus />}>Create new</Dropdown.Item>
            <Dropdown.Item icon={<Settings />}>Space settings</Dropdown.Item>
            <Separator className="my-1" />
            <Dropdown.Item icon={<Trash />} variant="destructive">
              Delete Space
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      }
    />
  );
};
