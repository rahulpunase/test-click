import { Dialog } from "@base-ui/react/dialog";
import { alertDialogVariants } from "./AlertDialog.variants";
import { cn } from "../../lib/utils";

const { overlay, content, header, title, description, actions } =
  alertDialogVariants();

export interface AlertDialogProps {
  open: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onClose, children }: AlertDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Backdrop className={overlay()} />
        <Dialog.Popup className={content()}>{children}</Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function AlertDialogHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(header(), className)} {...props}>
      {children}
    </div>
  );
}

function AlertDialogTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title className={cn(title(), className)} {...props}>
      {children}
    </Dialog.Title>
  );
}

function AlertDialogDescription({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description className={cn(description(), className)} {...props}>
      {children}
    </Dialog.Description>
  );
}
function AlertDialogContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
}

function AlertDialogActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(actions(), className)} {...props}>
      {children}
    </div>
  );
}

// Named exports for subcomponents are already present above.
// Also component dot notation:
AlertDialog.Header = AlertDialogHeader;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Actions = AlertDialogActions;
