import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import {
  useGetConstants,
  useGetUserSidebarConfiguration,
} from "@repo/backend/sidebar/queries";

export const useSidebarItemsToRender = () => {
  const { workSpace } = useGlobalData();
  const { data: sidebarConfiguration } = useGetUserSidebarConfiguration(
    workSpace._id,
  );
  const { data: constants } = useGetConstants();

  const navItems = constants?.navigations ?? [];
  const homeSectionItems = constants?.home ?? [];
  const sections = constants?.sections ?? [];

  const userSelectedNavItems = sidebarConfiguration?.navigation ?? [];
  const userSelectedHomeSectionItems = sidebarConfiguration?.home ?? [];

  return {
    navItems,
    homeSectionItems,
    userSelectedNavItems,
    userSelectedHomeSectionItems,
    sections,
  };
};
