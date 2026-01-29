import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Button } from "../button/Button";
import { User, Settings, CreditCard } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: {
    "Tabs.List": Tabs.List,
    "Tabs.Trigger": Tabs.Trigger,
    "Tabs.Content": Tabs.Content,
  },
  args: {
    defaultValue: "account",
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <div className="p-4 border rounded-md mt-2">
          Make changes to your account here.
        </div>
      </Tabs.Content>
      <Tabs.Content value="password">
        <div className="p-4 border rounded-md mt-2">
          Change your password here.
        </div>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <Tabs.List>
        <Tabs.Trigger
          value="account"
          icon={<User className="w-4 h-4" />}
          label="Account"
          subLabel="Personal details"
        />
        <Tabs.Trigger
          value="settings"
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
        />
        <Tabs.Trigger
          value="billing"
          icon={<CreditCard className="w-4 h-4" />}
          label="Billing"
        />
      </Tabs.List>
      <Tabs.Content
        value="account"
        className="p-4 border border-border rounded-md mt-2"
      >
        Account settings.
      </Tabs.Content>
      <Tabs.Content value="settings" className="p-4 border rounded-md mt-2">
        General settings.
      </Tabs.Content>
      <Tabs.Content value="billing" className="p-4 border rounded-md mt-2">
        Billing information.
      </Tabs.Content>
    </Tabs>
  ),
};

export const CustomTrigger: Story = {
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <Tabs.List>
        <Tabs.Trigger
          value="custom"
          render={(props, state) => (
            <Button
              {...props}
              variant={state.active ? "solid" : "outlined"}
              color={state.active ? "primary" : "secondary"}
            >
              {state.active ? "Active Custom" : "Inactive Custom"}
            </Button>
          )}
        />
        <Tabs.Trigger value="regular">Regular Tab</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="custom" className="p-4 border rounded-md mt-2">
        This tab uses a custom render prop for the trigger button.
      </Tabs.Content>
      <Tabs.Content value="regular" className="p-4 border rounded-md mt-2">
        This is a regular tab.
      </Tabs.Content>
    </Tabs>
  ),
};
