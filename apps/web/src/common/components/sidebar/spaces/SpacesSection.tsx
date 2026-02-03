import { List } from "@repo/ui";
import { Link } from "react-router";
import {
  Inbox,
  MessageSquareReply,
  CheckSquare,
  ListTodo,
  MoreHorizontal,
} from "lucide-react";

export const SpacesSection = () => {
  return (
    <List>
      <List.Group label="Spaces">
        <List.Group label="List" collapsible defaultExpanded>
          <List.Item
            as={Link}
            to="/inbox"
            icon={<Inbox size={20} />}
            label="Inbox"
          />
          <List.Item
            icon={<MessageSquareReply size={20} />}
            label="Replies"
            onClick={() => {}}
          />
          <List.Item
            icon={<CheckSquare size={20} />}
            label="My tasks"
            onClick={() => {}}
          />
        </List.Group>

        <List.Item
          icon={<ListTodo size={20} />}
          label="All tasks"
          onClick={() => {}}
        />
        <List.Item
          icon={<MoreHorizontal size={20} />}
          label="More"
          onClick={() => {}}
        />
      </List.Group>
    </List>
  );
};
