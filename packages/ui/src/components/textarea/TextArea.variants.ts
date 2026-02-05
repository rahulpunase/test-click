import { tv, type VariantProps } from "tailwind-variants";

export const textareaVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5 w-full",
    label: "text-sm font-medium text-text-primary",
    input: [
      "w-full px-4 py-2 min-h-[80px] text-sm",
      "rounded-md transition-colors",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:ring-error-light",
    ],
    helper: "text-xs text-muted-foreground",
    error: "text-xs text-error font-medium",
  },
  variants: {
    variant: {
      bordered: {
        input: [
          "border border-border-2 bg-background",
          "focus-visible:ring-primary",
        ],
      },
      normal: {
        input: ["border-none bg-muted/50", "focus-visible:ring-primary"],
      },
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

export type TextAreaVariants = VariantProps<typeof textareaVariants>;
