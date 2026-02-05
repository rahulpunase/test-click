import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Airplane Mode",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Notifications",
    description: "Receive emails about new products, features, and more.",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Switch",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Switch",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled Switch",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: "Disabled Checked Switch",
  },
};
