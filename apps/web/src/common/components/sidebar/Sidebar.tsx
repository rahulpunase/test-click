import { AppRail } from "./app-rail/AppRail";
import { AppSidebar } from "./AppSidebar";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import {
  useGetConstants,
  useGetUserSidebarConfiguration,
} from "@repo/backend/sidebar/queries";

export const Sidebar = () => {
  const { workSpace } = useGlobalData();
  const { data: sidebarConfiguration } = useGetUserSidebarConfiguration(
    workSpace._id,
  );
  const { data: constants } = useGetConstants();

  const navItems = constants?.navigations ?? [];

  const userSelectedNavItems = sidebarConfiguration?.navigation ?? [];

  return (
    <>
      {/* Rail */}
      <AppRail
        navItems={navItems}
        userSelectedNavItems={userSelectedNavItems}
      />
      {/* Sidebar */}
      <AppSidebar />
    </>
  );
};
