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
      <List.Group title="Spaces">
        <List.Group title="List" collapsible defaultExpanded>
          <List.Item
            as={Link}
            to="/inbox"
            icon={<Inbox size={20} />}
            title="Inbox"
          />
          <List.Item
            icon={<MessageSquareReply size={20} />}
            title="Replies"
            onClick={() => {}}
          />
          <List.Item
            icon={<CheckSquare size={20} />}
            title="My tasks"
            onClick={() => {}}
          />
        </List.Group>

        <List.Item
          icon={<ListTodo size={20} />}
          title="All tasks"
          onClick={() => {}}
        />
        <List.Item
          icon={<MoreHorizontal size={20} />}
          title="More"
          onClick={() => {}}
        />
      </List.Group>
    </List>
  );
};
