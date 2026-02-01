import React from "react";
import { useGetWorkspaceBySlug } from "@repo/backend/workspaces/queries";
import { LoadingScreen } from "./LoadingScreen";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
  workSpaceSlug: string;
};

const WorkSpaceChecker = ({ children, workSpaceSlug }: Props) => {
  const { data: workspace, isPending: isWorkspacePending } =
    useGetWorkspaceBySlug(workSpaceSlug);

  if (isWorkspacePending) {
    return <LoadingScreen />;
  }

  if (!workspace) {
    return <Navigate to="/onboarding/get-started" />;
  }

  return children;
};

export default WorkSpaceChecker;
