import { Button, Dropdown, List, Separator } from "@repo/ui";
import { Ellipsis, PlusIcon, LayoutGrid, Shuffle, Hash } from "lucide-react";
import { useCreateSpaceStore } from "./store";
import { useGlobalData } from "../../providers/globalDataProvider/globalDataProvider";
import { useGetSpaces } from "@repo/backend/spaces/queries";
import { SpaceItem } from "./SpaceItem";

export const SpacesSection = () => {
  const { toggle: openCreateSpaceDialog } = useCreateSpaceStore();
  const { workSpace } = useGlobalData();
  const { data: spaces } = useGetSpaces(workSpace._id);

  return (
    <List>
      <List.Group
        label="Spaces"
        action={
          <div className="flex flex-row gap-1">
            <Dropdown>
              <Dropdown.Trigger asChild>
                <Button
                  icon={Ellipsis}
                  variant="ghost"
                  color="tertiary"
                  size="sm"
                />
              </Dropdown.Trigger>
              <Dropdown.Content align="start" side="bottom">
                <Dropdown.Item
                  icon={<PlusIcon />}
                  onClick={openCreateSpaceDialog}
                >
                  Create space
                </Dropdown.Item>
                <Dropdown.Item icon={<LayoutGrid />}>
                  Manage spaces
                </Dropdown.Item>
                <Separator className="my-2" />
                <Dropdown.Item icon={<Shuffle />}>
                  Re order section
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
            <Button
              icon={PlusIcon}
              variant="outlined"
              color="tertiary"
              size="sm"
              onClick={openCreateSpaceDialog}
            />
          </div>
        }
      >
        {spaces?.map((space) => (
          <SpaceItem key={space._id} space={space} />
        ))}
      </List.Group>
    </List>
  );
};
