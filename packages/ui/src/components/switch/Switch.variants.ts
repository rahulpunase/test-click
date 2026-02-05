import { tv, type VariantProps } from "tailwind-variants";

export const switchVariants = tv({
  slots: {
    root: "group flex flex-col gap-1.5",
    wrapper: "flex items-start gap-3 cursor-pointer",
    control: [
      "inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "bg-border-2", // Default unchecked state
      "data-[checked]:bg-text-secondary hover:data-[checked]:bg-text-primary", // Checked state using text colors
    ],
    thumb: [
      "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
      "data-[checked]:translate-x-full", // This will need adjustment based on size
    ],
    label:
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none",
    description: "text-xs text-text-muted select-none",
  },
  variants: {
    size: {
      sm: {
        control: "h-5 w-9",
        thumb: "h-4 w-4 data-[checked]:translate-x-4",
        wrapper: "gap-2",
        label: "text-xs",
      },
      md: {
        control: "h-6 w-11",
        thumb: "h-5 w-5 data-[checked]:translate-x-5",
        wrapper: "gap-3",
        label: "text-sm",
      },
      lg: {
        control: "h-7 w-[3.25rem]",
        thumb: "h-6 w-6 data-[checked]:translate-x-6",
        wrapper: "gap-4",
        label: "text-base",
      },
    },
    disabled: {
      true: {
        wrapper: "cursor-not-allowed opacity-50",
      },
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export type SwitchVariants = VariantProps<typeof switchVariants>;
