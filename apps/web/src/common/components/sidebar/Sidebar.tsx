import { AppRail } from "./app-rail/AppRail";
import { AppSidebar } from "./AppSidebar";
import { NavConfigDialog } from "./nav-config-dialog/NavConfigDialog";

export const Sidebar = () => {
  return (
    <>
      {/* Rail */}
      <AppRail />
      {/* Sidebar */}
      <AppSidebar />
      {/* Nav Config Dialog */}
      <NavConfigDialog />
    </>
  );
};
