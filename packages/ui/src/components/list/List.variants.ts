import { tv, type VariantProps } from "tailwind-variants";

export const listVariants = tv({
  slots: {
    base: "w-full flex flex-col",
    group: "flex flex-col w-full",
    groupHeader:
      "flex items-center justify-between py-2 px-2 text-sm font-medium text-text-muted rounded-md",
    groupTitle: "font-semibold text-text-muted text-xs",
    groupDescription: "text-xs text-text-muted mt-0.5",
    groupContent: "flex flex-col border-border-2",
    item: "group/item flex items-center justify-between w-full p-2 py-1 text-sm text-left rounded-md transition-colors hover:bg-background-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
    itemIcon:
      "flex items-center justify-center h-4 w-4 mr-3 text-text-muted group-hover/item:text-text-primary transition-colors",
    itemContent: "flex flex-col flex-1 min-w-0",
    itemTitle: "text-text-primary truncate",
    itemDescription: "text-xs text-text-muted truncate",
    itemAction:
      "ml-2 text-text-muted opacity-0 group-hover/item:opacity-100 focus-within:opacity-100 transition-opacity",
    chevron: "w-4 h-4 text-text-muted transition-transform duration-200",
  },
  variants: {
    clickable: {
      true: {
        item: "cursor-pointer active:bg-background-muted/70",
      },
    },
    selected: {
      true: {
        item: "bg-primary/10 text-primary hover:bg-primary/15",
        itemIcon: "text-primary group-hover/item:text-primary",
        itemTitle: "text-primary",
        itemDescription: "text-primary/70",
      },
    },
    disabled: {
      true: {
        item: "opacity-50 cursor-not-allowed hover:bg-transparent",
        groupHeader: "opacity-70",
      },
    },
    expanded: {
      true: {
        chevron: "rotate-90",
      },
      false: {
        chevron: "rotate-0",
      },
    },
  },
  defaultVariants: {
    clickable: false,
    selected: false,
    disabled: false,
    expanded: false,
  },
});

export type ListVariants = VariantProps<typeof listVariants>;
