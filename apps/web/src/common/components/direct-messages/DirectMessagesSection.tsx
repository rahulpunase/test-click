import { Button, Dropdown, List, Separator } from "@repo/ui";
import { Ellipsis, PlusIcon, MessageCircle, Shuffle } from "lucide-react";

export const DirectMessagesSection = () => {
  // TODO: Add useGetDirectMessages query when available
  // TODO: Add useCreateDirectMessageStore for DM creation dialog
  const directMessages: unknown[] = [];

  const handleOpenNewDirectMessage = () => {
    // TODO: Implement when new direct message dialog is available
  };

  return (
    <List>
      <List.Group label="Direct Messages">
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
                  onClick={handleOpenNewDirectMessage}
                >
                  New direct message
                </Dropdown.Item>
                <Dropdown.Item icon={<MessageCircle />}>
                  Browse conversations
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
              size="xs"
              onClick={handleOpenNewDirectMessage}
            />
          </div>
        </List.Group.Action>
        {/* TODO: Map directMessages to DirectMessageItem components when implemented */}
        {directMessages.map((_, index) => (
          <div key={index}></div>
        ))}
      </List.Group>
      <div className="px-2">
        <Button
          icon={PlusIcon}
          color="tertiary"
          variant="ghost"
          className="justify-start w-full"
          onClick={handleOpenNewDirectMessage}
        >
          Start conversation
        </Button>
      </div>
    </List>
  );
};
