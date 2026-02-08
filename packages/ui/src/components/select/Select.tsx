import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Slot } from "@radix-ui/react-slot";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { selectVariants, type SelectVariants } from "./Select.variants";

// Select Root Component
export interface SelectProps<T = string> extends Omit<
  React.ComponentProps<typeof BaseSelect.Root<T>>,
  "children"
> {
  children?: React.ReactNode;
}

function SelectRoot<T = string>({ children, ...props }: SelectProps<T>) {
  return <BaseSelect.Root<T> {...props}>{children}</BaseSelect.Root>;
}

SelectRoot.displayName = "Select";

// Select Trigger Component
export interface SelectTriggerProps
  extends
    Omit<React.ComponentProps<typeof BaseSelect.Trigger>, "className">,
    SelectVariants {
  className?: string;
  asChild?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, variant, asChild = false, children, ...props }, ref) => {
    const { trigger: triggerClass } = selectVariants({ variant });

    if (asChild) {
      return (
        <BaseSelect.Trigger
          ref={ref}
          {...props}
          render={(triggerProps) => <Slot {...triggerProps}>{children}</Slot>}
        />
      );
    }

    return (
      <BaseSelect.Trigger
        ref={ref}
        className={cn(triggerClass(), className)}
        {...props}
      >
        {children}
      </BaseSelect.Trigger>
    );
  },
);

SelectTrigger.displayName = "Select.Trigger";

// Select Value Component
export interface SelectValueProps extends React.ComponentProps<
  typeof BaseSelect.Value
> {
  className?: string;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, ...props }, ref) => {
    const { value: valueClass } = selectVariants();

    return (
      <BaseSelect.Value
        ref={ref}
        className={cn(valueClass(), className)}
        {...props}
      />
    );
  },
);

SelectValue.displayName = "Select.Value";

// Select Icon Component
export interface SelectIconProps extends React.ComponentProps<
  typeof BaseSelect.Icon
> {
  className?: string;
}

const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, children, ...props }, ref) => {
    const { icon: iconClass } = selectVariants();

    return (
      <BaseSelect.Icon
        ref={ref}
        className={cn(iconClass(), className)}
        {...props}
      >
        {children ?? <ChevronDown />}
      </BaseSelect.Icon>
    );
  },
);

SelectIcon.displayName = "Select.Icon";

// INTERNAL Select Popup Component
interface SelectPopupProps extends React.ComponentProps<
  typeof BaseSelect.Popup
> {
  className?: string;
}

const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => {
    const { popup: popupClass } = selectVariants();

    return (
      <BaseSelect.Popup
        ref={ref}
        className={cn(popupClass(), className)}
        {...props}
      />
    );
  },
);

SelectPopup.displayName = "Select.Popup";

// Select Content Component (wraps Portal, Positioner, and Popup)
export interface SelectContentProps extends React.ComponentProps<
  typeof BaseSelect.Positioner
> {
  className?: string; // Applied to the Popup
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      children,
      className,
      sideOffset = 8,
      alignItemWithTrigger = false,
      ...props
    },
    ref,
  ) => {
    return (
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          ref={ref}
          sideOffset={sideOffset}
          alignItemWithTrigger={alignItemWithTrigger}
          {...props}
        >
          <SelectPopup className={className}>
            <BaseSelect.ScrollUpArrow className="flex items-center justify-center h-6 w-full text-text-muted" />
            {children}
            <BaseSelect.ScrollDownArrow className="flex items-center justify-center h-6 w-full text-text-muted" />
          </SelectPopup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    );
  },
);

SelectContent.displayName = "Select.Content";

// Select Item Component
export interface SelectItemProps extends Omit<
  React.ComponentProps<typeof BaseSelect.Item>,
  "label"
> {
  className?: string;
  /**
   * Text label for the item
   */
  label?: React.ReactNode;
  /**
   * Optional left icon
   */
  icon?: React.ReactElement<{ className?: string }>;
  /**
   * Optional description text below the label
   */
  description?: React.ReactNode;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, label, icon, description, children, value, ...props }, ref) => {
    const {
      item: itemClass,
      itemIcon: itemIconClass,
      itemContent: itemContentClass,
      itemLabel: itemLabelClass,
      itemDescription: itemDescriptionClass,
      itemIndicator: itemIndicatorClass,
    } = selectVariants();

    // Clone icon to inject class for sizing
    const iconElement = icon
      ? React.cloneElement(icon, {
          className: cn(itemIconClass(), icon.props.className),
        })
      : null;

    return (
      <BaseSelect.Item
        ref={ref}
        className={cn(itemClass(), className)}
        value={value}
        {...props}
      >
        {iconElement}
        <div className={itemContentClass()}>
          {label && (
            <BaseSelect.ItemText className={itemLabelClass()}>
              {label}
            </BaseSelect.ItemText>
          )}
          {description && (
            <span className={itemDescriptionClass()}>{description}</span>
          )}
        </div>
        {children}
        <BaseSelect.ItemIndicator className={itemIndicatorClass()}>
          <Check className="h-4 w-4" />
        </BaseSelect.ItemIndicator>
      </BaseSelect.Item>
    );
  },
);

SelectItem.displayName = "Select.Item";

// Select Group Component
export interface SelectGroupProps extends React.ComponentProps<
  typeof BaseSelect.Group
> {
  className?: string;
}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return <BaseSelect.Group ref={ref} className={cn(className)} {...props} />;
  },
);

SelectGroup.displayName = "Select.Group";

// Select Group Label Component
export interface SelectGroupLabelProps extends React.ComponentProps<
  typeof BaseSelect.GroupLabel
> {
  className?: string;
}

const SelectGroupLabel = React.forwardRef<
  HTMLDivElement,
  SelectGroupLabelProps
>(({ className, ...props }, ref) => {
  const { groupLabel: groupLabelClass } = selectVariants();

  return (
    <BaseSelect.GroupLabel
      ref={ref}
      className={cn(groupLabelClass(), className)}
      {...props}
    />
  );
});

SelectGroupLabel.displayName = "Select.GroupLabel";

// Select Separator Component
export interface SelectSeparatorProps extends React.ComponentProps<
  typeof BaseSelect.Separator
> {
  className?: string;
}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Separator
        ref={ref}
        className={cn("h-px mx-2 my-1 bg-border-2", className)}
        {...props}
      />
    );
  },
);

SelectSeparator.displayName = "Select.Separator";

// Attach subcomponents
const SelectWithSubcomponents = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
});

export { SelectWithSubcomponents as Select, SelectRoot };
