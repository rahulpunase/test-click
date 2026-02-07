import type { SpaceContentItem } from "@repo/backend/spaces/queries";
import { FolderItem } from "../folders/FolderItem";
import { ProjectItem } from "../projects/ProjectItem";

// Re-export for convenience
export type { SpaceContentItem };

/**
 * Props for individual content item rendering
 */
export interface ContentItemProps {
  item: SpaceContentItem;
  level: number;
}

/**
 * Component map for rendering different content types.
 * Add new content type components here for future extensibility.
 */
const CONTENT_TYPE_MAP: Record<
  SpaceContentItem["type"],
  React.FC<ContentItemProps>
> = {
  folder: FolderItem,
  project: ProjectItem,
};

/**
 * Renders a space content item based on its type.
 * Uses the CONTENT_TYPE_MAP for type-based component selection.
 */
export const SpaceContentRenderer = ({ item, level }: ContentItemProps) => {
  const Component = CONTENT_TYPE_MAP[item.type];

  if (!Component) {
    console.warn(`Unknown content type: ${item.type}`);
    return null;
  }

  return <Component item={item} level={level} />;
};

/**
 * Renders all space contents as a list of items
 */
interface SpaceContentsProps {
  contents: SpaceContentItem[];
  /** Starting level for the hierarchy (defaults to 1) */
  startLevel?: number;
}

export const SpaceContents = ({
  contents,
  startLevel = 1,
}: SpaceContentsProps) => {
  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <>
      {contents.map((item) => (
        <SpaceContentRenderer key={item._id} item={item} level={startLevel} />
      ))}
    </>
  );
};
