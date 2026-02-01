import { Navigate, Outlet } from "react-router";
import { useFetchUserMemberships } from "@repo/backend/workspaces/queries";
import { LoadingScreen } from "../components/LoadingScreen";

export const WithWorkspaceLayout = () => {
  const { data: memberships, isPending: isMembershipsPending } =
    useFetchUserMemberships();

  if (isMembershipsPending) {
    return <LoadingScreen />;
  }

  if (!memberships || memberships.length === 0) {
    return <Navigate to="/onboarding/create-workspace" />;
  }

  return <Outlet />;
};
