import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Bell, Plus } from "lucide-react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the icon container",
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
      description: "The shape of the container",
    },
    letter: {
      control: "text",
      description: "Letter to display when no icon is provided",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Basic example
export const Default: Story = {
  args: {
    icon: Mail,
    size: "md",
    className: "bg-primary/10 text-primary",
  },
};

// Custom Colors via ClassName
export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon icon={Mail} className="bg-primary text-white" />
      <Icon icon={Mail} className="bg-secondary text-white" />
      <Icon icon={Mail} className="bg-success/10 text-success" />
      <Icon
        icon={Mail}
        className="border border-error text-error bg-transparent"
      />
      <Icon icon={Mail} className="text-info bg-transparent" />
    </div>
  ),
};

// Sizes Showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <Icon icon={Bell} size="xs" className="bg-primary/10 text-primary" />
      <Icon icon={Bell} size="sm" className="bg-primary/10 text-primary" />
      <Icon icon={Bell} size="md" className="bg-primary/10 text-primary" />
      <Icon icon={Bell} size="lg" className="bg-primary/10 text-primary" />
      <Icon icon={Bell} size="xl" className="bg-primary/10 text-primary" />
    </div>
  ),
};

// Letter Fallback
export const Letters: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon letter="A" className="bg-primary text-white" />
      <Icon letter="B" className="bg-secondary/10 text-secondary" />
      <Icon
        letter="C"
        className="border border-success text-success bg-transparent"
      />

      {/* With shapes */}
      <Icon letter="R" shape="circle" className="bg-tertiary text-white" />
    </div>
  ),
};

// Shapes
export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon
        icon={Plus}
        shape="circle"
        className="bg-primary/10 text-primary"
        tooltip="hover on me"
      />
      <Icon icon={Plus} shape="square" className="bg-primary/10 text-primary" />
    </div>
  ),
};
