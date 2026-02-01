import { Card } from "@repo/ui";
import { ArrowRight, Users } from "lucide-react";
import type { Doc } from "@repo/backend/types";

interface WorkspaceCardProps {
  workspace: Doc<"workspaces">;
  memberCount?: number; // Optional as we might not have this initially
  lastActive?: string; // Optional place holder
}

export const WorkspaceCard = ({
  workspace,
  memberCount,
  lastActive,
}: WorkspaceCardProps) => {
  return (
    <Card className="w-full hover:bg-background-hover transition-colors cursor-pointer group">
      <Card.Content className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-linear-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold text-xl shadow-sm">
            {/* If logo exists use it, else initials */}
            {workspace.name.substring(0, 1).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-text-primary group-hover:text-primary-hover transition-colors">
              {workspace.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              {memberCount !== undefined && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {memberCount} members
                </span>
              )}
              {lastActive && (
                <>
                  <span>•</span>
                  <span>{lastActive}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary-hover transition-colors" />
      </Card.Content>
    </Card>
  );
};
