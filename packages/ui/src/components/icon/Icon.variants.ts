import { tv, type VariantProps } from "tailwind-variants";

export const iconVariants = tv({
  slots: {
    base: "inline-flex items-center justify-center shrink-0 select-none",
    icon: "",
    letter: "",
  },
  variants: {
    size: {
      xs: {
        base: "h-4 w-4 rounded-sm",
        icon: "h-4 w-4",
        letter: "text-xs",
      },
      sm: {
        base: "h-5 w-5 rounded-md",
        icon: "h-4 w-4",
        letter: "text-xs",
      },
      md: {
        base: "h-6 w-6 rounded-md",
        icon: "h-5 w-5",
        letter: "text-sm",
      },
      lg: {
        base: "h-7 w-7 rounded-md",
        icon: "h-6 w-6",
        letter: "text-sm",
      },
      xl: {
        base: "h-8 w-8 rounded-md",
        icon: "h-7 w-7",
        letter: "text-base",
      },
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-none",
    },
  },
  defaultVariants: {},
});

export type IconVariants = VariantProps<typeof iconVariants>;
