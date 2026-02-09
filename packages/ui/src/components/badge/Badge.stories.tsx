import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { CheckIcon, AlertTriangleIcon, XCircleIcon } from "lucide-react";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "warning"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Error",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "success",
    icon: <CheckIcon />,
    children: "Active",
  },
};

export const AllVariants: Story = {
  args: {
    children: "Badge",
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="success" icon={<CheckIcon />}>
        Success
      </Badge>
      <Badge variant="warning" icon={<AlertTriangleIcon />}>
        Warning
      </Badge>
      <Badge variant="destructive" icon={<XCircleIcon />}>
        Destructive
      </Badge>
    </div>
  ),
};

export const MemberRoles: Story = {
  args: {
    children: "Role",
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Member</Badge>
      <Badge variant="success">Admin</Badge>
      <Badge variant="warning">Guest</Badge>
      <Badge variant="destructive">Banned</Badge>
    </div>
  ),
};
