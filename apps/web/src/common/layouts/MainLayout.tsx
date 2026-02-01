import { Navigate, Outlet, useParams } from "react-router";
import { AppSidebar } from "../components/app-sidebar/AppSidebar";
import { ProfileDropdown } from "../components/profile-dropdown/ProfileDropdown";

export const MainLayout = () => {
  const { workspaceId: workSpaceSlug } = useParams();

  if (!workSpaceSlug) {
    return <Navigate to="/onboarding/get-started" />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Placeholder for Sidebar */}
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        {/* Placeholder for Header */}
        <header className="h-14 border-b border-border-2 flex items-center px-4 space-between">
          <div className="flex-1">Header</div>
          <ProfileDropdown />
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
