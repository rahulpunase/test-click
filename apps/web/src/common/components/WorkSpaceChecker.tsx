import React from "react";
import { useGetWorkspaceBySlug } from "@repo/backend/workspaces/queries";
import { LoadingScreen } from "./LoadingScreen";
import { Navigate } from "react-router";
import { GlobalDataProvider } from "../providers/globalDataProvider/globalDataProvider";
import { useGetCurrentUser } from "@repo/backend/user/queries";
import { useGetMemberWithProfile } from "@repo/backend/members/queries";

type Props = {
  children: React.ReactNode;
  workSpaceSlug: string;
};

const WorkSpaceChecker = ({ children, workSpaceSlug }: Props) => {
  const { data: workSpace, isPending: isWorkspacePending } =
    useGetWorkspaceBySlug(workSpaceSlug);
  const { data: user, isPending: isUserPending } = useGetCurrentUser();
  const { data: memberData, isPending: isMemberPending } =
    useGetMemberWithProfile(workSpace?._id!);

  if (isWorkspacePending || isUserPending || isMemberPending) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  if (!workSpace) {
    return <Navigate to="/onboarding/get-started" />;
  }

  if (!memberData) {
    return <Navigate to="/onboarding/get-started" />;
  }

  return (
    <GlobalDataProvider
      defaultValue={{
        workSpace,
        user,
        member: memberData.member,
        memberProfile: memberData.profile,
      }}
    >
      {children}
    </GlobalDataProvider>
  );
};

export default WorkSpaceChecker;
