import { Button, Dropdown, List, Separator } from "@repo/ui";
import { Edit, LoaderCircle, MoreHorizontal, Pin, PinOff } from "lucide-react";

import type {
  HomeSectionItems,
  UserSelectedHomeSectionItems,
} from "./Sidebar.types";
import { useMemo } from "react";
import { iconMapper } from "./constants/iconMapper";
import { useSidebarStore } from "./hooks/useSidebarStore";

type HomeSectionProps = {
  homeSectionItems: HomeSectionItems;
  userSelectedHomeSectionItems: UserSelectedHomeSectionItems;
};

const BY_DEFAULT_VISIBLE_ITEMS = 5;

export const HomeSection = ({
  homeSectionItems,
  userSelectedHomeSectionItems,
}: HomeSectionProps) => {
  const { openNavConfigDialog } = useSidebarStore();
  const itemsToRender = useMemo(() => {
    // No items are pinned
    if (!userSelectedHomeSectionItems.length) {
      return homeSectionItems;
    }
    return userSelectedHomeSectionItems;
  }, [homeSectionItems, userSelectedHomeSectionItems]);

  const { visibleItems, overflowItems } = useMemo(() => {
    const pinnedItems = itemsToRender.filter((item) => item.isPinned);
    const unpinnedItems = itemsToRender.filter((item) => !item.isPinned);

    // Check if we need a "More" button
    // We need it if there are unpinned items OR if pinned items don't fit
    const needsMoreButton =
      unpinnedItems.length > 0 || pinnedItems.length > BY_DEFAULT_VISIBLE_ITEMS;

    // If we need the "More" button, we reserve one slot for it
    const visibleCount = needsMoreButton
      ? Math.max(0, BY_DEFAULT_VISIBLE_ITEMS - 1)
      : BY_DEFAULT_VISIBLE_ITEMS;

    const visiblePinned = pinnedItems.slice(0, visibleCount);
    const overflowPinned = pinnedItems.slice(visibleCount);

    return {
      visibleItems: visiblePinned,
      overflowItems: [...overflowPinned, ...unpinnedItems],
    };
  }, [itemsToRender]);

  return (
    <div>
      <div className="py-2 px-2 font-bold">Home</div>
      <List>
        {visibleItems.map((item) => {
          const Icon = iconMapper[item.icon] || LoaderCircle;
          return (
            <List.Item key={item.id} label={item.title}>
              <List.Item.Icon icon={Icon} size="sm" />
            </List.Item>
          );
        })}
        {overflowItems.length > 0 && (
          <Dropdown>
            <Dropdown.Trigger asChild>
              <List.Item label="More">
                <List.Item.Icon icon={MoreHorizontal} size="sm" />
              </List.Item>
            </Dropdown.Trigger>
            <Dropdown.Content align="start" side="right" className="min-w-48">
              {overflowItems.map((item) => {
                const Icon = iconMapper[item.icon];
                return (
                  <Dropdown.Item
                    icon={Icon ? <Icon /> : <LoaderCircle />}
                    label={item.title}
                  >
                    <Dropdown.Item.RightAction>
                      <Button
                        aria-label="pin-action"
                        icon={item.isPinned ? PinOff : Pin}
                        variant="ghost"
                        color="tertiary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("pin clicked");
                        }}
                      />
                    </Dropdown.Item.RightAction>
                  </Dropdown.Item>
                );
              })}
              <Separator className="my-2" />
              <Dropdown.Item
                onClick={() => openNavConfigDialog("home")}
                icon={<Edit />}
                label="Configure"
              />
            </Dropdown.Content>
          </Dropdown>
        )}
      </List>
    </div>
  );
};
