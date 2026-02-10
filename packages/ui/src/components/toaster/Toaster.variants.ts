import { tv } from "tailwind-variants";

export const toasterVariants = tv({
  slots: {
    viewport: [
      "fixed z-150 flex flex-col gap-2 p-4",
      "max-h-screen overflow-hidden",
      "outline-none",
    ],
    toast: [
      "relative flex items-start gap-3 w-[360px] p-4",
      "bg-background border border-border-2 rounded-lg shadow-lg",
      "transition-all duration-300 ease-out",
      "data-[starting-style]:opacity-0 data-[starting-style]:translate-x-full",
      "data-[ending-style]:opacity-0 data-[ending-style]:translate-x-full",
      "data-[swipe-direction=right]:data-[ending-style]:translate-x-[calc(var(--toast-swipe-movement-x)+150%)]",
    ],
    content: [
      "flex flex-col gap-1 flex-1 overflow-hidden",
      "transition-opacity duration-200",
      "data-[behind]:opacity-0 data-[expanded]:opacity-100",
    ],
    icon: "flex-shrink-0 w-5 h-5 mt-0.5",
    title: "text-sm font-semibold text-text-primary",
    description: "text-sm text-text-muted",
    close: [
      "absolute top-2 right-2 p-1 rounded-md",
      "text-text-muted hover:text-text-primary",
      "hover:bg-background-muted transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    ],
    action: [
      "mt-2 text-sm font-medium underline-offset-2 hover:underline",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    ],
  },
  variants: {
    type: {
      default: {
        icon: "text-text-secondary",
      },
      success: {
        toast: "border-l-4 border-l-success",
        icon: "text-success",
      },
      error: {
        toast: "border-l-4 border-l-error",
        icon: "text-error",
      },
      warning: {
        toast: "border-l-4 border-l-warning",
        icon: "text-warning",
      },
      info: {
        toast: "border-l-4 border-l-info",
        icon: "text-info",
      },
    },
    position: {
      "top-left": {
        viewport: "top-0 left-0",
      },
      "top-center": {
        viewport: "top-0 left-1/2 -translate-x-1/2",
      },
      "top-right": {
        viewport: "top-0 right-0",
      },
      "bottom-left": {
        viewport: "bottom-0 left-0",
      },
      "bottom-center": {
        viewport: "bottom-0 left-1/2 -translate-x-1/2",
      },
      "bottom-right": {
        viewport: "bottom-0 right-0",
      },
    },
  },
  defaultVariants: {
    type: "default",
    position: "bottom-right",
  },
});

export type ToasterVariants = Parameters<typeof toasterVariants>[0];
