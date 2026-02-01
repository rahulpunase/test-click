import { tv, type VariantProps } from "tailwind-variants";

export const avatarVariants = tv({
  base: "relative flex shrink-0 overflow-hidden rounded-full bg-background-muted",
  variants: {
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const avatarImageVariants = tv({
  base: "aspect-square h-full w-full object-cover",
});

export const avatarFallbackVariants = tv({
  base: "flex h-full w-full items-center justify-center bg-background-colored-main text-text-inverted font-medium",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
