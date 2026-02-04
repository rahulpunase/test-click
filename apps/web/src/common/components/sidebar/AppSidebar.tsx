import { HomeSection } from "./HomeSection";
import { Separator } from "@repo/ui";
import { SpacesSection } from "./spaces/SpacesSection";
import type {
  HomeSectionItems,
  UserSelectedHomeSectionItems,
} from "./Sidebar.types";

type AppSidebarProps = {
  homeSectionItems: HomeSectionItems;
  userSelectedHomeSectionItems: UserSelectedHomeSectionItems;
};

export const AppSidebar = ({
  homeSectionItems,
  userSelectedHomeSectionItems,
}: AppSidebarProps) => {
  return (
    <div className="flex flex-col border-r border-border-2 bg-background w-52 h-full">
      <div className="flex-1 pb-2 px-2 overflow-y-auto">
        <HomeSection
          homeSectionItems={homeSectionItems}
          userSelectedHomeSectionItems={userSelectedHomeSectionItems}
        />
        <Separator orientation="horizontal" className="my-2" />
        <SpacesSection />
      </div>
    </div>
  );
};
