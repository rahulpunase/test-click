import { tv, type VariantProps } from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    root: "flex w-full flex-col relative",
    list: "flex w-full relative justify-start z-1 gap-1 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-border-2 after:transition-colors",
    trigger: [
      "relative z-2 flex items-center gap-2 px-3 py-1 rounded-md text-sm text-text-muted",
      "hover:bg-background-hover cursor-pointer font-normal",
      "aria-selected:font-medium aria-selected:text-text-primary",
      "after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5",
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
