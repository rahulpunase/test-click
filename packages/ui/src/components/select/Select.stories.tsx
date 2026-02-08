import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { User, Settings, Globe, Bell, Lock, ChevronDown } from "lucide-react";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default select with basic usage
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="w-64">
        <Select defaultValue="apple">
          <Select.Trigger variant="bordered">
            <Select.Value placeholder="Select a fruit" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="apple" label="Apple" />
            <Select.Item value="banana" label="Banana" />
            <Select.Item value="orange" label="Orange" />
            <Select.Item value="grape" label="Grape" />
            <Select.Item value="mango" label="Mango" />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with placeholder
 */
export const WithPlaceholder: Story = {
  render: () => {
    return (
      <div className="w-64">
        <Select>
          <Select.Trigger variant="bordered">
            <Select.Value placeholder="Choose your favorite..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="chocolate" label="Chocolate" />
            <Select.Item value="vanilla" label="Vanilla" />
            <Select.Item value="strawberry" label="Strawberry" />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with icons in items
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <div className="w-64">
        <Select defaultValue="profile">
          <Select.Trigger variant="bordered">
            <Select.Value placeholder="Select option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="profile" label="Profile" icon={<User />} />
            <Select.Item
              value="settings"
              label="Settings"
              icon={<Settings />}
            />
            <Select.Item
              value="notifications"
              label="Notifications"
              icon={<Bell />}
            />
            <Select.Item value="privacy" label="Privacy" icon={<Lock />} />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with descriptions
 */
export const WithDescriptions: Story = {
  render: () => {
    return (
      <div className="w-80">
        <Select defaultValue="english">
          <Select.Trigger variant="bordered">
            <Select.Value placeholder="Select language" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Item
              value="english"
              label="English"
              icon={<Globe />}
              description="Primary language"
            />
            <Select.Item
              value="spanish"
              label="Spanish"
              icon={<Globe />}
              description="Español"
            />
            <Select.Item
              value="french"
              label="French"
              icon={<Globe />}
              description="Français"
            />
            <Select.Item
              value="german"
              label="German"
              icon={<Globe />}
              description="Deutsch"
            />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with custom trigger using asChild
 */
export const WithCustomTrigger: Story = {
  render: () => {
    return (
      <div className="w-64">
        <Select defaultValue="option1">
          <Select.Trigger asChild>
            <button className="bg-primary text-white px-4 py-2 rounded-full font-bold hover:bg-primary-hover transition-colors flex items-center justify-between gap-2 w-full">
              <Select.Value placeholder="Custom trigger" />
              <ChevronDown className="h-4 w-4" />
            </button>
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="option1" label="Option 1" />
            <Select.Item value="option2" label="Option 2" />
            <Select.Item value="option3" label="Option 3" />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with filled variant
 */
export const Filled: Story = {
  render: () => {
    return (
      <div className="w-64">
        <Select defaultValue="medium">
          <Select.Trigger variant="filled">
            <Select.Value placeholder="Select size" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="small" label="Small" />
            <Select.Item value="medium" label="Medium" />
            <Select.Item value="large" label="Large" />
            <Select.Item value="xlarge" label="Extra Large" />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => {
    return (
      <div className="w-64">
        <Select>
          <Select.Trigger variant="bordered">
            <Select.Value placeholder="Select status" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="active" label="Active" />
            <Select.Item value="pending" label="Pending" />
            <Select.Item value="inactive" label="Inactive" />
            <Select.Item value="archived" label="Archived" disabled />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with grouped items
 */
export const WithGroups: Story = {
  render: () => {
    return (
      <div className="w-64">
        <Select>
          <Select.Trigger variant="bordered">
            <Select.Value placeholder="Select timezone" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.GroupLabel>Americas</Select.GroupLabel>
              <Select.Item value="est" label="Eastern Time (EST)" />
              <Select.Item value="pst" label="Pacific Time (PST)" />
              <Select.Item value="cst" label="Central Time (CST)" />
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Europe</Select.GroupLabel>
              <Select.Item value="gmt" label="Greenwich (GMT)" />
              <Select.Item value="cet" label="Central European (CET)" />
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Asia</Select.GroupLabel>
              <Select.Item value="ist" label="India Standard (IST)" />
              <Select.Item value="jst" label="Japan Standard (JST)" />
            </Select.Group>
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * Select with icons and descriptions combined
 */
export const FullFeatured: Story = {
  render: () => {
    return (
      <div className="w-80">
        <Select defaultValue="admin">
          <Select.Trigger variant="bordered">
            <Select.Value placeholder="Select role" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Item
              value="admin"
              label="Administrator"
              icon={<Lock />}
              description="Full access to all resources"
            />
            <Select.Item
              value="editor"
              label="Editor"
              icon={<Settings />}
              description="Can edit and publish content"
            />
            <Select.Item
              value="viewer"
              label="Viewer"
              icon={<User />}
              description="Read-only access"
            />
            <Select.Item
              value="guest"
              label="Guest"
              icon={<Globe />}
              description="Limited public access"
              disabled
            />
          </Select.Content>
        </Select>
      </div>
    );
  },
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 w-64">
        <div>
          <h3 className="text-sm font-semibold mb-2">Bordered</h3>
          <Select defaultValue="apple">
            <Select.Trigger variant="bordered">
              <Select.Value placeholder="Select option" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="apple" label="Apple" />
              <Select.Item value="banana" label="Banana" />
              <Select.Item value="orange" label="Orange" />
            </Select.Content>
          </Select>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Filled</h3>
          <Select defaultValue="banana">
            <Select.Trigger variant="filled">
              <Select.Value placeholder="Select option" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="apple" label="Apple" />
              <Select.Item value="banana" label="Banana" />
              <Select.Item value="orange" label="Orange" />
            </Select.Content>
          </Select>
        </div>
      </div>
    );
  },
};
