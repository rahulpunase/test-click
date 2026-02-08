import { List, Icon } from "@repo/ui";
import { useSidebarItemsToRender } from "../hooks/useSidebarItemsToRender";
import { GripVertical } from "lucide-react";

export const SectionsTabSection = () => {
  const { sections } = useSidebarItemsToRender();
  return (
    <div className="px-4 py-5">
      <List className="gap-1">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex flex-row items-center py-2 px-2 gap-2 border border-border-3 rounded-lg cursor-grab"
          >
            <Icon icon={GripVertical} className="text-text-muted" />
            <span className="text-sm font-normal leading-none text-text-secondary">
              {section.title}
            </span>
          </div>
        ))}
      </List>
    </div>
  );
};
