import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Plus, Download, Trash2, Check, ArrowRight } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and colors. Supports icons from lucide-react.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outlined", "ghost", "text"],
      description: "Visual style of the button",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "success", "error"],
      description: "Color scheme of the button",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default Button
export const Default: Story = {
  args: {
    children: "Button",
    variant: "solid",
    color: "primary",
    size: "md",
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    children: "Add Item",
    icon: Plus,
    variant: "solid",
    color: "primary",
    size: "md",
  },
};

// Icon Only (no children)
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs" icon={Plus}></Button>
      <Button size="sm" icon={Plus}></Button>
      <Button size="md" icon={Plus}></Button>
      <Button size="lg" icon={Plus}></Button>
    </div>
  ),
};

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs" icon={Plus}>
        Extra Small
      </Button>
      <Button size="sm" icon={Plus}>
        Small
      </Button>
      <Button size="md" icon={Plus}>
        Medium
      </Button>
      <Button size="lg" icon={Plus}>
        Large
      </Button>
    </div>
  ),
};

// Solid Variants - All Colors
export const SolidVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="solid" color="primary" icon={Check}>
          Primary
        </Button>
        <Button variant="solid" color="secondary" icon={Download}>
          Secondary
        </Button>
        <Button variant="solid" color="tertiary" icon={ArrowRight}>
          Tertiary
        </Button>
        <Button variant="solid" color="success" icon={Check}>
          Success
        </Button>
        <Button variant="solid" color="error" icon={Trash2}>
          Error
        </Button>
      </div>
    </div>
  ),
};

// Outlined Variants - All Colors
export const OutlinedVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outlined" color="primary" icon={Check}>
          Primary
        </Button>
        <Button variant="outlined" color="secondary" icon={Download}>
          Secondary
        </Button>
        <Button variant="outlined" color="tertiary" icon={ArrowRight}>
          Tertiary
        </Button>
        <Button variant="outlined" color="success" icon={Check}>
          Success
        </Button>
        <Button variant="outlined" color="error" icon={Trash2}>
          Error
        </Button>
      </div>
    </div>
  ),
};

// Ghost Variants - All Colors
export const GhostVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" color="primary" icon={Check}>
          Primary
        </Button>
        <Button variant="ghost" color="secondary" icon={Download}>
          Secondary
        </Button>
        <Button variant="ghost" color="tertiary" icon={ArrowRight}>
          Tertiary
        </Button>
        <Button variant="ghost" color="success" icon={Check}>
          Success
        </Button>
        <Button variant="ghost" color="error" icon={Trash2}>
          Error
        </Button>
      </div>
    </div>
  ),
};

// Text Variants - All Colors
export const TextVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="text" color="primary" icon={Check}>
          Primary
        </Button>
        <Button variant="text" color="secondary" icon={Download}>
          Secondary
        </Button>
        <Button variant="text" color="tertiary" icon={ArrowRight}>
          Tertiary
        </Button>
        <Button variant="text" color="success" icon={Check}>
          Success
        </Button>
        <Button variant="text" color="error" icon={Trash2}>
          Error
        </Button>
      </div>
    </div>
  ),
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled variant="solid" color="primary" icon={Plus}>
        Solid Disabled
      </Button>
      <Button disabled variant="outlined" color="primary" icon={Plus}>
        Outlined Disabled
      </Button>
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button loading variant="solid" color="primary">
        Solid Loading
      </Button>
      <Button loading variant="outlined" color="primary">
        Outlined Loading
      </Button>
      <Button loading variant="ghost" color="primary">
        Ghost Loading
      </Button>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Primary Actions</h3>
        <div className="flex gap-3">
          <Button variant="solid" color="primary" icon={Plus}>
            Create New
          </Button>
          <Button variant="outlined" color="primary" icon={Download}>
            Download
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Destructive Actions</h3>
        <div className="flex gap-3">
          <Button variant="solid" color="error" icon={Trash2}>
            Delete
          </Button>
          <Button variant="outlined" color="error" icon={Trash2}>
            Remove
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Success Actions</h3>
        <div className="flex gap-3">
          <Button variant="solid" color="success" icon={Check}>
            Confirm
          </Button>
          <Button variant="outlined" color="success" icon={Check}>
            Approve
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Complete Matrix
export const CompleteMatrix: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Button Variants Matrix</h2>

      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <h3 className="text-lg font-semibold mb-3 capitalize">
            Size: {size}
          </h3>
          <div className="space-y-3">
            {/* Solid */}
            <div>
              <p className="text-sm text-neutral-600 mb-2">Solid</p>
              <div className="flex gap-2 flex-wrap">
                {(
                  [
                    "primary",
                    "secondary",
                    "tertiary",
                    "success",
                    "error",
                  ] as const
                ).map((color) => (
                  <Button
                    key={color}
                    variant="solid"
                    color={color}
                    size={size}
                    icon={Plus}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            {/* Outlined */}
            <div>
              <p className="text-sm text-neutral-600 mb-2">Outlined</p>
              <div className="flex gap-2 flex-wrap">
                {(
                  [
                    "primary",
                    "secondary",
                    "tertiary",
                    "success",
                    "error",
                  ] as const
                ).map((color) => (
                  <Button
                    key={color}
                    variant="outlined"
                    color={color}
                    size={size}
                    icon={Plus}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            {/* Ghost */}
            <div>
              <p className="text-sm text-neutral-600 mb-2">Ghost</p>
              <div className="flex gap-2 flex-wrap">
                {(
                  [
                    "primary",
                    "secondary",
                    "tertiary",
                    "success",
                    "error",
                  ] as const
                ).map((color) => (
                  <Button
                    key={color}
                    variant="ghost"
                    color={color}
                    size={size}
                    icon={Plus}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            {/* Text */}
            <div>
              <p className="text-sm text-neutral-600 mb-2">Text</p>
              <div className="flex gap-2 flex-wrap">
                {(
                  [
                    "primary",
                    "secondary",
                    "tertiary",
                    "success",
                    "error",
                  ] as const
                ).map((color) => (
                  <Button
                    key={color}
                    variant="text"
                    color={color}
                    size={size}
                    icon={Plus}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
