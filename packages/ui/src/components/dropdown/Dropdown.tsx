import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import { cn, isChildByType } from "../../lib/utils";
import { dropdownVariants, type DropdownVariants } from "./Dropdown.variants";

// Dropdown Root Component
// Dropdown Root Component
export interface DropdownProps extends React.ComponentProps<typeof Menu.Root> {
  className?: string;
}

const DropdownRoot = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ ...props }, ref) => {
    return <Menu.Root ref={ref} {...props} />;
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

// Dropdown Submenu Component
export interface DropdownSubmenuProps extends React.ComponentProps<
  typeof Menu.SubmenuRoot
> {}

const DropdownSubmenu: React.FC<DropdownSubmenuProps> = (props) => {
  return <Menu.SubmenuRoot {...props} />;
};
DropdownSubmenu.displayName = "Dropdown.Submenu";

// Dropdown Submenu Trigger Component
export interface DropdownSubmenuTriggerProps extends React.ComponentProps<
  typeof Menu.SubmenuTrigger
> {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

const DropdownSubmenuTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownSubmenuTriggerProps
>(({ className, children, asChild = false, ...props }, ref) => {
  const { item: itemClass } = dropdownVariants({ itemVariant: "normal" });

  if (asChild) {
    return (
      <Menu.SubmenuTrigger
        ref={ref}
        {...props}
        render={(triggerProps) => <Slot {...triggerProps}>{children}</Slot>}
      />
    );
  }

  return (
    <Menu.SubmenuTrigger
      ref={ref}
      className={cn(itemClass(), "justify-between", className)}
      {...props}
    >
      <div className="flex-1 truncate text-left">{children}</div>
      <ChevronRight className="h-4 w-4 text-text-muted transition-colors ml-auto" />
    </Menu.SubmenuTrigger>
  );
});
DropdownSubmenuTrigger.displayName = "Dropdown.SubmenuTrigger";

// Dropdown Submenu Content Component
export interface DropdownSubmenuContentProps extends React.ComponentProps<
  typeof Menu.Positioner
> {
  className?: string; // For the popup
}

const DropdownSubmenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownSubmenuContentProps
>(
  (
    {
      children,
      className,
      side = "right",
      align = "start",
      sideOffset = -4,
      ...props
    },
    ref,
  ) => {
    const { popup: popupClass } = dropdownVariants();
    return (
      <Menu.Portal>
        <Menu.Positioner
          ref={ref}
          side={side}
          align={align}
          sideOffset={sideOffset}
          {...props}
        >
          <Menu.Popup className={cn(popupClass(), className)}>
            {children}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    );
  },
);
DropdownSubmenuContent.displayName = "Dropdown.SubmenuContent";

const RootDropdownItem = Object.assign(DropdownItem, {
  RightAction: DropdownRightAction,
});

// Attach subcomponents
const DropdownWithSubcomponents = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: RootDropdownItem,
  // Popup is NO LONGER attached
  Submenu: DropdownSubmenu,
  SubmenuTrigger: DropdownSubmenuTrigger,
  SubmenuContent: DropdownSubmenuContent,
});

export { DropdownWithSubcomponents as Dropdown };
