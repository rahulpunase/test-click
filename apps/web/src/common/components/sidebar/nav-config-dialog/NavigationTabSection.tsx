import { Checkbox, List } from "@repo/ui";
import { useSidebarItemsToRender } from "../hooks/useSidebarItemsToRender";
import { useUpdateNavigation } from "@repo/backend/sidebar/mutations";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";

export const NavigationTabSection = () => {
  const { navItems, userSelectedNavItems } = useSidebarItemsToRender();
  const { mutate: updateNavigation } = useUpdateNavigation();
  const { workSpace } = useGlobalData();

  const finalState = navItems.map((item) => {
    const isPinned = userSelectedNavItems.find(
      (navItem) => navItem.id === item.id,
    )?.isPinned;
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
    updateNavigation({
      workspaceId: workSpace._id,
      navigation: newState,
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
