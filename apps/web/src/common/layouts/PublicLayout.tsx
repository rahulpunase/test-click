import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Placeholder for optional public header/footer */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
