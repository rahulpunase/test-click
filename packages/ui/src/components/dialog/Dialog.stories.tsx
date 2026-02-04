import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/Button";
import { Dialog } from "./Dialog";
import { Tabs } from "../tabs/Tabs";
import { Input } from "../input/Input";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outlined" color="primary">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="username"
              className="text-right text-sm font-medium"
            >
              Username
            </label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <Dialog.Footer>
          <Button type="submit">Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const VerticalMedium: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outlined" color="primary">
          Vertical Medium
        </Button>
      </Dialog.Trigger>
      <Dialog.Content orientation="vertical" size="md">
        <Dialog.Header>
          <Dialog.Title>Vertical Medium</Dialog.Title>
          <Dialog.Description>
            This is a vertical oriented dialog with medium size (max-w-[400px]
            h-[700px]).
          </Dialog.Description>
        </Dialog.Header>
        <div className="flex-1 bg-muted/20 p-4 rounded-md mt-4 overflow-y-auto">
          <p>
            Vertical dialogs are great for content that requires more vertical
            space, like long forms or mobile-like views.
          </p>
          <div className="h-[800px] bg-red-100/50 mt-4 rounded p-4">
            Long content placeholder to demonstrate scrolling or layout.
          </div>
        </div>
        <Dialog.Footer className="mt-4">
          <Button>Action</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const HorizontalLarge: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outlined" color="primary">
          Horizontal Large
        </Button>
      </Dialog.Trigger>
      <Dialog.Content orientation="horizontal" size="lg">
        <Dialog.Header>
          <Dialog.Title>Horizontal Large</Dialog.Title>
          <Dialog.Description>
            This is a horizontal oriented dialog with large size (max-w-[90vw]).
          </Dialog.Description>
        </Dialog.Header>
        <div className="flex-1 bg-muted/20 p-4 rounded-md mt-4 grid grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded border">Left Panel</div>
          <div className="bg-background p-4 rounded border">Right Panel</div>
        </div>
        <Dialog.Footer className="mt-4">
          <Button>Action</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const WithTabs: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outlined" color="primary">
          Dialog with Tabs
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[600px]">
        <Dialog.Header>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Description>
            Manage your account settings and preferences.
          </Dialog.Description>
        </Dialog.Header>

        <Tabs defaultValue="account" className="w-full mt-4">
          <Tabs.List>
            <Tabs.Trigger
              value="account"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              Account
            </Tabs.Trigger>
            <Tabs.Trigger
              value="password"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              Password
            </Tabs.Trigger>
            <Tabs.Trigger
              value="notifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              Notifications
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="account" className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dislay Name</label>
              <Input placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="john@example.com" />
            </div>
          </Tabs.Content>

          <Tabs.Content value="password" className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" />
            </div>
          </Tabs.Content>

          <Tabs.Content value="notifications" className="py-4">
            <p className="text-sm text-muted-foreground">
              Notification settings go here.
            </p>
          </Tabs.Content>
        </Tabs>

        <Dialog.Footer className="mt-4">
          <Button>Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
