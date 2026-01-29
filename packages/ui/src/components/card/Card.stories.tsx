import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Settings, User, Bell } from "lucide-react";
import { Button } from "../button";
import { Tabs } from "../tabs";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible Card component with support for headers, footers, collapsible content, and selectable states. Built with compound component pattern.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header title="Card Title" />
      <Card.Content>
        <p>This is the default card with a header and content.</p>
      </Card.Content>
      <Card.Footer>
        <Button size="sm">Action</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithHeaderIcon: Story = {
  render: () => (
    <Card>
      <Card.Header title="Settings" icon={<Settings className="h-5 w-5" />} />
      <Card.Content>
        <p>This card has a settings icon in the header.</p>
      </Card.Content>
    </Card>
  ),
};

export const Selectable: Story = {
  render: () => (
    <div className="space-y-4">
      <Card selectable>
        <Card.Header title="Click to Select" />
        <Card.Content>
          <p>Click anywhere on this card to select it.</p>
          <p className="text-sm text-text-muted mt-2">
            Selected cards show a primary border and ring.
          </p>
        </Card.Content>
      </Card>

      <Card selectable defaultSelected>
        <Card.Header title="Initially Selected" />
        <Card.Content>
          <p>This card starts in a selected state.</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <div className="space-y-4">
      <Card collapsible>
        <Card.Header title="Collapsible Card" />
        <Card.Content>
          <p>Click the chevron icon in the header to collapse this content.</p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Card.Content>
        <Card.Footer>
          <Button size="sm" variant="outlined">
            View More
          </Button>
        </Card.Footer>
      </Card>

      <Card collapsible defaultCollapsed>
        <Card.Header title="Initially Collapsed" />
        <Card.Content>
          <p>This card starts collapsed.</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

export const SelectableAndCollapsible: Story = {
  render: () => (
    <Card selectable collapsible>
      <Card.Header title="Advanced Card" icon={<Bell className="h-5 w-5" />} />
      <Card.Content>
        <p>This card is both selectable and collapsible.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Click the card to select it</li>
          <li>Click the chevron to collapse/expand</li>
          <li>Notice how both features work together</li>
        </ul>
      </Card.Content>
      <Card.Footer>
        <div className="flex gap-2">
          <Button size="sm" color="primary">
            Confirm
          </Button>
          <Button size="sm" variant="outlined">
            Cancel
          </Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

export const CustomHeader: Story = {
  render: () => (
    <Card collapsible>
      <Card.Header>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">John Doe</h3>
            <p className="text-sm text-text-muted">@johndoe</p>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <p>
          When you provide children to Card.Header, the title and icon props are
          ignored, giving you full control over the header layout.
        </p>
      </Card.Content>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card>
      <Card.Content>
        <p className="text-center py-8">
          A minimal card with just content, no header or footer.
        </p>
      </Card.Content>
    </Card>
  ),
};

export const WithTabs: Story = {
  render: () => (
    <Card collapsible>
      <Card.Header
        title="User Settings"
        icon={<Settings className="h-5 w-5" />}
      />
      <Card.Content>
        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="profile">
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-2">
                  Display Name
                </h3>
                <p className="text-sm text-text-muted">
                  Update your profile display name and avatar
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" color="primary">
                  Save Changes
                </Button>
                <Button size="sm" variant="outlined">
                  Cancel
                </Button>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="account">
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-2">
                  Account Security
                </h3>
                <p className="text-sm text-text-muted">
                  Manage your password and two-factor authentication
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" color="primary">
                  Update Password
                </Button>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="notifications">
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-2">
                  Email Preferences
                </h3>
                <p className="text-sm text-text-muted">
                  Choose which notifications you want to receive
                </p>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  <span>Product updates</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  <span>Weekly newsletter</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  <span>Marketing emails</span>
                </label>
              </div>
            </div>
          </Tabs.Content>
        </Tabs>
      </Card.Content>
      <Card.Footer>
        <p className="text-xs text-text-muted">
          Changes are saved automatically
        </p>
      </Card.Footer>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <Card.Header title="Basic Card" />
        <Card.Content>
          <p>Simple card with header and content.</p>
        </Card.Content>
      </Card>

      <Card selectable>
        <Card.Header
          title="Selectable"
          icon={<Settings className="h-5 w-5" />}
        />
        <Card.Content>
          <p>Click to select this card.</p>
        </Card.Content>
      </Card>

      <Card collapsible>
        <Card.Header title="Collapsible" />
        <Card.Content>
          <p>Click the chevron to collapse.</p>
        </Card.Content>
      </Card>

      <Card selectable collapsible>
        <Card.Header title="Both Features" />
        <Card.Content>
          <p>Selectable and collapsible.</p>
        </Card.Content>
        <Card.Footer>
          <Button size="sm">Action</Button>
        </Card.Footer>
      </Card>
    </div>
  ),
};
