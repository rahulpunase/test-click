import { Popover, Button, List, Icon, Separator } from "@repo/ui";
import { useFetchUserMemberships } from "@repo/backend/members/queries";
import { useGlobalData } from "../../providers/globalDataProvider/globalDataProvider";
import { useNavigate } from "react-router";
import {
  Settings,
  Users,
  Puzzle,
  LayoutTemplate,
  FormInput,
  Zap,
  Plus,
  ChevronDown,
} from "lucide-react";
import { cn } from "@repo/ui/utils";
import { useNavigateActions } from "./hooks/useNavigateActions";

const manageItems = [
  { label: "Apps", icon: Puzzle },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Custom Fields", icon: FormInput },
  { label: "Automations", icon: Zap },
];

export const WorkspaceSelector = () => {
  const { workSpace } = useGlobalData();
  const { data: memberships } = useFetchUserMemberships();
  const { navigateWithWorkspace } = useNavigateActions();

  const navigate = useNavigate();

  const otherWorkspaces =
    memberships?.filter((m) => m.workspace._id !== workSpace._id) ?? [];

  const handleWorkspaceSwitch = (slug: string) => {
    navigate(`/${slug}`);
  };

  const navigateToSettings = () => {
    navigateWithWorkspace(`/settings/people`);
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Popover>
      <Popover.Trigger asChild>
        <button
          className={cn(
            "flex w-full items-center gap-2 px-2 py-1 max-h-full border border-border-2  hover:bg-background-hover rounded-md cursor-pointer transition-colors",
            "aria-expanded:bg-background-hover",
          )}
        >
          <Icon
            letter={getInitial(workSpace.name)}
            size="md"
            className="bg-primary text-white"
          />
          <span className="text-sm font-medium text-text-primary truncate">
            {workSpace.name}
          </span>
          <ChevronDown className="w-4 h-4 ml-auto text-text-muted" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        align="start"
        side="bottom"
        sideOffset={8}
        className="w-72 p-0"
      >
        {/* Header Section */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Icon
              letter={getInitial(workSpace.name)}
              size="lg"
              className="bg-primary text-white"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-text-primary truncate">
                {workSpace.name}
              </h3>
              <p className="text-sm text-text-muted">
                Free Forever •{" "}
                <a href="#" className="link hover:underline">
                  Upgrade
                </a>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="outlined"
              size="sm"
              className="flex-1"
              color="tertiary"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outlined"
              size="sm"
              className="flex-1"
              color="tertiary"
              onClick={navigateToSettings}
            >
              <Users className="w-4 h-4 mr-2" />
              People
            </Button>
          </div>
        </div>

        <Separator orientation="horizontal" />

        {/* Manage Section */}
        <div className="py-2">
          <List>
            <List.Group label="Manage">
              {manageItems.map((item) => (
                <List.Item
                  key={item.label}
                  label={item.label}
                  className="cursor-pointer"
                >
                  <List.Item.Icon icon={item.icon} size="sm" />
                </List.Item>
              ))}
            </List.Group>
          </List>
        </div>

        <Separator orientation="horizontal" />

        {/* Switch Workspaces Section */}
        <div className="py-2">
          <List>
            <List.Group label="Switch Workspaces">
              {otherWorkspaces.map((membership) => (
                <List.Item
                  key={membership.workspace._id}
                  label={membership.workspace.name}
                  className="cursor-pointer"
                  onClick={() =>
                    handleWorkspaceSwitch(membership.workspace.slug)
                  }
                >
                  <Icon
                    letter={getInitial(membership.workspace.name)}
                    size="sm"
                    className="bg-primary text-white"
                  />
                </List.Item>
              ))}
              {otherWorkspaces.length === 0 && (
                <p className="text-sm text-text-muted-2 px-3 py-2">
                  No other workspaces
                </p>
              )}
            </List.Group>
          </List>
        </div>

        <Separator orientation="horizontal" />

        {/* Create Workspace Button */}
        <div className="p-2">
          <Button
            variant="ghost"
            size="md"
            color="tertiary"
            className="w-full justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workspace
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
};
