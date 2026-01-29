import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
import { dropdownVariants, type DropdownVariants } from "./Dropdown.variants";

const { trigger, popup, item, itemIndicator } = dropdownVariants();

// Dropdown Root Component
export interface DropdownProps extends React.ComponentProps<typeof Menu.Root> {
  className?: string;
}

const DropdownRoot = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, ...props }, ref) => {
    return <Menu.Root {...props} />;
  },
);

DropdownRoot.displayName = "Dropdown";

// Dropdown Trigger Component
export interface DropdownTriggerProps
  extends React.ComponentProps<typeof Menu.Trigger>, DropdownVariants {
  className?: string;
  /**
   * Custom render function for complete control over trigger rendering
   */
  render?: React.ComponentProps<typeof Menu.Trigger>["render"];
}

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, variant, size, render, children, ...props }, ref) => {
  // If render prop is provided, use it for complete custom control
  if (render) {
    return <Menu.Trigger ref={ref} render={render} {...props} />;
  }

  // Get variant classes
  const { trigger: triggerClass } = dropdownVariants({ variant, size });

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

// Dropdown Portal Component
export interface DropdownPortalProps extends React.ComponentProps<
  typeof Menu.Portal
> {}

const DropdownPortal = Menu.Portal;

DropdownPortal.displayName = "Dropdown.Portal";

// Dropdown Positioner Component
export interface DropdownPositionerProps extends React.ComponentProps<
  typeof Menu.Positioner
> {
  className?: string;
}

const DropdownPositioner = React.forwardRef<
  HTMLDivElement,
  DropdownPositionerProps
>(({ className, ...props }, ref) => {
  return <Menu.Positioner ref={ref} className={className} {...props} />;
});

DropdownPositioner.displayName = "Dropdown.Positioner";

// Dropdown Popup Component
export interface DropdownPopupProps
  extends
    React.ComponentProps<typeof Menu.Popup>,
    Pick<DropdownVariants, "size"> {
  className?: string;
}

const DropdownPopup = React.forwardRef<HTMLDivElement, DropdownPopupProps>(
  ({ className, size, ...props }, ref) => {
    const { popup: popupClass } = dropdownVariants({ size });

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

// Dropdown Item Component
export interface DropdownItemProps
  extends
    React.ComponentProps<typeof Menu.Item>,
    Pick<DropdownVariants, "size"> {
  className?: string;
  /**
   * Whether to show a check indicator when selected
   */
  showIndicator?: boolean;
  /**
   * Whether this item is selected
   */
  selected?: boolean;
}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    {
      className,
      size,
      showIndicator = false,
      selected = false,
      children,
      ...props
    },
    ref,
  ) => {
    const { item: itemClass } = dropdownVariants({ size });

    return (
      <Menu.Item ref={ref} className={cn(itemClass(), className)} {...props}>
        {children}
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
  return (
    <span ref={ref} className={cn(itemIndicator(), className)} {...props}>
      {children}
    </span>
  );
});

DropdownItemIndicator.displayName = "Dropdown.ItemIndicator";

// Attach subcomponents
const DropdownWithSubcomponents = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Portal: DropdownPortal,
  Positioner: DropdownPositioner,
  Popup: DropdownPopup,
  Item: DropdownItem,
  ItemIndicator: DropdownItemIndicator,
});

export { DropdownWithSubcomponents as Dropdown };
