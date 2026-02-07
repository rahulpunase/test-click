import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import {
  Folder,
  File,
  MoreVertical,
  FileText,
  Image,
  Code,
  Settings,
  Home,
  Users,
  Bell,
} from "lucide-react";
import { Button } from "../button/Button";

const meta = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default list with basic items
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="w-64">
        <List>
          <List.Item label="Home" />
          <List.Item label="Documents" />
          <List.Item label="Settings" />
        </List>
      </div>
    );
  },
};

/**
 * List items with icons
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <div className="w-64">
        <List>
          <List.Item label="Home">
            <List.Item.Icon icon={Home} size="sm" />
          </List.Item>
          <List.Item label="Documents">
            <List.Item.Icon icon={FileText} size="sm" />
          </List.Item>
          <List.Item label="Settings">
            <List.Item.Icon icon={Settings} size="sm" />
          </List.Item>
          <List.Item label="Users">
            <List.Item.Icon icon={Users} size="sm" />
          </List.Item>
          <List.Item label="Notifications">
            <List.Item.Icon icon={Bell} size="sm" />
          </List.Item>
        </List>
      </div>
    );
  },
};

/**
 * List items with action buttons
 */
export const WithActions: Story = {
  render: () => {
    return (
      <div className="w-72">
        <List>
          <List.Item label="Documents">
            <List.Item.Icon icon={Folder} size="sm" />
            <List.Item.Action>
              <Button
                variant="ghost"
                size="sm"
                icon={MoreVertical}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Menu clicked");
                }}
              />
            </List.Item.Action>
          </List.Item>
          <List.Item label="Images">
            <List.Item.Icon icon={Image} size="sm" />
            <List.Item.Action>
              <Button
                variant="ghost"
                size="sm"
                icon={MoreVertical}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Menu clicked");
                }}
              />
            </List.Item.Action>
          </List.Item>
          <List.Item label="Code Files">
            <List.Item.Icon icon={Code} size="sm" />
            <List.Item.Action>
              <Button
                variant="ghost"
                size="sm"
                icon={MoreVertical}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Menu clicked");
                }}
              />
            </List.Item.Action>
          </List.Item>
        </List>
      </div>
    );
  },
};

/**
 * Expandable list items with nested content
 */
export const Expandable: Story = {
  render: () => {
    return (
      <div className="w-72">
        <List>
          <List.Item label="Projects">
            <List.Item.Icon icon={Folder} size="sm" />
            <List.Item.Expandable>
              <List.Item label="Web Application">
                <List.Item.Icon icon={Code} size="sm" />
              </List.Item>
              <List.Item label="Mobile App">
                <List.Item.Icon icon={File} size="sm" />
              </List.Item>
              <List.Item label="Landing Page">
                <List.Item.Icon icon={FileText} size="sm" />
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
          <List.Item label="Documents">
            <List.Item.Icon icon={Folder} size="sm" />
            <List.Item.Expandable>
              <List.Item label="Contracts">
                <List.Item.Icon icon={FileText} size="sm" />
              </List.Item>
              <List.Item label="Reports">
                <List.Item.Icon icon={FileText} size="sm" />
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
          <List.Item label="Settings">
            <List.Item.Icon icon={Settings} size="sm" />
          </List.Item>
        </List>
      </div>
    );
  },
};

/**
 * Expandable list items with default expanded state
 */
export const DefaultExpanded: Story = {
  render: () => {
    return (
      <div className="w-72">
        <List>
          <List.Item label="Projects" defaultExpanded>
            <List.Item.Icon icon={Folder} size="sm" />
            <List.Item.Expandable>
              <List.Item label="Frontend">
                <List.Item.Icon icon={Code} size="sm" />
              </List.Item>
              <List.Item label="Backend">
                <List.Item.Icon icon={Code} size="sm" />
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
          <List.Item label="Other">
            <List.Item.Icon icon={Folder} size="sm" />
          </List.Item>
        </List>
      </div>
    );
  },
};

/**
 * Deeply nested expandable list for hierarchical data
 */
export const DeeplyNested: Story = {
  render: () => {
    return (
      <div className="w-80">
        <List>
          <List.Item label="src" defaultExpanded>
            <List.Item.Icon icon={Folder} size="sm" />
            <List.Item.Expandable>
              <List.Item label="components" defaultExpanded>
                <List.Item.Icon icon={Folder} size="sm" />
                <List.Item.Expandable>
                  <List.Item label="Button.tsx">
                    <List.Item.Icon icon={File} size="sm" />
                  </List.Item>
                  <List.Item label="Card.tsx">
                    <List.Item.Icon icon={File} size="sm" />
                  </List.Item>
                  <List.Item label="List.tsx">
                    <List.Item.Icon icon={File} size="sm" />
                  </List.Item>
                </List.Item.Expandable>
              </List.Item>
              <List.Item label="hooks">
                <List.Item.Icon icon={Folder} size="sm" />
                <List.Item.Expandable>
                  <List.Item label="useToggle.ts">
                    <List.Item.Icon icon={File} size="sm" />
                  </List.Item>
                </List.Item.Expandable>
              </List.Item>
              <List.Item label="utils">
                <List.Item.Icon icon={Folder} size="sm" />
                <List.Item.Expandable>
                  <List.Item label="cn.ts">
                    <List.Item.Icon icon={File} size="sm" />
                  </List.Item>
                </List.Item.Expandable>
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
          <List.Item label="package.json">
            <List.Item.Icon icon={File} size="sm" />
          </List.Item>
          <List.Item label="README.md">
            <List.Item.Icon icon={FileText} size="sm" />
          </List.Item>
        </List>
      </div>
    );
  },
};

/**
 * Complete example with icons, actions, and expandable items
 */
export const CompleteExample: Story = {
  render: () => {
    return (
      <div className="w-80">
        <List>
          <List.Item label="Workspace">
            <List.Item.Icon icon={Home} size="sm" />
            <List.Item.Action>
              <Button
                variant="ghost"
                size="sm"
                icon={MoreVertical}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Workspace menu");
                }}
              />
            </List.Item.Action>
            <List.Item.Expandable>
              <List.Item label="Projects">
                <List.Item.Icon icon={Folder} size="sm" />
                <List.Item.Expandable>
                  <List.Item label="Project Alpha">
                    <List.Item.Icon icon={File} size="sm" />
                    <List.Item.Action>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={MoreVertical}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    </List.Item.Action>
                  </List.Item>
                  <List.Item label="Project Beta">
                    <List.Item.Icon icon={File} size="sm" />
                    <List.Item.Action>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={MoreVertical}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    </List.Item.Action>
                  </List.Item>
                </List.Item.Expandable>
              </List.Item>
              <List.Item label="Documents">
                <List.Item.Icon icon={FileText} size="sm" />
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
          <List.Item label="Shared">
            <List.Item.Icon icon={Users} size="sm" />
            <List.Item.Expandable>
              <List.Item label="Team Files">
                <List.Item.Icon icon={Folder} size="sm" />
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
          <List.Item label="Settings">
            <List.Item.Icon icon={Settings} size="sm" />
          </List.Item>
        </List>
      </div>
    );
  },
};

/**
 * File browser example simulating a realistic file tree
 */
export const FileBrowser: Story = {
  render: () => {
    return (
      <div className="w-80 bg-background border border-border-2 rounded-md p-2">
        <List>
          <List.Item label="Documents" defaultExpanded>
            <List.Item.Icon icon={Folder} size="sm" />
            <List.Item.Expandable>
              <List.Item label="Work">
                <List.Item.Icon icon={Folder} size="sm" />
                <List.Item.Expandable>
                  <List.Item label="Q4 Report.pdf">
                    <List.Item.Icon icon={FileText} size="sm" />
                  </List.Item>
                  <List.Item label="Budget.xlsx">
                    <List.Item.Icon icon={File} size="sm" />
                  </List.Item>
                </List.Item.Expandable>
              </List.Item>
              <List.Item label="Personal">
                <List.Item.Icon icon={Folder} size="sm" />
                <List.Item.Expandable>
                  <List.Item label="Resume.docx">
                    <List.Item.Icon icon={FileText} size="sm" />
                  </List.Item>
                </List.Item.Expandable>
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
          <List.Item label="Pictures">
            <List.Item.Icon icon={Folder} size="sm" />
            <List.Item.Expandable>
              <List.Item label="vacation.jpg">
                <List.Item.Icon icon={Image} size="sm" />
              </List.Item>
              <List.Item label="profile.png">
                <List.Item.Icon icon={Image} size="sm" />
              </List.Item>
            </List.Item.Expandable>
          </List.Item>
        </List>
      </div>
    );
  },
};

export const WithGroup: Story = {
  render: () => {
    return (
      <div className="w-72">
        <List>
          <List.Group label="Documents">
            <List.Item label="Home" />
            <List.Item label="Documents" />
            <List.Item label="Settings" />
          </List.Group>
        </List>
      </div>
    );
  },
};
