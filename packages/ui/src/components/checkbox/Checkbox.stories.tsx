import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    "aria-label": "Accept terms",
    label: "Accept terms",
    description: "This is a description",
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    "aria-label": "Option selected",
  },
};

export const WithError: Story = {
  args: {
    error: true,
    "aria-label": "Agree to privacy policy",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    "aria-label": "Disabled option",
  },
};
