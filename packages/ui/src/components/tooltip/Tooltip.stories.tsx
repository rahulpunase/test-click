import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div className="p-10">
      <Tooltip content="Add to library">
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="p-10">
      <p>
        Here is some text with a{" "}
        <Tooltip content="This is a tooltip">
          <span className="underline decoration-dotted cursor-help font-medium">
            tooltip
          </span>
        </Tooltip>{" "}
        inside it.
      </p>
    </div>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex gap-4 p-10 items-center justify-center h-full">
      <Tooltip content="Tooltip Top" side="top">
        <Button variant="outlined">Top</Button>
      </Tooltip>

      <Tooltip content="Tooltip Right" side="right">
        <Button variant="outlined">Right</Button>
      </Tooltip>

      <Tooltip content="Tooltip Bottom" side="bottom">
        <Button variant="outlined">Bottom</Button>
      </Tooltip>

      <Tooltip content="Tooltip Left" side="left">
        <Button variant="outlined">Left</Button>
      </Tooltip>
    </div>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <div className="p-10">
      <Tooltip content="Tooltip without arrow" showArrow={false}>
        <Button variant="outlined">No Arrow</Button>
      </Tooltip>
    </div>
  ),
};
