import { tv, type VariantProps } from "tailwind-variants";

export const checkboxVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    wrapper: "flex items-start gap-2 cursor-pointer",
    control: [
      "peer h-4 w-4 shrink-0 rounded-sm border border-text-primary ring-offset-background cursor-pointer",
      "bg-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-checked:bg-text-secondary aria-checked:text-primary-foreground aria-checked:hover:bg-text-primary",
    ],
    indicator: "flex items-center justify-center text-current ",
    check: "text-white h-3.5 w-3.5",
    label:
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    description: "text-xs text-text-muted",
    error: "text-xs text-error font-medium",
  },
  variants: {
    error: {
      true: {
        control: "border-error focus-visible:ring-error",
        label: "text-error",
      },
    },
    disabled: {
      true: {
        control: "cursor-not-allowed opacity-30 cursor-not-allowed",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
