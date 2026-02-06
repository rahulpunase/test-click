import { List, Button, Dropdown, Separator, Icon } from "@repo/ui";
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
  ListCheckIcon,
} from "lucide-react";
import type { Spaces } from "./Spaces.types";
import { useCreateProjectStore } from "../projects/store";
import { useGetProjects } from "@repo/backend/projects/queries";

interface SpaceItemProps {
  space: Spaces[0];
}

export const SpaceItem = ({ space }: SpaceItemProps) => {
  const { open: openProjectDialog } = useCreateProjectStore();
  const { data: projects } = useGetProjects(space._id);
  const firstLetter = space.name.charAt(0).toUpperCase();
  return (
    <List.Item
      key={space._id}
      label={space.name}
      icon={<Icon letter={firstLetter} />}
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
                <Dropdown.Item
                  icon={<ListCheck />}
                  label="Project"
                  onClick={() => openProjectDialog(space._id)}
                />
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
    >
      {projects?.length ? (
        <List.Item.Expandable>
          {projects?.map((project) => (
            <List.Item
              key={project._id}
              label={project.name}
              icon={<ListCheckIcon />}
            />
          ))}
        </List.Item.Expandable>
      ) : null}
    </List.Item>
  );
};
