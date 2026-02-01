import { Outlet } from "react-router";
import { AppSidebar } from "../components/AppSidebar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Placeholder for Sidebar */}
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        {/* Placeholder for Header */}
        <header className="h-14 border-b border-border-2 flex items-center px-4">
          <span className="font-medium">Header</span>
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
