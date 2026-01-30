import { tv } from "tailwind-variants";

export const cardVariants = tv({
  slots: {
    card: "bg-background border border-border-2 rounded-lg transition-all",
    header: "px-4 py-3 border-b border-border-1",
    headerTop: "flex items-center justify-between",
    headerBottom: "mt-2 -mx-0 transition-all duration-200",
    title: "text-base font-semibold text-text-primary",
    headerRight: "flex items-center gap-2",
    content: "px-4 pb-4 pt-4 transition-all duration-200",
    footer: "px-4 pb-3 pt-3 border-t border-border-1",
    collapseIcon:
      "h-5 w-5 text-text-muted transition-transform duration-200 cursor-pointer hover:text-text-primary",
  },
  variants: {
    selectable: {
      true: {
        card: "cursor-pointer",
      },
    },
    selected: {
      true: {
        card: "ring-2 ring-primary border-primary",
      },
    },
    collapsed: {
      true: {
        header: "border-b-0",
        headerBottom: "hidden h-0 overflow-hidden",
        content: "hidden h-0 overflow-hidden pb-0",
        collapseIcon: "rotate-180",
      },
    },
    hasTabList: {
      true: {
        header: "pb-1",
      },
    },
  },
});

export type CardVariants = ReturnType<typeof cardVariants>;
