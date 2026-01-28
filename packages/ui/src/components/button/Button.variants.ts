import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "rounded-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      solid: "",
      outlined: "border-2 bg-transparent",
    },
    color: {
      primary: "",
      secondary: "",
      tertiary: "",
      success: "",
      error: "",
    },
    size: {
      sm: "text-sm px-3 py-1.5 h-8",
      md: "text-base px-4 py-2 h-10",
      lg: "text-lg px-6 py-3 h-12",
    },
  },
  compoundVariants: [
    // Primary Solid
    {
      variant: "solid",
      color: "primary",
      class: [
        "bg-primary-500 text-white",
        "hover:bg-primary-600",
        "active:bg-primary-700",
        "focus-visible:ring-primary-500",
      ],
    },
    // Primary Outlined
    {
      variant: "outlined",
      color: "primary",
      class: [
        "border-primary-500 text-primary-600",
        "hover:bg-primary-50",
        "active:bg-primary-100",
        "focus-visible:ring-primary-500",
        "dark:text-primary-400 dark:border-primary-400",
        "dark:hover:bg-primary-950",
      ],
    },
    // Secondary Solid
    {
      variant: "solid",
      color: "secondary",
      class: [
        "bg-secondary-500 text-white",
        "hover:bg-secondary-600",
        "active:bg-secondary-700",
        "focus-visible:ring-secondary-500",
      ],
    },
    // Secondary Outlined
    {
      variant: "outlined",
      color: "secondary",
      class: [
        "border-secondary-500 text-secondary-600",
        "hover:bg-secondary-50",
        "active:bg-secondary-100",
        "focus-visible:ring-secondary-500",
        "dark:text-secondary-400 dark:border-secondary-400",
        "dark:hover:bg-secondary-950",
      ],
    },
    // Tertiary Solid (using neutral colors)
    {
      variant: "solid",
      color: "tertiary",
      class: [
        "bg-neutral-600 text-white",
        "hover:bg-neutral-700",
        "active:bg-neutral-800",
        "focus-visible:ring-neutral-500",
      ],
    },
    // Tertiary Outlined
    {
      variant: "outlined",
      color: "tertiary",
      class: [
        "border-neutral-400 text-neutral-700",
        "hover:bg-neutral-50",
        "active:bg-neutral-100",
        "focus-visible:ring-neutral-500",
        "dark:text-neutral-300 dark:border-neutral-500",
        "dark:hover:bg-neutral-900",
      ],
    },
    // Success Solid
    {
      variant: "solid",
      color: "success",
      class: [
        "bg-success-500 text-white",
        "hover:bg-success-600",
        "active:bg-success-700",
        "focus-visible:ring-success-500",
      ],
    },
    // Success Outlined
    {
      variant: "outlined",
      color: "success",
      class: [
        "border-success-500 text-success-600",
        "hover:bg-success-50",
        "active:bg-success-100",
        "focus-visible:ring-success-500",
        "dark:text-success-400 dark:border-success-400",
        "dark:hover:bg-success-950",
      ],
    },
    // Error Solid
    {
      variant: "solid",
      color: "error",
      class: [
        "bg-error-500 text-white",
        "hover:bg-error-600",
        "active:bg-error-700",
        "focus-visible:ring-error-500",
      ],
    },
    // Error Outlined
    {
      variant: "outlined",
      color: "error",
      class: [
        "border-error-500 text-error-600",
        "hover:bg-error-50",
        "active:bg-error-100",
        "focus-visible:ring-error-500",
        "dark:text-error-400 dark:border-error-400",
        "dark:hover:bg-error-950",
      ],
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
