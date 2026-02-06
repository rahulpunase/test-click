import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { popoverVariants } from "./Popover.variants";

import { Slot } from "@radix-ui/react-slot";

const PopoverRoot = BasePopover.Root;

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BasePopover.Trigger> & { asChild?: boolean }
>(({ asChild, children, ...props }, ref) => {
  if (asChild) {
    return (
      <BasePopover.Trigger
        ref={ref}
        {...props}
        render={(triggerProps) => <Slot {...triggerProps}>{children}</Slot>}
      />
    );
  }
  return (
    <BasePopover.Trigger ref={ref} {...props}>
      {children}
    </BasePopover.Trigger>
  );
}) as React.ForwardRefExoticComponent<
  React.ComponentProps<typeof BasePopover.Trigger> & {
    asChild?: boolean;
  } & React.RefAttributes<HTMLButtonElement>
>;
PopoverTrigger.displayName = "Popover.Trigger";

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BasePopover.Popup> & {
    align?: React.ComponentProps<typeof BasePopover.Positioner>["align"];
    side?: React.ComponentProps<typeof BasePopover.Positioner>["side"];
    sideOffset?: React.ComponentProps<
      typeof BasePopover.Positioner
    >["sideOffset"];
  }
>(
  (
    { className, align = "center", side = "bottom", sideOffset = 4, ...props },
    ref,
  ) => {
    const { content } = popoverVariants();
    return (
      <BasePopover.Portal>
        <BasePopover.Positioner
          align={align}
          side={side}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            ref={ref}
            className={cn(content(), className)}
            {...props}
          />
        </BasePopover.Positioner>
      </BasePopover.Portal>
    );
  },
);
PopoverContent.displayName = "Popover.Content";

const PopoverTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof BasePopover.Title>
>(({ className, ...props }, ref) => (
  <BasePopover.Title
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
PopoverTitle.displayName = "Popover.Title";

const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof BasePopover.Description>
>(({ className, ...props }, ref) => (
  <BasePopover.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
PopoverDescription.displayName = "Popover.Description";

const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BasePopover.Close>
>(({ className, children, ...props }, ref) => (
  <BasePopover.Close
    ref={ref}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className,
    )}
    {...props}
  >
    {children || <X className="h-4 w-4" />}
    <span className="sr-only">Close</span>
  </BasePopover.Close>
));
PopoverClose.displayName = "Popover.Close";

const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BasePopover.Arrow>
>(({ className, ...props }, ref) => {
  const { arrow } = popoverVariants();
  return (
    <BasePopover.Arrow
      ref={ref}
      className={cn(arrow(), className)}
      {...props}
    />
  );
});
PopoverArrow.displayName = "Popover.Arrow";

const Popover: React.FC<React.ComponentProps<typeof PopoverRoot>> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
  Title: typeof PopoverTitle;
  Description: typeof PopoverDescription;
  Close: typeof PopoverClose;
  Arrow: typeof PopoverArrow;
} = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
  Arrow: PopoverArrow,
});

export { Popover };
