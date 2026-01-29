import { tv } from "tailwind-variants";

export const cardVariants = tv({
  slots: {
    card: "bg-background border border-border rounded-lg transition-all",
    header:
      "flex items-center justify-between px-4 py-3 pb-2 border-b border-border-light",
    title: "text-lg font-semibold text-text-primary",
    headerRight: "flex items-center gap-2",
    content: "px-4 pb-4 pt-4 transition-all duration-200",
    footer: "px-4 pb-3 pt-3 border-t border-border-light",
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
        content: "hidden h-0 overflow-hidden pb-0",
        collapseIcon: "rotate-180",
      },
    },
  },
});

export type CardVariants = ReturnType<typeof cardVariants>;
