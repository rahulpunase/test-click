import { WorkspaceCard } from "./WorkspaceCard";
import { EmptyWorkspaceState } from "./EmptyWorkspaceState";
import type { Doc, Id } from "@repo/backend/types";

interface WorkspaceListProps {
  memberships: Array<{
    _id: Id<"members">;
    role: "admin" | "member";
    workspace: Doc<"workspaces">;
    userId: Id<"users">;
  }>;
  onCreateNew: () => void;
}

export const WorkspaceList = ({
  memberships,
  onCreateNew,
}: WorkspaceListProps) => {
  if (memberships.length === 0) {
    return <EmptyWorkspaceState onCreateNew={onCreateNew} />;
  }

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="flex flex-col gap-3">
        {memberships.map((membership) => (
          <WorkspaceCard
            key={membership.workspace._id}
            workspace={membership.workspace}
            // We don't have member count in the query yet, passing undefined for now or mock if needed
          />
        ))}
      </div>

      <div className="pt-4 border-t border-border-1 mt-6">
        <a onClick={onCreateNew} className="link text-sm">
          Create a new workspace
        </a>
        <p className="text-sm text-text-muted">
          Not seeing your workspace?{" "}
          <a className="link">Try a different email address</a>
        </p>
      </div>
    </div>
  );
};
