import { Button, Dropdown, List, Separator } from "@repo/ui";
import { Ellipsis, PlusIcon, LayoutGrid, Shuffle } from "lucide-react";

export const SpacesSection = () => {
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
                <Dropdown.Item icon={<PlusIcon />}>Create space</Dropdown.Item>
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
            />
          </div>
        }
      ></List.Group>
    </List>
  );
};
