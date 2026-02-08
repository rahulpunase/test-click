import { tv, type VariantProps } from "tailwind-variants";

export const selectVariants = tv({
  slots: {
    trigger:
      "inline-flex items-center justify-between gap-2 w-full px-3 py-2 h-9 text-sm font-medium duration-200 rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
    popup:
      "z-50 mt-1 min-w-[8rem] overflow-auto rounded-md bg-white shadow-2xl border border-border-2 pt-2 pb-2 outline-none min-w-40",
    item: [
      "group relative flex items-center gap-2 mx-2 px-2 py-1.5 text-sm rounded cursor-pointer outline-none transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none text-text-secondary",
      "data-[highlighted]:bg-background-muted data-[highlighted]:text-text-primary",
    ],
    itemIcon:
      "flex items-center justify-center h-4 w-4 text-text-muted transition-colors shrink-0",
    itemContent: "flex flex-col flex-1 min-w-0",
    itemLabel: "truncate",
    itemDescription: "text-xs text-text-muted truncate",
    itemIndicator:
      "inline-flex items-center justify-center w-4 h-4 ml-auto shrink-0",
    icon: "h-4 w-4 shrink-0 transition-transform duration-200",
    value: "truncate",
    groupLabel: "px-2 py-1.5 text-xs font-semibold text-text-muted mx-2",
  },
  variants: {
    variant: {
      bordered: {
        trigger: "border border-border-2 bg-white hover:bg-background-hover",
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

export type SelectVariants = VariantProps<typeof selectVariants>;
