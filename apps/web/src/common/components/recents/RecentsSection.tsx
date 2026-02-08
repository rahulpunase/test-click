import { List } from "@repo/ui";

const NoRecents = () => {
  return (
    <div className="flex flex-col gap-1 px-2">
      <span className="text-xs text-text-muted-2">
        No recent items -- Your recently viewed items will appear here
      </span>
    </div>
  );
};

export const RecentsSection = () => {
  // TODO: Add useGetRecents query when available
  const recents: unknown[] = [];
  const isPending = false;

  return (
    <List>
      <List.Group label="Recents">
        {isPending ? (
          <div className="flex flex-col gap-1 px-2">
            {/* Add skeleton loading state when query is implemented */}
          </div>
        ) : recents.length === 0 ? (
          <NoRecents />
        ) : (
          // TODO: Map recents to RecentItem components when implemented
          recents.map((_, index) => <div key={index}></div>)
        )}
      </List.Group>
    </List>
  );
};
