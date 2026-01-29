import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { useState } from "react";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bordered", "filled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
];

const countriesOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

const priorityOptions = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent", disabled: true },
];

/**
 * Default dropdown with bordered variant
 */
export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "bordered",
    size: "md",
  },
};

/**
 * Dropdown with filled variant
 */
export const Filled: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "filled",
    size: "md",
  },
};

/**
 * Small size dropdown
 */
export const Small: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "bordered",
    size: "sm",
  },
};

/**
 * Medium size dropdown (default)
 */
export const Medium: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "bordered",
    size: "md",
  },
};

/**
 * Large size dropdown
 */
export const Large: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "bordered",
    size: "lg",
  },
};

/**
 * Disabled dropdown
 */
export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "bordered",
    size: "md",
    disabled: true,
    defaultValue: "2",
  },
};

/**
 * Dropdown with default value
 */
export const WithDefaultValue: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "bordered",
    size: "md",
    defaultValue: "3",
  },
};

/**
 * Dropdown with disabled options
 */
export const WithDisabledOptions: Story = {
  args: {
    options: priorityOptions,
    placeholder: "Select priority",
    variant: "bordered",
    size: "md",
  },
};

/**
 * Dropdown with many options (scrollable)
 */
export const WithManyOptions: Story = {
  args: {
    options: countriesOptions,
    placeholder: "Select a country",
    variant: "bordered",
    size: "md",
  },
};

/**
 * Controlled dropdown with state management
 */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>("2");

    return (
      <div className="flex flex-col gap-4 w-64">
        <Dropdown
          {...args}
          value={value ?? undefined}
          onValueChange={setValue}
        />
        <div className="text-sm text-muted-foreground">
          Selected value: <strong>{value || "none"}</strong>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setValue("1")}
            className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-hover"
          >
            Set to Option 1
          </button>
          <button
            onClick={() => setValue(null)}
            className="px-3 py-1 text-xs bg-secondary text-white rounded hover:bg-secondary-hover"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    variant: "bordered",
    size: "md",
  },
};

/**
 * Showcase all variants side by side
 */
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Bordered</h3>
          <Dropdown
            options={sampleOptions}
            placeholder="Select an option"
            variant="bordered"
            size="md"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Filled</h3>
          <Dropdown
            options={sampleOptions}
            placeholder="Select an option"
            variant="filled"
            size="md"
          />
        </div>
      </div>
    );
  },
};

/**
 * Showcase all sizes side by side
 */
export const AllSizes: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Small</h3>
          <Dropdown
            options={sampleOptions}
            placeholder="Select an option"
            variant="bordered"
            size="sm"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Medium</h3>
          <Dropdown
            options={sampleOptions}
            placeholder="Select an option"
            variant="bordered"
            size="md"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Large</h3>
          <Dropdown
            options={sampleOptions}
            placeholder="Select an option"
            variant="bordered"
            size="lg"
          />
        </div>
      </div>
    );
  },
};
