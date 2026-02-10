import { useSidebarItemsToRender } from "../hooks/useSidebarItemsToRender";
import { sectionMapping } from "./sectionMapping";
import { useMemberRole } from "../../permissions-and-roles";

export const CustomSections = () => {
  const { sections } = useSidebarItemsToRender();
  const { role } = useMemberRole();
  return (
    <div className="flex flex-col gap-2 px-1">
      {sections.map((section) => {
        if (!section.visibility?.includes(role)) {
          return null;
        }
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
