import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { ChevronDown, User, Settings, LogOut, Trash2 } from "lucide-react";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dropdown with basic usage - bordered variant
 */
export const Default: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered">
          <span className="flex-1 text-left">Actions</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Popup>
            <Dropdown.Item onClick={() => console.log("Edit")}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Duplicate")}>
              Duplicate
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Archive")}>
              Archive
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with filled variant
 */
export const Filled: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="filled">
          <span className="flex-1 text-left">Actions</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Popup>
            <Dropdown.Item onClick={() => console.log("New")}>
              New
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Open")}>
              Open
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Save")}>
              Save
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with custom trigger styling
 */
export const CustomTrigger: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger
          variant="bordered"
          className="bg-primary text-white hover:bg-primary-hover border-primary"
        >
          <span className="flex-1 text-left">Custom styled</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Popup>
            <Dropdown.Item onClick={() => console.log("Option 1")}>
              Option 1
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Option 2")}>
              Option 2
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Option 3")}>
              Option 3
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with icons in items
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered">
          <User className="h-4 w-4" />
          <span className="flex-1 text-left">Account</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Popup>
            <Dropdown.Item onClick={() => console.log("Profile")}>
              <User className="h-4 w-4" />
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Settings")}>
              <Settings className="h-4 w-4" />
              Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Logout")}>
              <LogOut className="h-4 w-4" />
              Logout
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with destructive items
 */
export const WithDestructiveItems: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered">
          <span className="flex-1 text-left">Manage</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Popup>
            <Dropdown.Item onClick={() => console.log("Edit")}>
              <Settings className="h-4 w-4" />
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Duplicate")}>
              Duplicate
            </Dropdown.Item>
            <Dropdown.Item
              variant="destructive"
              onClick={() => console.log("Delete")}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered">
          <span className="flex-1 text-left">Select priority</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Popup>
            <Dropdown.Item onClick={() => console.log("Low")}>
              Low Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Medium")}>
              Medium Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("High")}>
              High Priority
            </Dropdown.Item>
            <Dropdown.Item disabled onClick={() => console.log("Urgent")}>
              Urgent (Disabled)
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with custom item styling
 */
export const CustomItems: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered">
          <span className="flex-1 text-left">Select status</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Popup>
            <Dropdown.Item
              onClick={() => console.log("Active")}
              className="text-success hover:bg-success/10"
            >
              <span className="h-2 w-2 rounded-full bg-success" />
              Active
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => console.log("Pending")}
              className="text-warning hover:bg-warning/10"
            >
              <span className="h-2 w-2 rounded-full bg-warning" />
              Pending
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => console.log("Inactive")}
              className="text-error hover:bg-error/10"
            >
              <span className="h-2 w-2 rounded-full bg-error" />
              Inactive
            </Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Showcase all variants
 */
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 w-64">
        <div>
          <h3 className="text-sm font-semibold mb-2">Bordered</h3>
          <Dropdown>
            <Dropdown.Trigger variant="bordered">
              <span className="flex-1 text-left">Select an option</span>
              <ChevronDown className="h-4 w-4" />
            </Dropdown.Trigger>
            <Dropdown.Content sideOffset={5}>
              <Dropdown.Popup>
                <Dropdown.Item onClick={() => console.log("Option 1")}>
                  Option 1
                </Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Option 2")}>
                  Option 2
                </Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Option 3")}>
                  Option 3
                </Dropdown.Item>
              </Dropdown.Popup>
            </Dropdown.Content>
          </Dropdown>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Filled</h3>
          <Dropdown>
            <Dropdown.Trigger variant="filled">
              <span className="flex-1 text-left">Select an option</span>
              <ChevronDown className="h-4 w-4" />
            </Dropdown.Trigger>
            <Dropdown.Content sideOffset={5}>
              <Dropdown.Popup>
                <Dropdown.Item onClick={() => console.log("Option 1")}>
                  Option 1
                </Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Option 2")}>
                  Option 2
                </Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Option 3")}>
                  Option 3
                </Dropdown.Item>
              </Dropdown.Popup>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    );
  },
};
