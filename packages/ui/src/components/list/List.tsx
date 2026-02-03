import { forwardRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { listVariants } from "./List.variants";
import { cn } from "../../lib/utils";
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
  [key: string]: any;
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
      onClick,
      ...props
    },
    ref,
  ) => {
    const clickable = !!onClick && !disabled;
    const {
      item,
      itemIcon,
      itemContent,
      itemTitle,
      itemDescription,
      itemAction,
    } = listVariants({ clickable, selected, disabled });

    const iconElement = icon
      ? React.cloneElement(icon, {
          className: cn(itemIcon(), icon.props.className),
          ...icon.props,
        })
      : null;

    const Component = as || (onClick ? "button" : "div");

    return (
      <Component
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={cn(item(), className)}
        {...(onClick && !as ? { type: "button" } : {})}
        {...props}
      >
        {iconElement}
        <div className={itemContent()}>
          {label && <span className={itemTitle()}>{label}</span>}
          {description && (
            <span className={itemDescription()}>{description}</span>
          )}
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
  },
);

ListItem.displayName = "ListItem";
/* -------------------------------------------------------------------------------------------------
 * Component Exports
 * -----------------------------------------------------------------------------------------------*/

export const List = Object.assign(ListComponent, {
  Group: ListGroup,
  Item: ListItem,
});
