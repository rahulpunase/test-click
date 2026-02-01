import { useNavigate } from "react-router";
import { useFetchUserMemberships } from "@repo/backend/workspaces/queries";
import { WorkspaceList } from "../components/WorkspaceList";
import { Building2 } from "lucide-react";

export const GetStartedPage = () => {
  const navigate = useNavigate();
  const { data: memberships, isPending } = useFetchUserMemberships();

  const handleCreateNew = () => {
    navigate("/onboarding/create-workspace");
  };

  return (
    <div className="flex flex-col items-center justify-start h-full pt-20 px-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          <Building2 className="w-6 h-6 text-text-primary" />
          <h1 className="text-xl font-semibold text-text-primary">
            My workspaces
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border-1 overflow-hidden">
          <div className="px-6 py-4 border-b border-border-1 bg-white">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-text-primary border-b-2 border-primary-hover pb-4 -mb-4.5 z-10">
                Workspaces
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-sm font-medium text-text-muted mb-4">
                Ready to launch
              </h2>
              <WorkspaceList
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                memberships={(memberships || []) as any}
                onCreateNew={handleCreateNew}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
