import { List } from "@repo/ui";
import { useSidebarItemsToRender } from "../hooks/useSidebarItemsToRender";

export const NavigationTabSection = () => {
  const { navItems } = useSidebarItemsToRender();
  return (
    <div className="py-3">
      <List className="gap-1">
        {navItems.map((item) => {
          return (
            <List.Item
              key={item.id}
              label={item.title}
              description={item.description}
            >
              <List.Item.LeftContent>source</List.Item.LeftContent>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};
