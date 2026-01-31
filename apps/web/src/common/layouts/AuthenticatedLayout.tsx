import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthToken } from "@repo/backend";
import { useFetchCurrentUser } from "@repo/backend/user/queries";
import { LoadingScreen } from "../components/LoadingScreen";

export const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const token = useAuthToken();
  const { data: user, isPending } = useFetchCurrentUser();

  useEffect(() => {
    // If not in pending state and either token is missing or user fetch returned null, redirect to login
    if (!isPending && (!token || user === null)) {
      navigate("/signin");
    }
  }, [token, user, isPending, navigate]);

  if (isPending) {
    return <LoadingScreen />;
  }

  // Double check to avoid flash of content if useEffect hasn't fired yet
  // If we settled (not pending) and don't have user/token, we render null (or loading) while redirect happens
  if (!token || user === null) {
    return <LoadingScreen />;
  }
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
};
