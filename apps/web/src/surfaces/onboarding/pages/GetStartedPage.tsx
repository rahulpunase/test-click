import { useNavigate } from "react-router";
import { useFetchUserMemberships } from "@repo/backend/workspaces/queries";
import { WorkspaceList } from "../components/WorkspaceList";
import { Card } from "@repo/ui";
import { Building2 } from "lucide-react";

export const GetStartedPage = () => {
  const navigate = useNavigate();
  const { data: memberships, isPending } = useFetchUserMemberships();

  const handleCreateNew = () => {
    navigate("/onboarding/create-workspace");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-lg mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome!</h1>
        <p className="text-text-muted">Let's set up your new workspace.</p>
      </div>
      <Card>
        <Card.Tabs>
          <Card.Header>
            <Card.Tabs.List>
              <Card.Tabs.Trigger
                value="workspaces"
                icon={<Building2 className="h-5 w-5" />}
              >
                Workspaces
              </Card.Tabs.Trigger>
            </Card.Tabs.List>
          </Card.Header>
          <Card.Tabs.Content value="workspaces">
            <div className="p-6 px-4">
              <WorkspaceList
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                memberships={(memberships || []) as any}
                onCreateNew={handleCreateNew}
              />
            </div>
          </Card.Tabs.Content>
        </Card.Tabs>
      </Card>
    </div>
  );
};
