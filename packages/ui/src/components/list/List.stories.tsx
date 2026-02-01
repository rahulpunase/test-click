import type { Meta, StoryObj } from "@storybook/react";
import {
  Settings,
  User,
  CreditCard,
  Bell,
  Moon,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { List } from "./index";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Item title="Account Settings" icon={<Settings />} />
      <List.Item title="Profile" icon={<User />} />
      <List.Item title="Billing" icon={<CreditCard />} />
    </List>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Item
        title="Push Notifications"
        description="Receive daily updates"
        icon={<Bell />}
      />
      <List.Item
        title="Dark Mode"
        description="Switch between light and dark themes"
        icon={<Moon />}
      />
    </List>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Group title="General">
        <List.Item title="Account" icon={<User />} />
        <List.Item title="Notifications" icon={<Bell />} />
      </List.Group>
      <List.Group title="Billing">
        <List.Item title="Payment Methods" icon={<CreditCard />} />
        <List.Item title="History" />
      </List.Group>
    </List>
  ),
};

export const CollapsibleGroups: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Group title="General Settings" collapsible defaultExpanded>
        <List.Item title="Profile" />
        <List.Item title="Security" />
      </List.Group>
      <List.Group title="Advanced Settings" collapsible>
        <List.Item title="API Keys" />
        <List.Item title="Webhooks" />
      </List.Group>
    </List>
  ),
};

export const NestedGroups: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Group title="Organization" collapsible defaultExpanded>
        <List.Item title="Overview" />
        <List.Group title="Members" collapsible>
          <List.Item title="Active Members" />
          <List.Item title="Pending Invitations" />
        </List.Group>
        <List.Group title="Teams" collapsible>
          <List.Item title="Engineering" />
          <List.Item title="Design" />
        </List.Group>
      </List.Group>
    </List>
  ),
};

export const Interactive: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Item
        title="Click me"
        description="I have a hover state"
        onClick={() => alert("Clicked!")}
        icon={<User />}
      />
      <List.Item
        title="Interactive Item"
        description="With action button"
        action={
          <button className="text-xs bg-background-muted px-2 py-1 rounded">
            Action
          </button>
        }
      />
      <List.Item
        title="Disabled Item"
        description="Cannot be clicked"
        disabled
        onClick={() => alert("Should not fire")}
      />
      <List.Item
        title="Selected Item"
        description="Currently active"
        selected
        onClick={() => {}}
      />
    </List>
  ),
};

export const WithActionMenu: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Item
        title="Project Alpha"
        description="Last updated 2 hours ago"
        action={
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="ghost" size="sm" icon={MoreHorizontal} />
            </Dropdown.Trigger>
            <Dropdown.Content align="end">
              <Dropdown.Item label="Edit" icon={<Pencil />} />
              <Dropdown.Item
                variant="destructive"
                label="Delete"
                icon={<Trash />}
              />
            </Dropdown.Content>
          </Dropdown>
        }
      />
      <List.Item
        title="Project Beta"
        description="Last updated 5 days ago"
        action={
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button variant="ghost" size="sm" icon={MoreHorizontal} />
            </Dropdown.Trigger>
            <Dropdown.Content align="end">
              <Dropdown.Item label="Edit" icon={<Pencil />} />
              <Dropdown.Item
                variant="destructive"
                label="Delete"
                icon={<Trash />}
              />
            </Dropdown.Content>
          </Dropdown>
        }
      />
    </List>
  ),
};
