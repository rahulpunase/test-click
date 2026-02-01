import { tv, type VariantProps } from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    root: "flex w-full flex-col",
    list: "flex w-full justify-start gap-1",
    trigger: [
      "relative flex items-center gap-2 px-3 py-1 rounded-md text-base text-text-secondary",
      "hover:bg-background-hover cursor-pointer font-normal",
      "aria-selected:font-medium",
      "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5",
      "after:bg-transparent aria-selected:after:bg-text-secondary",
      "after:transition-colors after:duration-200",
    ],
    content:
      "mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    triggerBody: "flex flex-col items-start gap-0.5",
    triggerIcon: "mr-2 h-4 w-4",
    triggerLabel: "font-medium",
    triggerSubLabel: "text-xs text-text-muted",
  },
});

export type TabsVariants = VariantProps<typeof tabsVariants>;
