import { Checkbox, List } from "@repo/ui";
import { useSidebarItemsToRender } from "../hooks/useSidebarItemsToRender";
import { useUpdateHome } from "@repo/backend/sidebar/mutations";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import { iconMapper } from "../constants/iconMapper";
import { Loader2 } from "lucide-react";

export const HomeTabSection = () => {
  const { homeSectionItems, userSelectedHomeSectionItems } =
    useSidebarItemsToRender();
  const { mutate: updateHome } = useUpdateHome();
  const { workSpace } = useGlobalData();

  const finalState = homeSectionItems.map((item) => {
    const isPinned = userSelectedHomeSectionItems.length
      ? !!userSelectedHomeSectionItems.find((navItem) => navItem.id === item.id)
          ?.isPinned
      : item.isPinned;
    return {
      ...item,
      isPinned,
    };
  });

  const handleCheckedChange = (id: string) => {
    // it means the item is checked, we need to uncheck it
    const newState = [...finalState].map((item) => {
      if (item.id === id && item.isPinned) {
        return {
          ...item,
          isPinned: false,
        };
      }
      if (item.id === id && !item.isPinned) {
        return {
          ...item,
          isPinned: true,
        };
      }
      return item;
    });
    updateHome({
      workspaceId: workSpace._id,
      home: newState,
    });
  };

  return (
    <div className="py-5">
      <List className="gap-3">
        {finalState.map((item) => {
          const Icon = iconMapper[item.icon] ?? Loader2;
          return (
            <Checkbox
              key={item.id}
              defaultChecked={item.isPinned}
              onCheckedChange={() => handleCheckedChange(item.id)}
              label={
                <div className="flex flex-row items-center gap-2">
                  <Icon className="h-4 w-4 text-text-secondary" />
                  <span className="text-sm font-normal leading-none text-text-secondary">
                    {item.title}
                  </span>
                </div>
              }
              description={item.description}
            />
          );
        })}
      </List>
    </div>
  );
};
