import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Slot } from "@radix-ui/react-slot";
import { cn, isChildByType } from "../../lib/utils";
import { dropdownVariants, type DropdownVariants } from "./Dropdown.variants";

// Dropdown Root Component
// Dropdown Root Component
export interface DropdownProps extends React.ComponentProps<typeof Menu.Root> {
  className?: string;
}

const DropdownRoot = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ ...props }) => {
    return <Menu.Root {...props} />;
  },
);

DropdownRoot.displayName = "Dropdown";

// Dropdown Trigger Component
export interface DropdownTriggerProps
  extends React.ComponentProps<typeof Menu.Trigger>, DropdownVariants {
  className?: string;
  asChild?: boolean;
}

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, variant, asChild = false, children, ...props }, ref) => {
  const { trigger: triggerClass } = dropdownVariants({ variant });

  if (asChild) {
    return (
      <Menu.Trigger
        ref={ref}
        {...props}
        render={(triggerProps) => <Slot {...triggerProps}>{children}</Slot>}
      />
    );
  }

  return (
    <Menu.Trigger
      ref={ref}
      className={cn(triggerClass(), className)}
      {...props}
    >
      {children}
    </Menu.Trigger>
  );
});

DropdownTrigger.displayName = "Dropdown.Trigger";

// INTERNAL Dropdown Popup Component (Not directly exported)
interface DropdownPopupProps extends React.ComponentProps<typeof Menu.Popup> {
  className?: string;
}

const DropdownPopup = React.forwardRef<HTMLDivElement, DropdownPopupProps>(
  ({ className, ...props }, ref) => {
    const { popup: popupClass } = dropdownVariants();

    return (
      <Menu.Popup
        ref={ref}
        className={cn(popupClass(), className)}
        {...props}
      />
    );
  },
);

DropdownPopup.displayName = "Dropdown.Popup";

// Dropdown Content Component (wraps Portal and Positioner)
export interface DropdownContentProps extends React.ComponentProps<
  typeof Menu.Positioner
> {
  className?: string; // Applied to the Popup
}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Menu.Portal>
        <Menu.Positioner ref={ref} {...props}>
          <DropdownPopup className={className}>{children}</DropdownPopup>
        </Menu.Positioner>
      </Menu.Portal>
    );
  },
);

DropdownContent.displayName = "Dropdown.Content";

// Dropdown Item Component
export interface DropdownItemProps extends Omit<
  React.ComponentProps<typeof Menu.Item>,
  "label"
> {
  className?: string;
  /**
   * Visual variant of the item
   */
  variant?: "normal" | "destructive";
  label?: React.ReactNode;
  icon?: React.ReactElement<{ className?: string }>;
}

export const DropdownRightAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("ml-auto", className)} {...props}>
      {children}
    </div>
  );
});

DropdownRightAction.displayName = "Dropdown.RightAction";

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, variant = "normal", label, icon, children, ...props }, ref) => {
    const { item: itemClass, itemIcon: itemIconClass } = dropdownVariants({
      itemVariant: variant,
    });

    const childrenArray = React.Children.toArray(children);

    const rightAction = childrenArray.find((child) =>
      isChildByType(child, DropdownRightAction),
    );

    const otherChildren = childrenArray.filter(
      (child) => child !== rightAction,
    );

    // Clone icon to inject class for sizing
    const iconElement = icon
      ? React.cloneElement(icon, {
          className: cn(itemIconClass(), icon.props.className),
        })
      : null;

    return (
      <Menu.Item ref={ref} className={cn(itemClass(), className)} {...props}>
        {iconElement}
        {label && <span className="flex-1 truncate">{label}</span>}
        {otherChildren}
        {rightAction}
      </Menu.Item>
    );
  },
);

DropdownItem.displayName = "Dropdown.Item";

// Dropdown Item Indicator Component (for check marks, etc.)
export interface DropdownItemIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const DropdownItemIndicator = React.forwardRef<
  HTMLSpanElement,
  DropdownItemIndicatorProps
>(({ className, children, ...props }, ref) => {
  const { itemIndicator: itemIndicatorClass } = dropdownVariants();

  return (
    <span ref={ref} className={cn(itemIndicatorClass(), className)} {...props}>
      {children}
    </span>
  );
});

DropdownItemIndicator.displayName = "Dropdown.ItemIndicator";

const RootDropdownItem = Object.assign(DropdownItem, {
  RightAction: DropdownRightAction,
});

// Attach subcomponents
const DropdownWithSubcomponents = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: RootDropdownItem,
  // Popup is NO LONGER attached
});

export { DropdownWithSubcomponents as Dropdown };
