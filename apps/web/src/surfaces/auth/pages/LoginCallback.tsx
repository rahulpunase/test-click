import { Navigate } from "react-router";
import { useFetchCurrentUser } from "@repo/backend/user/queries";
import { useFetchUserMemberships } from "@repo/backend/members/queries";
import { LoadingScreen } from "@/common/components/LoadingScreen";

export const LoginCallback = () => {
  const { data: user, isPending: isUserPending } = useFetchCurrentUser();
  const { data: memberships, isPending: isMembershipsPending } =
    useFetchUserMemberships();

  if (isUserPending || isMembershipsPending) {
    return <LoadingScreen />;
  }

  if (user === null) {
    return <Navigate to="/signin" replace />;
  }

  if (memberships === undefined) {
    return <LoadingScreen />;
  }

  return <Navigate to="/onboarding/get-started" replace />;
};
