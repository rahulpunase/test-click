import { HomeSection } from "./HomeSection";
import { Separator } from "@repo/ui";
import { useSidebarItemsToRender } from "./hooks/useSidebarItemsToRender";
import { CustomSections } from "./custom-sections/CustomSections";

export const AppSidebar = () => {
  const { homeSectionItems, userSelectedHomeSectionItems } =
    useSidebarItemsToRender();

  return (
    <div className="flex flex-col border-r border-border-2 bg-background w-52 h-full">
      <div className="flex-1 pb-2 px-2 overflow-y-auto">
        <HomeSection
          homeSectionItems={homeSectionItems}
          userSelectedHomeSectionItems={userSelectedHomeSectionItems}
        />
        <Separator orientation="horizontal" className="my-2" />
        <CustomSections />
      </div>
    </div>
  );
};
