import { Navigate, Outlet } from "react-router";
import { ProfileDropdown } from "../components/profile-dropdown/ProfileDropdown";
import { useGlobalData } from "../providers/globalDataProvider/globalDataProvider";
import { Sidebar } from "../components/sidebar/Sidebar";
import { CreateSpaceDialog } from "../components/spaces/CreateSpaceDialog";
import { CreateProjectDialog } from "../components/projects/CreateProjectDialog";

export const MainLayout = () => {
  const { workSpace } = useGlobalData();

  if (!workSpace) {
    return <Navigate to="/onboarding/get-started" />;
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="h-10 border-b border-border-2 flex items-center px-4 space-between shrink-0">
        <div className="flex-1">Header</div>
        <ProfileDropdown />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
        <CreateSpaceDialog />
        <CreateProjectDialog />
      </div>
    </div>
  );
};
