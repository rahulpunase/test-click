import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";
import { dialogVariants } from "./Dialog.variants";
import { VariantProps } from "tailwind-variants";

export type DialogProps = React.ComponentProps<typeof BaseDialog.Root>;

const Dialog = BaseDialog.Root;

import { Slot } from "@radix-ui/react-slot";

// ...

export interface DialogTriggerProps extends React.ComponentProps<
  typeof BaseDialog.Trigger
> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild) {
      return (
        <BaseDialog.Trigger
          ref={ref}
          {...props}
          render={(triggerProps) => <Slot {...triggerProps}>{children}</Slot>}
        />
      );
    }
    return (
      <BaseDialog.Trigger ref={ref} {...props}>
        {children}
      </BaseDialog.Trigger>
    );
  },
);
DialogTrigger.displayName = "Dialog.Trigger";

const DialogPortal = BaseDialog.Portal;

const DialogClose = BaseDialog.Close;

const {
  overlay,
  content: contentClasses,
  header: headerClasses,
  footer: footerClasses,
  title: titleClasses,
  description: descriptionClasses,
  close: closeClasses,
} = dialogVariants();

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(overlay(), className)}
    {...props}
  />
));
DialogOverlay.displayName = BaseDialog.Backdrop.displayName;

interface DialogContentProps
  extends
    React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>,
    VariantProps<typeof dialogVariants> {}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Popup>,
  DialogContentProps
>(({ className, children, orientation, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <BaseDialog.Popup
      ref={ref}
      className={cn(contentClasses({ orientation, size }), className)}
      {...props}
    >
      {children}
      <BaseDialog.Close className={closeClasses()}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </BaseDialog.Close>
    </BaseDialog.Popup>
  </DialogPortal>
));
DialogContent.displayName = BaseDialog.Popup.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(headerClasses(), className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(footerClasses(), className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Title>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn(titleClasses(), className)}
    {...props}
  />
));
DialogTitle.displayName = BaseDialog.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Description>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn(descriptionClasses(), className)}
    {...props}
  />
));
DialogDescription.displayName = BaseDialog.Description.displayName;

const DialogRoot = Dialog;

const DialogWithSubcomponents = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
});

export { DialogWithSubcomponents as Dialog };
