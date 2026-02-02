import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    className: "w-[300px]",
  },
};

export const WithLabel: Story = {
  args: {
    orientation: "horizontal",
    label: "Or continue with",
    className: "w-[300px]",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-[50px]",
  },
  decorators: [
    (Story) => (
      <div className="flex h-20 items-center justify-center space-x-4">
        <div>Left</div>
        <Story />
        <div>Right</div>
      </div>
    ),
  ],
};
