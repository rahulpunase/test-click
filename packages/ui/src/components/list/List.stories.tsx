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
      <List.Item label="Account Settings" icon={<Settings />} />
      <List.Item label="Profile" icon={<User />} />
      <List.Item label="Billing" icon={<CreditCard />} />
    </List>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Item
        label="Push Notifications"
        description="Receive daily updates"
        icon={<Bell />}
      />
      <List.Item
        label="Dark Mode"
        description="Switch between light and dark themes"
        icon={<Moon />}
      />
    </List>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Group label="General">
        <List.Item label="Account" icon={<User />} />
        <List.Item label="Notifications" icon={<Bell />} />
      </List.Group>
      <List.Group label="Billing">
        <List.Item label="Payment Methods" icon={<CreditCard />} />
        <List.Item label="History" />
      </List.Group>
    </List>
  ),
};

export const CollapsibleGroups: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Group label="General Settings" collapsible defaultExpanded>
        <List.Item label="Profile" />
        <List.Item label="Security" />
      </List.Group>
      <List.Group label="Advanced Settings" collapsible>
        <List.Item label="API Keys" />
        <List.Item label="Webhooks" />
      </List.Group>
    </List>
  ),
};

export const NestedGroups: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Group label="Organization" collapsible defaultExpanded>
        <List.Item label="Overview" />
        <List.Group label="Members" collapsible>
          <List.Item label="Active Members" />
          <List.Item label="Pending Invitations" />
        </List.Group>
        <List.Group label="Teams" collapsible>
          <List.Item label="Engineering" />
          <List.Item label="Design" />
        </List.Group>
      </List.Group>
    </List>
  ),
};

export const Interactive: Story = {
  render: () => (
    <List className="max-w-md">
      <List.Item
        label="Click me"
        description="I have a hover state"
        onClick={() => alert("Clicked!")}
        icon={<User />}
      />
      <List.Item
        label="Interactive Item"
        description="With action button"
        action={
          <button className="text-xs bg-background-muted px-2 py-1 rounded">
            Action
          </button>
        }
      />
      <List.Item
        label="Disabled Item"
        description="Cannot be clicked"
        disabled
        onClick={() => alert("Should not fire")}
      />
      <List.Item
        label="Selected Item"
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
        label="Project Alpha"
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
        label="Project Beta"
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
