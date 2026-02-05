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
          <Dropdown.Item label="Edit" onClick={() => console.log("Edit")} />
          <Dropdown.Item
            label="Duplicate"
            onClick={() => console.log("Duplicate")}
          />
          <Dropdown.Item
            label="Archive"
            onClick={() => console.log("Archive")}
          />
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
          <Dropdown.Item label="New" onClick={() => console.log("New")} />
          <Dropdown.Item label="Open" onClick={() => console.log("Open")} />
          <Dropdown.Item label="Save" onClick={() => console.log("Save")} />
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
          <Dropdown.Item
            label="Option 1"
            onClick={() => console.log("Option 1")}
          />
          <Dropdown.Item
            label="Option 2"
            onClick={() => console.log("Option 2")}
          />
          <Dropdown.Item
            label="Option 3"
            onClick={() => console.log("Option 3")}
          />
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
          <Dropdown.Item
            label="Profile"
            icon={<User />}
            onClick={() => console.log("Profile")}
          />
          <Dropdown.Item
            label="Settings"
            icon={<Settings />}
            onClick={() => console.log("Settings")}
          />
          <Dropdown.Item
            label="Logout"
            icon={<LogOut />}
            onClick={() => console.log("Logout")}
          />
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
          <Dropdown.Item
            label="Edit"
            icon={<Settings />}
            onClick={() => console.log("Edit")}
          />
          <Dropdown.Item
            label="Duplicate"
            onClick={() => console.log("Duplicate")}
          />
          <Dropdown.Item
            variant="destructive"
            label="Delete"
            icon={<Trash2 />}
            onClick={() => console.log("Delete")}
          />
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
          <Dropdown.Item
            label="Low Priority"
            onClick={() => console.log("Low")}
          />
          <Dropdown.Item
            label="Medium Priority"
            onClick={() => console.log("Medium")}
          />
          <Dropdown.Item
            label="High Priority"
            onClick={() => console.log("High")}
          />
          <Dropdown.Item
            disabled
            label="Urgent (Disabled)"
            onClick={() => console.log("Urgent")}
          />
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
          <Dropdown.Item
            onClick={() => console.log("Active")}
            className="text-success hover:bg-success/10"
          >
            <span className="h-2 w-2 rounded-full bg-success mr-2" />
            Active
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => console.log("Pending")}
            className="text-warning hover:bg-warning/10"
          >
            <span className="h-2 w-2 rounded-full bg-warning mr-2" />
            Pending
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => console.log("Inactive")}
            className="text-error hover:bg-error/10"
          >
            <span className="h-2 w-2 rounded-full bg-error mr-2" />
            Inactive
          </Dropdown.Item>
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
              <Dropdown.Item
                label="Option 1"
                onClick={() => console.log("Option 1")}
              />
              <Dropdown.Item
                label="Option 2"
                onClick={() => console.log("Option 2")}
              />
              <Dropdown.Item
                label="Option 3"
                onClick={() => console.log("Option 3")}
              />
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
              <Dropdown.Item
                label="Option 1"
                onClick={() => console.log("Option 1")}
              />
              <Dropdown.Item
                label="Option 2"
                onClick={() => console.log("Option 2")}
              />
              <Dropdown.Item
                label="Option 3"
                onClick={() => console.log("Option 3")}
              />
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    );
  },
};

/**
 * Dropdown with asChild trigger (custom button component)
 */
export const WithAsChild: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger asChild>
          <button className="bg-secondary text-white px-4 py-2 rounded-full font-bold hover:bg-secondary-hover transition-colors flex items-center gap-2">
            <span className="flex-1 text-left">AsChild Trigger</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Item
            label="Option 1"
            onClick={() => console.log("Option 1")}
          />
          <Dropdown.Item
            label="Option 2"
            onClick={() => console.log("Option 2")}
          />
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with nested submenus
 */
export const WithSubmenu: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered">
          <span className="flex-1 text-left">Options</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Content sideOffset={5}>
          <Dropdown.Item
            label="Profile"
            onClick={() => console.log("Profile")}
          />

          <Dropdown.Submenu>
            <Dropdown.SubmenuTrigger>More Options</Dropdown.SubmenuTrigger>
            <Dropdown.SubmenuContent sideOffset={2} alignOffset={-5}>
              <Dropdown.Item
                label="Sub Item 1"
                onClick={() => console.log("Sub Item 1")}
              />
              <Dropdown.Item
                label="Sub Item 2"
                onClick={() => console.log("Sub Item 2")}
              />

              <Dropdown.Submenu>
                <Dropdown.SubmenuTrigger>Even More</Dropdown.SubmenuTrigger>
                <Dropdown.SubmenuContent sideOffset={2} alignOffset={-5}>
                  <Dropdown.Item
                    label="Deep Item"
                    onClick={() => console.log("Deep Item")}
                  />
                </Dropdown.SubmenuContent>
              </Dropdown.Submenu>
            </Dropdown.SubmenuContent>
          </Dropdown.Submenu>

          <Dropdown.Submenu>
            <Dropdown.SubmenuTrigger asChild>
              <div className="flex items-center gap-2 px-1 py-1 mx-2 text-sm rounded cursor-pointer outline-none transition-colors hover:bg-background-muted text-text-secondary select-none w-auto">
                <span className="flex-1">Custom Trigger</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </div>
            </Dropdown.SubmenuTrigger>
            <Dropdown.SubmenuContent sideOffset={2}>
              <Dropdown.Item
                label="Worked"
                onClick={() => console.log("Worked")}
              />
            </Dropdown.SubmenuContent>
          </Dropdown.Submenu>

          <Dropdown.Item label="Logout" onClick={() => console.log("Logout")} />
        </Dropdown.Content>
      </Dropdown>
    );
  },
};
