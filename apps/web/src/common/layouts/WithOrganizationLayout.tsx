import { Navigate, Outlet } from "react-router";
import { useFetchUserMemberships } from "@repo/backend/organizations/queries";
import { LoadingScreen } from "../components/LoadingScreen";

export const WithOrganizationLayout = () => {
  const { data: memberships, isPending: isMembershipsPending } =
    useFetchUserMemberships();

  if (isMembershipsPending) {
    return <LoadingScreen />;
  }

  if (!memberships || memberships.length === 0) {
    return <Navigate to="/onboarding/create-organization" />;
  }

  return <Outlet />;
};
