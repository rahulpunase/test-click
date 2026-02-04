import { forwardRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { listVariants } from "./List.variants";
import { cn, isChildByType } from "../../lib/utils";
import React from "react";

/* -------------------------------------------------------------------------------------------------
 * List (Container)
 * -----------------------------------------------------------------------------------------------*/

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ListComponent = forwardRef<HTMLDivElement, ListProps>(
  ({ className, children, ...props }, ref) => {
    const { base } = listVariants();
    return (
      <div ref={ref} className={cn(base(), className)} {...props}>
        {children}
      </div>
    );
  },
);
ListComponent.displayName = "List";

/* -------------------------------------------------------------------------------------------------
 * ListGroup
 * -----------------------------------------------------------------------------------------------*/

export interface ListGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
}

export const ListGroup = forwardRef<HTMLDivElement, ListGroupProps>(
  (
    {
      className,
      label,
      description,
      action,
      collapsible = false,
      defaultExpanded = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const {
      group,
      groupHeader,
      groupTitle,
      groupDescription,
      groupContent,
      chevron,
    } = listVariants({ expanded: isExpanded });

    const handleToggle = () => {
      if (collapsible) {
        setIsExpanded((prev) => !prev);
      }
    };

    return (
      <div ref={ref} className={cn(group(), className)} {...props}>
        {(label || description || action) && (
          <div
            className={cn(
              groupHeader(),
              collapsible && "cursor-pointer select-none",
            )}
            onClick={handleToggle}
          >
            <div className="flex items-center gap-2">
              {collapsible && <ChevronRight className={chevron()} />}
              <div className="flex flex-col">
                {label && <span className={groupTitle()}>{label}</span>}
                {description && (
                  <span className={groupDescription()}>{description}</span>
                )}
              </div>
            </div>
            {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
          </div>
        )}
        {(!collapsible || isExpanded) && (
          <div className={cn(groupContent())}>{children}</div>
        )}
      </div>
    );
  },
);
ListGroup.displayName = "ListGroup";

/* -------------------------------------------------------------------------------------------------
 * ListItemLeftContent
 * -----------------------------------------------------------------------------------------------*/

export interface ListItemLeftContentProps {
  children?: React.ReactNode;
}

export const ListItemLeftContent = ({ children }: ListItemLeftContentProps) => {
  return <>{children}</>;
};

ListItemLeftContent.displayName = "ListItemLeftContent";

/* -------------------------------------------------------------------------------------------------
 * ListItemExpandable
 * -----------------------------------------------------------------------------------------------*/

export interface ListItemExpandableProps {
  children?: React.ReactNode;
}

export const ListItemExpandable = ({ children }: ListItemExpandableProps) => {
  return <>{children}</>;
};
ListItemExpandable.displayName = "ListItemExpandable";

/* -------------------------------------------------------------------------------------------------
 * ListItem
 * -----------------------------------------------------------------------------------------------*/

export interface ListItemProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  as?: React.ElementType;
  icon?: React.ReactElement<{ className?: string }>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
  defaultExpanded?: boolean;
}

export const ListItem = forwardRef<HTMLElement, ListItemProps>(
  (
    {
      className,
      as,
      icon,
      label,
      description,
      action,
      selected = false,
      disabled = false,
      defaultExpanded = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    // Detect if we have an expandable child
    const childrenArray = React.Children.toArray(children);
    const expandableChild = childrenArray.find((child) =>
      isChildByType(child, ListItemExpandable),
    );
    const leftContentChild = childrenArray.find((child) =>
      isChildByType(child, ListItemLeftContent),
    );
    const otherChildren = childrenArray.filter(
      (child) => child !== expandableChild && child !== leftContentChild,
    );

    const isExpandable = !!expandableChild;
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isExpandable) {
        setIsExpanded((prev: boolean) => !prev);
      }
    };

    const clickable = !!onClick && !disabled;

    const {
      item,
      itemIcon,
      itemContent,
      itemTitle,
      itemDescription,
      itemAction,
      chevron,
    } = listVariants({
      clickable,
      selected,
      disabled,
      expanded: isExpanded,
    });

    // Icon Logic
    // If expandable:
    // - If no icon: Show Chevron
    // - If icon: Show Icon normally, Show Chevron on Hover (overlay)
    let iconElement = null;

    if (leftContentChild) {
      // If LeftContent is provided, it takes precedence and replaces the icon/expandable logic for this slot
      iconElement = (
        <div className="flex items-center justify-center mr-3 shrink-0">
          {leftContentChild}
        </div>
      );
    } else if (isExpandable) {
      if (icon) {
        // Icon with Hover Chevron
        iconElement = (
          <div
            className="relative flex items-center justify-center mr-3 h-4 w-4 cursor-pointer z-10"
            onClick={handleToggle}
            role="button"
            tabIndex={0}
          >
            {React.cloneElement(icon, {
              className: cn(
                "transition-opacity duration-200 group-hover/item:opacity-0 absolute w-full h-full",
                icon.props.className,
              ),
              ...icon.props,
            })}
            <ChevronRight
              className={cn(
                chevron(),
                "absolute opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 w-full h-full",
              )}
            />
          </div>
        );
      } else {
        // Just Chevron
        iconElement = (
          <div
            className="flex items-center justify-center mr-3 h-4 w-4 cursor-pointer z-10"
            onClick={handleToggle}
          >
            <ChevronRight className={cn(chevron(), "w-full h-full")} />
          </div>
        );
      }
    } else if (icon) {
      // Normal Icon
      iconElement = React.cloneElement(icon, {
        className: cn(itemIcon(), icon.props.className),
        ...icon.props,
      });
    }

    const Component = as || (clickable ? "button" : "div");

    const mainContent = (
      <Component
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={cn(item(), className)}
        {...(clickable && !as ? { type: "button" } : {})}
        {...props}
      >
        {iconElement}
        <div className={itemContent()}>
          {label && <span className={itemTitle()}>{label}</span>}
          {description && (
            <span className={itemDescription()}>{description}</span>
          )}
          {otherChildren}
        </div>
        {action && (
          <div
            className={itemAction()}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="button"
            tabIndex={0}
          >
            {action}
          </div>
        )}
      </Component>
    );

    if (isExpandable) {
      return (
        <div className="flex flex-col w-full">
          {mainContent}
          {isExpanded && (
            <div className="flex flex-col border-l border-border-2 ml-4 pl-1">
              {expandableChild}
            </div>
          )}
        </div>
      );
    }

    return mainContent;
  },
);

ListItem.displayName = "ListItem";
/* -------------------------------------------------------------------------------------------------
 * Component Exports
 * -----------------------------------------------------------------------------------------------*/

export const List = Object.assign(ListComponent, {
  Group: ListGroup,
  Item: Object.assign(ListItem, {
    Expandable: ListItemExpandable,
    LeftContent: ListItemLeftContent,
  }),
});
