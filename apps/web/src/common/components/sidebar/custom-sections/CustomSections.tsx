import { useSidebarItemsToRender } from "../hooks/useSidebarItemsToRender";
import { sectionMapping } from "./sectionMapping";

export const CustomSections = () => {
  const { sections } = useSidebarItemsToRender();
  return (
    <div className="flex flex-col gap-2 px-1">
      {sections.map((section) => {
        if (!sectionMapping[section.id as keyof typeof sectionMapping]) {
          return null;
        }
        const Component =
          sectionMapping[section.id as keyof typeof sectionMapping];
        return <Component key={section.id} />;
      })}
    </div>
  );
};
