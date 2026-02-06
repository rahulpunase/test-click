import { tv, type VariantProps } from "tailwind-variants";

export const iconVariants = tv({
  base: "inline-flex items-center justify-center shrink-0 select-none font-medium",
  variants: {
    size: {
      xs: "h-4 w-4 text-[10px] rounded-sm",
      sm: "h-5 w-5 text-xs rounded-md",
      md: "h-6 w-6 text-sm rounded-lg",
      lg: "h-8 w-8 text-base rounded-lg",
      xl: "h-10 w-10 text-lg rounded-xl",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-none",
    },
  },
  defaultVariants: {},
});

export type IconVariants = VariantProps<typeof iconVariants>;
