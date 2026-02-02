import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import { HomeSection } from "./HomeSection";
import { Separator } from "@repo/ui";
import { SpacesSection } from "./spaces/SpacesSection";

export const AppSidebar = () => {
  const { workSpace } = useGlobalData();

  return (
    <div className="flex flex-col border-r border-border-2 bg-background w-52 h-full">
      {/* <div className="flex items-center justify-between p-3 h-10 border-b border-border-1 shrink-0">
        <span className="font-semibold text-text-primary truncate">
          {workSpace.name}
        </span>
      </div> */}

      <div className="flex-1 pb-2 px-2 overflow-y-auto">
        <HomeSection />
        <Separator orientation="horizontal" className="my-3" />
        <SpacesSection />
      </div>
    </div>
  );
};
