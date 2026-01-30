import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bordered", "normal"],
    },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    placeholder: "Enter username",
  },
};

export const Normal: Story = {
  args: {
    variant: "normal",
    placeholder: "Type to search...",
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Search...",
    icon: Search,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Invalid input",
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot type here",
    disabled: true,
  },
};
