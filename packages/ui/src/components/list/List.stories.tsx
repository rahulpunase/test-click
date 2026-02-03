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

export const ExpandableItems: Story = {
  render: () => (
    <List className="max-w-md border border-border-2 rounded-lg p-2">
      <List.Item
        label="Dashboard"
        icon={<Settings />}
        description="Expandable with Icon (Hover to see chevron)"
      >
        <List.Item.Expandable>
          <List.Item label="Analytics" />
          <List.Item label="Reports" />
        </List.Item.Expandable>
      </List.Item>

      <List.Item label="Documents" description="Expandable without Icon">
        <List.Item.Expandable>
          <List.Item label="Private" icon={<User />} />
          <List.Item label="Shared" icon={<User />} />
        </List.Item.Expandable>
      </List.Item>

      <List.Item label="Deeply Nested" icon={<Settings />}>
        <List.Item.Expandable>
          <List.Item label="Level 1">
            <List.Item.Expandable>
              <List.Item label="Level 2">
                <List.Item.Expandable>
                  <List.Item label="Level 3" />
                </List.Item.Expandable>
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
        </List.Item.Expandable>
      </List.Item>
    </List>
  ),
};

export const GroupWithExpandableItems: Story = {
  render: () => (
    <List className="max-w-md border border-border-2 rounded-lg p-2">
      <List.Group label="Management" collapsible defaultExpanded>
        <List.Item label="Team" icon={<User />}>
          <List.Item.Expandable>
            <List.Item label="Admins" />
            <List.Item label="Members" />
            <List.Item label="Guests" />
          </List.Item.Expandable>
        </List.Item>
        <List.Item label="Settings" icon={<Settings />}>
          <List.Item.Expandable>
            <List.Item label="General" />
            <List.Item label="Security" />
          </List.Item.Expandable>
        </List.Item>
      </List.Group>

      <List.Group label="Resources" collapsible>
        <List.Item label="Documentation" />
        <List.Item label="API Reference" />
      </List.Group>
    </List>
  ),
};
