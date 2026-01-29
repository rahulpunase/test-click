import { tv, type VariantProps } from "tailwind-variants";

export const dropdownVariants = tv({
  slots: {
    trigger:
      "inline-flex items-center justify-between gap-2 w-full px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
    listbox:
      "z-50 mt-1 max-h-60 overflow-auto rounded-md bg-white shadow-lg border border-border p-1 outline-none",
    option:
      "relative flex items-center gap-2 px-3 py-2 text-sm rounded cursor-pointer outline-none transition-colors data-[highlighted]:bg-background-hover data-[selected]:bg-primary/10 data-[selected]:text-primary data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    optionIndicator: "inline-flex items-center justify-center w-4 h-4",
    valueDisplay: "flex-1 text-left truncate",
    icon: "h-4 w-4 shrink-0 transition-transform duration-200",
    placeholder: "text-muted-foreground",
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
    size: {
      sm: {
        trigger: "text-xs px-2 py-1 h-7",
        option: "text-xs px-2 py-1",
      },
      md: {
        trigger: "text-sm px-3 py-2 h-9",
        option: "text-sm px-3 py-2",
      },
      lg: {
        trigger: "text-base px-4 py-2.5 h-11",
        option: "text-base px-4 py-2.5",
      },
    },
    isOpen: {
      true: {
        icon: "rotate-180",
      },
    },
  },
  defaultVariants: {
    variant: "bordered",
    size: "md",
    isOpen: false,
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
