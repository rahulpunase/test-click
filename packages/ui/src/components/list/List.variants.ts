import { tv, type VariantProps } from "tailwind-variants";

export const listVariants = tv({
  slots: {
    root: "w-full flex flex-col relative",
    item: "w-full flex flex-row relative px-1 rounded-md items-center hover:bg-background-muted",
    itemAction: "flex flex-row",
    withLevel: `relative group mx-2 flex-1 overflow-hidden max-w-full`,
    itemIcon: "text-text-muted",
    isExpandableIcon:
      "text-text-muted cursor-pointer bg-background-muted hover:bg-background-hover rounded-md hidden",
    label: "flex flex-1 text-text-secondary text-sm py-1 cursor-pointer",
    group: "flex flex-col",
    groupContent: "flex flex-row items-center justify-between px-2 py-1",
    groupLabel: "text-text-muted text-xs font-medium",
  },
  variants: {
    isExpandable: {
      true: {
        itemIcon: "group-hover:hidden",
        isExpandableIcon: "group-hover:flex",
      },
    },
    isExpanded: {
      true: {},
    },
  },
});

export type ListVariants = VariantProps<typeof listVariants>;
