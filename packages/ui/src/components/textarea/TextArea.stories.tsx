import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
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
      <div className="p-4 max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: "Enter details here...",
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    placeholder: "Enter detailed description",
  },
};

export const Normal: Story = {
  args: {
    variant: "normal",
    placeholder: "Type your comment...",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Invalid input",
    defaultValue: "This content is invalid",
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot type here",
    disabled: true,
  },
};
