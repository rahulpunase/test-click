import { useSearchParams } from "react-router";
import { CreateWorkspaceForm } from "../components/CreateWorkspaceForm";
import type { Id } from "@repo/backend/types";

export const CreateWorkspacePage = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-lg mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome!</h1>
        <p className="text-text-muted">Let's set up your new workspace.</p>
      </div>
      {workspaceId && (
        <CreateWorkspaceForm workspaceId={workspaceId as Id<"workspaces">} />
      )}
    </div>
  );
};
