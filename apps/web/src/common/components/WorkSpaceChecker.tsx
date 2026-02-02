import React from "react";
import { useGetWorkspaceBySlug } from "@repo/backend/workspaces/queries";
import { LoadingScreen } from "./LoadingScreen";
import { Navigate } from "react-router";
import { GlobalDataProvider } from "../providers/globalDataProvider/globalDataProvider";
import { useGetCurrentUser } from "@repo/backend/user/queries";

type Props = {
  children: React.ReactNode;
  workSpaceSlug: string;
};

const WorkSpaceChecker = ({ children, workSpaceSlug }: Props) => {
  const { data: workSpace, isPending: isWorkspacePending } =
    useGetWorkspaceBySlug(workSpaceSlug);
  const { data: user, isPending: isUserPending } = useGetCurrentUser();

  if (isWorkspacePending || isUserPending) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  if (!workSpace) {
    return <Navigate to="/onboarding/get-started" />;
  }

  return (
    <GlobalDataProvider defaultValue={{ workSpace, user }}>
      {children}
    </GlobalDataProvider>
  );
};

export default WorkSpaceChecker;
