import { Checkbox, List } from "@repo/ui";
import { useSidebarItemsToRender } from "../hooks/useSidebarItemsToRender";
import { useUpdateHome } from "@repo/backend/sidebar/mutations";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";

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
    <div className="py-3">
      <List className="gap-1">
        {finalState.map((item) => {
          return (
            <List.Item
              key={item.id}
              label={item.title}
              description={item.description}
            >
              <List.Item.LeftContent>
                <Checkbox
                  defaultChecked={item.isPinned}
                  onCheckedChange={() => handleCheckedChange(item.id)}
                />
              </List.Item.LeftContent>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};
