import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "rounded-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  variants: {
    variant: {
      solid: "",
      outlined: "border bg-transparent",
      ghost: "bg-transparent",
      text: "bg-transparent hover:underline underline-offset-4",
    },
    color: {
      primary: "",
      secondary: "",
      tertiary: "",
      success: "",
      error: "",
    },
    size: {
      sm: "text-xs px-2 py-1 h-6",
      md: "text-sm px-3 py-1.5 h-7",
      lg: "text-base px-4 py-2 h-8",
    },
    iconOnly: {
      true: "",
    },
  },
  compoundVariants: [
    {
      size: "sm",
      iconOnly: true,
      class: "px-1", // Match py-1
    },
    {
      size: "md",
      iconOnly: true,
      class: "px-1.5", // Match py-1.5
    },
    {
      size: "lg",
      iconOnly: true,
      class: "px-2", // Match py-2
    },
    // Primary Solid
    {
      variant: "solid",
      color: "primary",
      class: [
        "bg-primary text-white",
        "hover:bg-primary-hover",
        "active:bg-primary-active",
        "focus-visible:ring-primary",
      ],
    },
    // Primary Outlined
    {
      variant: "outlined",
      color: "primary",
      class: [
        "border-primary text-primary",
        "hover:bg-primary/10",
        "active:bg-primary/20",
        "focus-visible:ring-primary",
      ],
    },
    // Primary Ghost
    {
      variant: "ghost",
      color: "primary",
      class: [
        "text-primary",
        "hover:bg-primary/10",
        "active:bg-primary/20",
        "focus-visible:ring-primary",
      ],
    },
    // Primary Text
    {
      variant: "text",
      color: "primary",
      class: [
        "text-primary",
        "hover:text-primary-hover",
        "focus-visible:ring-primary",
      ],
    },
    // Secondary Solid
    {
      variant: "solid",
      color: "secondary",
      class: [
        "bg-secondary text-white",
        "hover:bg-secondary-hover",
        "active:bg-secondary-active",
        "focus-visible:ring-secondary",
      ],
    },
    // Secondary Outlined
    {
      variant: "outlined",
      color: "secondary",
      class: [
        "border-secondary text-secondary",
        "hover:bg-secondary/10",
        "active:bg-secondary/20",
        "focus-visible:ring-secondary",
      ],
    },
    // Secondary Ghost
    {
      variant: "ghost",
      color: "secondary",
      class: [
        "text-secondary",
        "hover:bg-secondary/10",
        "active:bg-secondary/20",
        "focus-visible:ring-secondary",
      ],
    },
    // Secondary Text
    {
      variant: "text",
      color: "secondary",
      class: [
        "text-secondary",
        "hover:text-secondary-hover",
        "focus-visible:ring-secondary",
      ],
    },
    // Tertiary Solid
    {
      variant: "solid",
      color: "tertiary",
      class: [
        "bg-tertiary text-white",
        "hover:bg-tertiary-hover",
        "active:bg-tertiary-active",
        "focus-visible:ring-tertiary",
      ],
    },
    // Tertiary Outlined
    {
      variant: "outlined",
      color: "tertiary",
      class: [
        "border-tertiary text-tertiary",
        "hover:bg-tertiary/10",
        "active:bg-tertiary/20",
        "focus-visible:ring-tertiary",
      ],
    },
    // Tertiary Ghost
    {
      variant: "ghost",
      color: "tertiary",
      class: [
        "text-tertiary",
        "hover:bg-tertiary/10",
        "active:bg-tertiary/20",
        "focus-visible:ring-tertiary",
      ],
    },
    // Tertiary Text
    {
      variant: "text",
      color: "tertiary",
      class: [
        "text-tertiary",
        "hover:text-tertiary-hover",
        "focus-visible:ring-tertiary",
      ],
    },
    // Success Solid
    {
      variant: "solid",
      color: "success",
      class: [
        "bg-success text-white",
        "hover:bg-success-hover",
        "active:bg-success-active",
        "focus-visible:ring-success",
      ],
    },
    // Success Outlined
    {
      variant: "outlined",
      color: "success",
      class: [
        "border-success text-success",
        "hover:bg-success/10",
        "active:bg-success/20",
        "focus-visible:ring-success",
      ],
    },
    // Success Ghost
    {
      variant: "ghost",
      color: "success",
      class: [
        "text-success",
        "hover:bg-success/10",
        "active:bg-success/20",
        "focus-visible:ring-success",
      ],
    },
    // Success Text
    {
      variant: "text",
      color: "success",
      class: [
        "text-success",
        "hover:text-success-hover",
        "focus-visible:ring-success",
      ],
    },
    // Error Solid
    {
      variant: "solid",
      color: "error",
      class: [
        "bg-error text-white",
        "hover:bg-error-hover",
        "active:bg-error-active",
        "focus-visible:ring-error",
      ],
    },
    // Error Outlined
    {
      variant: "outlined",
      color: "error",
      class: [
        "border-error text-error",
        "hover:bg-error/10",
        "active:bg-error/20",
        "focus-visible:ring-error",
      ],
    },
    // Error Ghost
    {
      variant: "ghost",
      color: "error",
      class: [
        "text-error",
        "hover:bg-error/10",
        "active:bg-error/20",
        "focus-visible:ring-error",
      ],
    },
    // Error Text
    {
      variant: "text",
      color: "error",
      class: [
        "text-error",
        "hover:text-error-hover",
        "focus-visible:ring-error",
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
