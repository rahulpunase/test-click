import React, { forwardRef, useState } from "react";
import { listVariants } from "./List.variants";
import { cn, getChildByType, isChildByType } from "@repo/ui/utils";
import { Icon } from "@repo/ui";
import { ChevronRight, ChevronDown } from "lucide-react";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {}

const LEVEL_MARGIN = 18;
const AFTER_LEFT = 14;

export const ListRoot = forwardRef<HTMLDivElement, ListProps>(function List(
  { className, ...props },
  ref,
) {
  const { root } = listVariants();
  return (
    <div ref={ref} className={cn(root(), className)} {...props} role="list" />
  );
});

ListRoot.displayName = "List";

interface ListGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const ListGroupRoot = forwardRef<HTMLDivElement, ListGroupProps>(function List(
  { className, label, children },
  ref,
) {
  const { group, groupLabel, groupContent } = listVariants();
  const action = getChildByType(children, ListGroupAction);
  const remainingChildren = React.Children.toArray(children).filter((child) => {
    return !isChildByType(child, ListGroupAction);
  });
  return (
    <div ref={ref} className={cn(group(), className)} role="group">
      <div className={groupContent()}>
        <span className={groupLabel()}>{label}</span>
        {action}
      </div>
      {remainingChildren}
    </div>
  );
});

ListGroupRoot.displayName = "List.Group";

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  level?: number;
  defaultExpanded?: boolean;
}

/**
 * Action wrapper for list item
 */
const ListItemAction = forwardRef<HTMLDivElement, ListProps>(function List(
  { className, ...props },
  ref,
) {
  const { itemAction } = listVariants();
  return <div ref={ref} className={cn(itemAction(), className)} {...props} />;
});

ListItemAction.displayName = "List.Item.Action";

/**
 * Action wrapper for list item
 */
const ListGroupAction = forwardRef<HTMLDivElement, ListProps>(function List(
  { className, ...props },
  ref,
) {
  const { itemAction } = listVariants();
  return <div ref={ref} className={cn(itemAction(), className)} {...props} />;
});

ListGroupAction.displayName = "List.Group.Action";

/**
 * Root wrapper for list item
 */
const ListItemRoot = forwardRef<HTMLDivElement, ListItemProps>(function List(
  { label, className, children, level = 0, defaultExpanded = false, ...props },
  ref,
) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const expandable = getChildByType(children, ListItemExpandableRoot) as
    | React.ReactElement<ListItemProps>
    | undefined;
  const expandableChildren = React.Children.toArray(
    expandable?.props.children || [],
  ).map((child) =>
    React.cloneElement(child as React.ReactElement<ListItemProps>, {
      level: level + 1,
    }),
  );

  const isExpandable = Boolean(expandable);
  const {
    item,
    label: labelVariant,
    withLevel,
    isExpandableIcon,
    itemIcon,
  } = listVariants({ isExpanded, isExpandable });
  const icon = getChildByType(children, Icon) as
    | React.ReactElement<{ className?: string }>
    | undefined;
  const action = getChildByType(children, ListItemAction);

  const handleToggle = () => {
    if (isExpandable) {
      setIsExpanded((prev) => !prev);
    }
  };

  const iconElement = () => {
    if (icon) {
      return (
        <div className="flex flex-row items-center justify-center">
          {React.cloneElement(
            icon as React.ReactElement<{ className?: string }>,
            {
              className: cn(itemIcon(), icon.props.className),
            },
          )}
          {isExpandable ? (
            <Icon
              onClick={handleToggle}
              icon={isExpanded ? ChevronDown : ChevronRight}
              size="sm"
              className={isExpandableIcon()}
            />
          ) : null}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div
        className={cn(withLevel(), className)}
        data-level={level}
        style={{
          paddingLeft: level ? `${level * LEVEL_MARGIN}px` : undefined,
        }}
        data-expanded={isExpanded}
        data-isExpandable={isExpandable}
      >
        {Array.from({ length: level }, (_, index) => index).map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: `${(index + 1) * AFTER_LEFT + 3 * index}px`,
              width: "1px",
              height: "100%",
              backgroundColor: "var(--color-border-2)",
            }}
          />
        ))}
        <div
          ref={ref}
          className={cn(item(), className)}
          {...props}
          role="listitem"
        >
          {iconElement ? (
            <div className="flex flex-row mr-1">{iconElement()}</div>
          ) : null}
          <span className={labelVariant()}>{label}</span>
          {action}
        </div>
      </div>
      {isExpanded ? expandableChildren : null}
    </>
  );
});

ListItemRoot.displayName = "List.Item";

/**
 * Expandable wrapper for list item
 */
const ListItemExpandableRoot = ListItemRoot;
ListItemExpandableRoot.displayName = "List.Item.Expandable";

const Item = Object.assign(ListItemRoot, {
  Icon: Icon,
  Action: ListItemAction,
  Expandable: ListItemExpandableRoot,
}) as typeof ListItemRoot & {
  Icon: typeof Icon;
  Action: typeof ListItemAction;
  Expandable: typeof ListItemExpandableRoot;
};

const ListGroup = Object.assign(ListGroupRoot, {
  Action: ListGroupAction,
}) as typeof ListGroupRoot & {
  Action: typeof ListGroupAction;
};

const List = Object.assign(ListRoot, {
  Item,
  Group: ListGroup,
}) as typeof ListRoot & {
  Item: typeof Item;
  Group: typeof ListGroup;
};

export { List };
