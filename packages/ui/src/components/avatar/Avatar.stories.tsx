import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
};

export const XLarge: Story = {
  args: {
    size: "xl",
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
  args: {
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
};

export const Fallback: Story = {
  args: {
    fallback: "JD",
  },
};

export const FallbackSmall: Story = {
  args: {
    size: "sm",
    fallback: "JD",
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken-image.com/avatar.png",
    alt: "Broken Image",
    fallback: "BR",
  },
};
