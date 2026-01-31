import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthToken } from "@repo/backend";
import { useFetchCurrentUser } from "@repo/backend/user/queries";
import { LoadingScreen } from "../components/LoadingScreen";

export const PublicLayout = () => {
  const navigate = useNavigate();
  const token = useAuthToken();
  const { data: user, isPending } = useFetchCurrentUser();

  useEffect(() => {
    // If we have a token and a user is confirmed by the backend, redirect to home
    if (!isPending && token && user) {
      navigate("/");
    }
  }, [token, user, isPending, navigate]);

  if (isPending) {
    return <LoadingScreen />;
  }

  // If we are authenticated (have token and user), we are about to redirect.
  // Don't render the public content (e.g. login form).
  if (token && user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Placeholder for optional public header/footer */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
