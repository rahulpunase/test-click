import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    circle: {
      control: "boolean",
      description: "If true, the skeleton will be a circle.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "w-[200px] h-[20px]",
  },
};

export const Circle: Story = {
  args: {
    circle: true,
    className: "w-12 h-12",
  },
};

export const CardExample: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
