import { AppRail } from "./app-rail/AppRail";
import { AppSidebar } from "./AppSidebar";
import { useSidebarItemsToRender } from "./hooks/useSidebarItemsToRender";
import { NavConfigDialog } from "./nav-config-dialog/NavConfigDialog";

export const Sidebar = () => {
  const {
    navItems,
    homeSectionItems,
    userSelectedNavItems,
    userSelectedHomeSectionItems,
  } = useSidebarItemsToRender();

  console.log({ homeSectionItems, userSelectedNavItems });

  return (
    <>
      {/* Rail */}
      <AppRail
        navItems={navItems}
        userSelectedNavItems={userSelectedNavItems}
      />
      {/* Sidebar */}
      <AppSidebar
        homeSectionItems={homeSectionItems}
        userSelectedHomeSectionItems={userSelectedHomeSectionItems}
      />

      <NavConfigDialog />
    </>
  );
};
