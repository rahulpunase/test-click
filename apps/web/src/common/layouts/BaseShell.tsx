import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import { ProfileDropdown } from "../components/profile-dropdown/ProfileDropdown";
import { useGlobalData } from "../providers/globalDataProvider/globalDataProvider";
import { AppRail } from "../components/sidebar/app-rail/AppRail";
import { WorkspaceSelector } from "../components/workspace/WorkspaceSelector";

type BaseShellProps = {
  sidebar: ReactNode;
};

export const BaseShell = ({ sidebar }: BaseShellProps) => {
  const { workSpace } = useGlobalData();

  if (!workSpace) {
    return <Navigate to="/onboarding/get-started" />;
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border-2 flex items-center px-2 space-between shrink-0">
        <div className="flex-1 max-h-full max-w-full">
          <div className="w-40 py-1">
            <WorkspaceSelector />
          </div>
        </div>
        <ProfileDropdown />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Rail - fixed width controlled by layout */}
        <aside className="w-[72px] shrink-0">
          <AppRail />
        </aside>

        {/* Sidebar - fixed width controlled by layout */}
        <aside className="w-60 shrink-0">{sidebar}</aside>

        {/* Main content - flexible */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
