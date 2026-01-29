import { tv, type VariantProps } from "tailwind-variants";

export const dropdownVariants = tv({
  slots: {
    trigger:
      "inline-flex items-center justify-between gap-2 w-full px-3 py-2 h-9 text-sm font-medium transition-all duration-200 rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
    popup:
      "z-50 mt-1 min-w-[8rem] overflow-auto rounded-md bg-white shadow-lg border border-border p-1 outline-none",
    item: "relative flex items-center gap-2 px-3 py-2 text-sm rounded cursor-pointer outline-none transition-colors data-[highlighted]:bg-background-hover data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    itemIndicator: "inline-flex items-center justify-center w-4 h-4 ml-auto",
    icon: "h-4 w-4 shrink-0 transition-transform duration-200",
  },
  variants: {
    variant: {
      bordered: {
        trigger: "border border-border bg-white hover:bg-background-hover",
      },
      filled: {
        trigger: "border-0 bg-muted hover:bg-background-hover",
      },
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
