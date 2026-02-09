import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  base: [
    "inline-flex items-center gap-1",
    "font-medium rounded-md",
    "text-[10px] px-1.5 py-0.5",
  ],
  variants: {
    variant: {
      default: [
        "bg-background-muted text-text-muted",
        "border border-border-2",
      ],
      success: ["bg-success/10 text-success", "border border-success/20"],
      destructive: ["bg-error/10 text-error", "border border-error/20"],
      warning: ["bg-warning/10 text-warning", "border border-warning/20"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
