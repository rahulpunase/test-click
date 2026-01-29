import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { useState } from "react";
import { ChevronDown, Check, User, Settings, LogOut } from "lucide-react";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dropdown with basic usage
 */
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered" size="md">
          <span className="flex-1 text-left">
            {selected || "Select an option"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup>
              <Dropdown.Item onClick={() => setSelected("Option 1")}>
                Option 1
                {selected === "Option 1" && (
                  <Dropdown.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Dropdown.ItemIndicator>
                )}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("Option 2")}>
                Option 2
                {selected === "Option 2" && (
                  <Dropdown.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Dropdown.ItemIndicator>
                )}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("Option 3")}>
                Option 3
                {selected === "Option 3" && (
                  <Dropdown.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Dropdown.ItemIndicator>
                )}
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with filled variant
 */
export const Filled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Dropdown>
        <Dropdown.Trigger variant="filled" size="md">
          <span className="flex-1 text-left">
            {selected || "Select an option"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup>
              <Dropdown.Item onClick={() => setSelected("Option 1")}>
                Option 1
                {selected === "Option 1" && (
                  <Dropdown.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Dropdown.ItemIndicator>
                )}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("Option 2")}>
                Option 2
                {selected === "Option 2" && (
                  <Dropdown.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Dropdown.ItemIndicator>
                )}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("Option 3")}>
                Option 3
                {selected === "Option 3" && (
                  <Dropdown.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Dropdown.ItemIndicator>
                )}
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with custom trigger styling
 */
export const CustomTrigger: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Dropdown>
        <Dropdown.Trigger
          variant="bordered"
          size="md"
          className="bg-primary text-white hover:bg-primary-hover border-primary"
        >
          <span className="flex-1 text-left">
            {selected || "Custom styled trigger"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup>
              <Dropdown.Item onClick={() => setSelected("Option 1")}>
                Option 1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("Option 2")}>
                Option 2
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("Option 3")}>
                Option 3
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with icons in items
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered" size="md">
          <User className="h-4 w-4" />
          <span className="flex-1 text-left">Account</span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup>
              <Dropdown.Item onClick={() => console.log("Profile")}>
                <User className="h-4 w-4" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Settings")}>
                <Settings className="h-4 w-4" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Logout")}>
                <LogOut className="h-4 w-4" />
                Logout
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Small size dropdown
 */
export const Small: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered" size="sm">
          <span className="flex-1 text-left">
            {selected || "Small dropdown"}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup size="sm">
              <Dropdown.Item size="sm" onClick={() => setSelected("Option 1")}>
                Option 1
              </Dropdown.Item>
              <Dropdown.Item size="sm" onClick={() => setSelected("Option 2")}>
                Option 2
              </Dropdown.Item>
              <Dropdown.Item size="sm" onClick={() => setSelected("Option 3")}>
                Option 3
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Large size dropdown
 */
export const Large: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered" size="lg">
          <span className="flex-1 text-left">
            {selected || "Large dropdown"}
          </span>
          <ChevronDown className="h-5 w-5" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup size="lg">
              <Dropdown.Item size="lg" onClick={() => setSelected("Option 1")}>
                Option 1
              </Dropdown.Item>
              <Dropdown.Item size="lg" onClick={() => setSelected("Option 2")}>
                Option 2
              </Dropdown.Item>
              <Dropdown.Item size="lg" onClick={() => setSelected("Option 3")}>
                Option 3
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered" size="md">
          <span className="flex-1 text-left">
            {selected || "Select priority"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup>
              <Dropdown.Item onClick={() => setSelected("Low")}>
                Low Priority
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("Medium")}>
                Medium Priority
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("High")}>
                High Priority
              </Dropdown.Item>
              <Dropdown.Item disabled onClick={() => setSelected("Urgent")}>
                Urgent (Disabled)
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Dropdown with custom item styling
 */
export const CustomItems: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <Dropdown>
        <Dropdown.Trigger variant="bordered" size="md">
          <span className="flex-1 text-left">
            {selected || "Select status"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Positioner sideOffset={5}>
            <Dropdown.Popup>
              <Dropdown.Item
                onClick={() => setSelected("Active")}
                className="text-success hover:bg-success/10"
              >
                <span className="h-2 w-2 rounded-full bg-success" />
                Active
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setSelected("Pending")}
                className="text-warning hover:bg-warning/10"
              >
                <span className="h-2 w-2 rounded-full bg-warning" />
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setSelected("Inactive")}
                className="text-error hover:bg-error/10"
              >
                <span className="h-2 w-2 rounded-full bg-error" />
                Inactive
              </Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
    );
  },
};

/**
 * Controlled dropdown with external state
 */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>("Option 2");
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4 w-64">
        <Dropdown open={isOpen} onOpenChange={setIsOpen}>
          <Dropdown.Trigger variant="bordered" size="md">
            <span className="flex-1 text-left">
              {selected || "Select an option"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Positioner sideOffset={5}>
              <Dropdown.Popup>
                <Dropdown.Item
                  onClick={() => {
                    setSelected("Option 1");
                    setIsOpen(false);
                  }}
                >
                  Option 1
                  {selected === "Option 1" && (
                    <Dropdown.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </Dropdown.ItemIndicator>
                  )}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelected("Option 2");
                    setIsOpen(false);
                  }}
                >
                  Option 2
                  {selected === "Option 2" && (
                    <Dropdown.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </Dropdown.ItemIndicator>
                  )}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelected("Option 3");
                    setIsOpen(false);
                  }}
                >
                  Option 3
                  {selected === "Option 3" && (
                    <Dropdown.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </Dropdown.ItemIndicator>
                  )}
                </Dropdown.Item>
              </Dropdown.Popup>
            </Dropdown.Positioner>
          </Dropdown.Portal>
        </Dropdown>

        <div className="text-sm text-muted-foreground">
          Selected: <strong>{selected || "none"}</strong>
        </div>
        <div className="text-sm text-muted-foreground">
          Open: <strong>{isOpen ? "yes" : "no"}</strong>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelected("Option 1")}
            className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-hover"
          >
            Set to Option 1
          </button>
          <button
            onClick={() => setSelected(null)}
            className="px-3 py-1 text-xs bg-secondary text-white rounded hover:bg-secondary-hover"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Showcase all variants
 */
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 w-64">
        <div>
          <h3 className="text-sm font-semibold mb-2">Bordered</h3>
          <Dropdown>
            <Dropdown.Trigger variant="bordered" size="md">
              <span className="flex-1 text-left">Select an option</span>
              <ChevronDown className="h-4 w-4" />
            </Dropdown.Trigger>
            <Dropdown.Portal>
              <Dropdown.Positioner sideOffset={5}>
                <Dropdown.Popup>
                  <Dropdown.Item>Option 1</Dropdown.Item>
                  <Dropdown.Item>Option 2</Dropdown.Item>
                  <Dropdown.Item>Option 3</Dropdown.Item>
                </Dropdown.Popup>
              </Dropdown.Positioner>
            </Dropdown.Portal>
          </Dropdown>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Filled</h3>
          <Dropdown>
            <Dropdown.Trigger variant="filled" size="md">
              <span className="flex-1 text-left">Select an option</span>
              <ChevronDown className="h-4 w-4" />
            </Dropdown.Trigger>
            <Dropdown.Portal>
              <Dropdown.Positioner sideOffset={5}>
                <Dropdown.Popup>
                  <Dropdown.Item>Option 1</Dropdown.Item>
                  <Dropdown.Item>Option 2</Dropdown.Item>
                  <Dropdown.Item>Option 3</Dropdown.Item>
                </Dropdown.Popup>
              </Dropdown.Positioner>
            </Dropdown.Portal>
          </Dropdown>
        </div>
      </div>
    );
  },
};
