import { Button, Dropdown, List, Separator } from "@repo/ui";
import { Ellipsis, PlusIcon, Hash, Shuffle } from "lucide-react";

export const ChannelsSection = () => {
  // TODO: Add useGetChannels query when available
  // TODO: Add useCreateChannelStore for channel creation dialog
  const channels: unknown[] = [];

  const handleOpenCreateChannelDialog = () => {
    // TODO: Implement when create channel dialog is available
  };

  return (
    <List>
      <List.Group label="Channels">
        <List.Group.Action>
          <div className="flex flex-row gap-1">
            <Dropdown>
              <Dropdown.Trigger asChild>
                <Button
                  icon={Ellipsis}
                  variant="ghost"
                  color="tertiary"
                  size="xs"
                />
              </Dropdown.Trigger>
              <Dropdown.Content align="start" side="bottom">
                <Dropdown.Item
                  icon={<PlusIcon />}
                  onClick={handleOpenCreateChannelDialog}
                >
                  Create channel
                </Dropdown.Item>
                <Dropdown.Item icon={<Hash />}>Browse channels</Dropdown.Item>
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
              size="xs"
              onClick={handleOpenCreateChannelDialog}
            />
          </div>
        </List.Group.Action>
        {/* TODO: Map channels to ChannelItem components when implemented */}
        {channels.map((_, index) => (
          <div key={index}></div>
        ))}
      </List.Group>
      <div className="px-2">
        <Button
          icon={PlusIcon}
          color="tertiary"
          variant="ghost"
          className="justify-start w-full"
          onClick={handleOpenCreateChannelDialog}
        >
          Add channel
        </Button>
      </div>
    </List>
  );
};
