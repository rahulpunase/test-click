import { Navigate, Outlet, useParams } from "react-router";
import { useFetchUserMemberships } from "@repo/backend/members/queries";
import { LoadingScreen } from "../components/LoadingScreen";
import WorkSpaceChecker from "../components/WorkSpaceChecker";

export const WithWorkspaceLayout = () => {
  const { data: memberships, isPending: isMembershipsPending } =
    useFetchUserMemberships();

  const { workspaceId: workSpaceSlug } = useParams();

  if (!workSpaceSlug) {
    return <Navigate to="/onboarding/get-started" />;
  }

  const Children = () => {
    if (isMembershipsPending) {
      return <LoadingScreen />;
    }

    if (!memberships || memberships.length === 0) {
      return <Navigate to="/onboarding/get-started" />;
    }

    return <Outlet />;
  };

  return (
    <WorkSpaceChecker workSpaceSlug={workSpaceSlug}>
      <Children />
    </WorkSpaceChecker>
  );
};
