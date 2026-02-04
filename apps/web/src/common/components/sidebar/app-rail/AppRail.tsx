"use client";

import { AppRailItem } from "./AppRailItem";
import type { Navitems, UserSelectedNavItems } from "../Sidebar.types";
import { useMemo, useRef, useState, useEffect } from "react";
import { iconMapper } from "../constants/iconMapper";
import { Settings, Plus, MoreHorizontal } from "lucide-react";
import { Button, Dropdown, Separator } from "@repo/ui";
import { useSidebarStore } from "../hooks/useSidebarStore";

type AppRailProps = {
  navItems: Navitems["navigations"];
  userSelectedNavItems: UserSelectedNavItems;
};

const ITEM_HEIGHT = 51; // Approx height of one item
const GAP = 8; // Gap between items (gap-2)

function useAvailableHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      setHeight(entries[0].contentRect.height);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return height;
}

export const AppRail = ({ navItems, userSelectedNavItems }: AppRailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const availableHeight = useAvailableHeight(containerRef);
  const { isNavConfigDialogOpen, setNavConfigDialogOpen } = useSidebarStore();

  const itemsToRender = useMemo(() => {
    if (!userSelectedNavItems.length) {
      return navItems;
    }
    return userSelectedNavItems;
  }, [navItems, userSelectedNavItems]);

  const { visibleItems, overflowItems } = useMemo(() => {
    if (availableHeight === null) {
      // Server-side or initial render: show all (or could show none to avoid flash)
      // Showing all might break layout if really small, but better than nothing.
      return { visibleItems: itemsToRender, overflowItems: [] };
    }

    // Calculate how many items fit
    // availableHeight >= N * ITEM_HEIGHT + (N - 1) * GAP
    // availableHeight + GAP >= N * (ITEM_HEIGHT + GAP)
    // N <= (availableHeight + GAP) / (ITEM_HEIGHT + GAP)

    // We also need to account for padding/margins if any, but let's assume flex container matches.
    const itemSpace = ITEM_HEIGHT + GAP;
    const maxItems = Math.floor((availableHeight + GAP) / itemSpace);

    if (itemsToRender.length <= maxItems) {
      return { visibleItems: itemsToRender, overflowItems: [] };
    }

    // If we have overflow, we need space for the "More" button
    // "More" button takes same space as an item.
    // So visible items count = maxItems - 1
    const visibleCount = Math.max(0, maxItems - 1);

    return {
      visibleItems: itemsToRender.slice(0, visibleCount),
      overflowItems: itemsToRender.slice(visibleCount),
    };
  }, [itemsToRender, availableHeight]);

  return (
    <div className="flex flex-col border-r border-border-2 bg-background w-[72px] h-full py-2 shrink-0 justify-between">
      <div
        ref={containerRef}
        className="flex flex-col gap-2 flex-1 overflow-hidden min-h-0 items-center"
      >
        {visibleItems.map((item) => {
          const Icon = iconMapper[item.icon];

          return (
            <AppRailItem
              key={item.id}
              icon={Icon}
              label={item.title}
              active={item.id === "home"}
            />
          );
        })}

        {overflowItems.length > 0 && (
          <Dropdown>
            <Dropdown.Trigger asChild>
              <AppRailItem icon={MoreHorizontal} label="More" active={false} />
            </Dropdown.Trigger>
            <Dropdown.Content side="right" align="start" className="w-56 ml-2">
              <div className="p-1">
                <div className="flex flex-row flex-wrap gap-1">
                  {overflowItems.map((item) => {
                    const Icon = iconMapper[item.icon];
                    return (
                      <AppRailItem
                        key={item.id}
                        icon={Icon}
                        label={item.title}
                      />
                    );
                  })}
                </div>
                <div className="py-1">
                  <Button
                    variant="outlined"
                    color="tertiary"
                    className="w-full"
                    size="sm"
                    onClick={() => setNavConfigDialogOpen(true)}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </Dropdown.Content>
          </Dropdown>
        )}
      </div>

      <div className="">
        <AppRailItem label="Invite" icon={Plus} active={false} />
        <AppRailItem icon={Settings} label="Settings" active={false} />
      </div>
    </div>
  );
};
