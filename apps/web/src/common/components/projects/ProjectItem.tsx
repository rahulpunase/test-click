import { List } from "@repo/ui";
import { ListCheck } from "lucide-react";
import type { SpaceContentItem } from "@repo/backend/spaces/queries";

export interface ProjectItemProps {
  item: SpaceContentItem;
  level: number;
}

/**
 * Renders a project item (projects cannot have children)
 */
export const ProjectItem = ({ item, level }: ProjectItemProps) => {
  return (
    <List.Item label={item.name} level={level}>
      <List.Item.Icon icon={ListCheck} size="sm" />
    </List.Item>
  );
};
