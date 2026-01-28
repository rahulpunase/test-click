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
      sm: "text-xs px-2 py-1 h-7",
      md: "text-sm px-3 py-1.5 h-8",
      lg: "text-base px-4 py-2 h-9",
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
        "border-primary-500 text-primary-500",
        "hover:bg-primary-50",
        "active:bg-primary-100",
        "focus-visible:ring-primary-500",
      ],
    },
    // Primary Ghost
    {
      variant: "ghost",
      color: "primary",
      class: [
        "text-primary-500",
        "hover:bg-primary-50",
        "active:bg-primary-100",
        "focus-visible:ring-primary-500",
      ],
    },
    // Primary Text
    {
      variant: "text",
      color: "primary",
      class: [
        "text-primary-500",
        "hover:text-primary-600",
        "focus-visible:ring-primary-500",
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
        "border-secondary-500 text-secondary-500",
        "hover:bg-secondary-50",
        "active:bg-secondary-100",
        "focus-visible:ring-secondary-500",
      ],
    },
    // Secondary Ghost
    {
      variant: "ghost",
      color: "secondary",
      class: [
        "text-secondary-500",
        "hover:bg-secondary-50",
        "active:bg-secondary-100",
        "focus-visible:ring-secondary-500",
      ],
    },
    // Secondary Text
    {
      variant: "text",
      color: "secondary",
      class: [
        "text-secondary-500",
        "hover:text-secondary-600",
        "focus-visible:ring-secondary-500",
      ],
    },
    // Tertiary Solid
    {
      variant: "solid",
      color: "tertiary",
      class: [
        "bg-tertiary-500 text-white",
        "hover:bg-tertiary-600",
        "active:bg-tertiary-700",
        "focus-visible:ring-tertiary-500",
      ],
    },
    // Tertiary Outlined
    {
      variant: "outlined",
      color: "tertiary",
      class: [
        "border-tertiary-500 text-tertiary-500",
        "hover:bg-tertiary-50",
        "active:bg-tertiary-100",
        "focus-visible:ring-tertiary-500",
      ],
    },
    // Tertiary Ghost
    {
      variant: "ghost",
      color: "tertiary",
      class: [
        "text-tertiary-500",
        "hover:bg-tertiary-50",
        "active:bg-tertiary-100",
        "focus-visible:ring-tertiary-500",
      ],
    },
    // Tertiary Text
    {
      variant: "text",
      color: "tertiary",
      class: [
        "text-tertiary-500",
        "hover:text-tertiary-600",
        "focus-visible:ring-tertiary-500",
      ],
    },
    // Success Solid
    {
      variant: "solid",
      color: "success",
      class: [
        "bg-green-500 text-white",
        "hover:bg-green-600",
        "active:bg-green-700",
        "focus-visible:ring-green-500",
      ],
    },
    // Success Outlined
    {
      variant: "outlined",
      color: "success",
      class: [
        "border-green-500 text-green-500",
        "hover:bg-green-50",
        "active:bg-green-100",
        "focus-visible:ring-green-500",
      ],
    },
    // Success Ghost
    {
      variant: "ghost",
      color: "success",
      class: [
        "text-green-500",
        "hover:bg-green-50",
        "active:bg-green-100",
        "focus-visible:ring-green-500",
      ],
    },
    // Success Text
    {
      variant: "text",
      color: "success",
      class: [
        "text-green-500",
        "hover:text-green-600",
        "focus-visible:ring-green-500",
      ],
    },
    // Error Solid
    {
      variant: "solid",
      color: "error",
      class: [
        "bg-red-500 text-white",
        "hover:bg-red-600",
        "active:bg-red-700",
        "focus-visible:ring-red-500",
      ],
    },
    // Error Outlined
    {
      variant: "outlined",
      color: "error",
      class: [
        "border-red-500 text-red-500",
        "hover:bg-red-100",
        "active:bg-red-200",
        "focus-visible:ring-red-500",
      ],
    },
    // Error Ghost
    {
      variant: "ghost",
      color: "error",
      class: [
        "text-red-500",
        "hover:bg-red-100",
        "active:bg-red-200",
        "focus-visible:ring-red-500",
      ],
    },
    // Error Text
    {
      variant: "text",
      color: "error",
      class: [
        "text-red-500",
        "hover:text-red-600",
        "focus-visible:ring-red-500",
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
