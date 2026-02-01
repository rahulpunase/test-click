import { Card } from "@repo/ui";
import { useState } from "react";
import { WorkspaceNameStep } from "./WorkspaceNameStep";
import { ConfirmUserStep } from "./ConfirmUserStep";
import { InviteUsersStep } from "./InviteUsersStep";
import { Building2, User, UserPlus } from "lucide-react";
import type { Id } from "@repo/backend/types";

interface CreateWorkspaceFormProps {
  workspaceId: Id<"workspaces">;
}

export const CreateWorkspaceForm = ({
  workspaceId,
}: CreateWorkspaceFormProps) => {
  const [currentTab, setCurrentTab] = useState("workspace-name");

  return (
    <Card className="min-w-2xl">
      <Card.Tabs value={currentTab} onValueChange={setCurrentTab}>
        <Card.Header
          title="Create Workspace"
          icon={<Building2 className="w-5 h-5" />}
        >
          <Card.Tabs.List className="grid w-full grid-cols-3 mt-4">
            <Card.Tabs.Trigger
              value="workspace-name"
              icon={<Building2 className="w-4 h-4" />}
              label="Details"
            />
            <Card.Tabs.Trigger
              value="confirm-user"
              icon={<User className="w-4 h-4" />}
              label="You"
            />
            <Card.Tabs.Trigger
              value="invite-users"
              icon={<UserPlus className="w-4 h-4" />}
              label="Team"
            />
          </Card.Tabs.List>
        </Card.Header>

        <Card.Content className="pt-6">
          <Card.Tabs.Content value="workspace-name">
            <WorkspaceNameStep
              onNext={() => setCurrentTab("confirm-user")}
              workspaceId={workspaceId}
            />
          </Card.Tabs.Content>
          <Card.Tabs.Content value="confirm-user">
            <ConfirmUserStep
              onNext={() => setCurrentTab("invite-users")}
              onBack={() => setCurrentTab("workspace-name")}
              workspaceId={workspaceId}
            />
          </Card.Tabs.Content>
          <Card.Tabs.Content value="invite-users">
            <InviteUsersStep
              onFinish={() => console.log("Form Completed!")}
              onBack={() => setCurrentTab("confirm-user")}
            />
          </Card.Tabs.Content>
        </Card.Content>
      </Card.Tabs>
    </Card>
  );
};
