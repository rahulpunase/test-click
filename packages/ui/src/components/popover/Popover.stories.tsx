import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/Button";
import { Popover } from "./Popover";
import { Input } from "../input/Input";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="outlined">Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-text-muted">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width" className="text-sm font-medium">
                Width
              </label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxWidth" className="text-sm font-medium">
                Max. width
              </label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height" className="text-sm font-medium">
                Height
              </label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxHeight" className="text-sm font-medium">
                Max. height
              </label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
        <Popover.Arrow />
      </Popover.Content>
    </Popover>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="outlined">Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content className="w-60">
        <Popover.Title className="mb-2">Notification</Popover.Title>
        <Popover.Description>
          This is a notification popover with a close button.
        </Popover.Description>
        <Popover.Close />
        <Popover.Arrow />
      </Popover.Content>
    </Popover>
  ),
};
