import { Dropdown, List } from "@repo/ui";
import { Link } from "react-router";
import { LoaderCircle, MoreHorizontal } from "lucide-react";

import type {
  HomeSectionItems,
  UserSelectedHomeSectionItems,
} from "./Sidebar.types";
import { useMemo } from "react";
import { iconMapper } from "./constants/iconMapper";

type HomeSectionProps = {
  homeSectionItems: HomeSectionItems;
  userSelectedHomeSectionItems: UserSelectedHomeSectionItems;
};

const BY_DEFAULT_VISIBLE_ITEMS = 5;

export const HomeSection = ({
  homeSectionItems,
  userSelectedHomeSectionItems,
}: HomeSectionProps) => {
  const itemsToRender = useMemo(() => {
    // No items are pinned
    if (!userSelectedHomeSectionItems.length) {
      return homeSectionItems;
    }
    return userSelectedHomeSectionItems;
  }, [homeSectionItems, userSelectedHomeSectionItems]);

  const visibleItems = itemsToRender.slice(0, BY_DEFAULT_VISIBLE_ITEMS);
  const hiddenItems = itemsToRender.slice(BY_DEFAULT_VISIBLE_ITEMS);

  return (
    <List>
      <List.Group>
        <div className="py-2 px-2 font-bold">Home</div>
        {visibleItems.map((item) => {
          const Icon = iconMapper[item.icon];
          return (
            <List.Item
              key={item.id}
              as={Link}
              to={item.id}
              icon={Icon ? <Icon /> : <LoaderCircle />}
              label={item.title}
            />
          );
        })}
        {hiddenItems.length > 0 && (
          <Dropdown>
            <Dropdown.Trigger asChild>
              <List.Item icon={<MoreHorizontal />} label="More" />
            </Dropdown.Trigger>
            <Dropdown.Content align="start" className="w-56">
              {hiddenItems.map((item) => {
                const Icon = iconMapper[item.icon];
                return (
                  <Link to={item.id} key={item.id}>
                    <Dropdown.Item>
                      {Icon ? (
                        <Icon className="w-4 h-4" />
                      ) : (
                        <LoaderCircle className="w-4 h-4" />
                      )}
                      <span>{item.title}</span>
                    </Dropdown.Item>
                  </Link>
                );
              })}
            </Dropdown.Content>
          </Dropdown>
        )}
      </List.Group>
    </List>
  );
};
