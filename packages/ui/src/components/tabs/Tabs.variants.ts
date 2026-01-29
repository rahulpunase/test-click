import { tv, type VariantProps } from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    root: "flex w-full flex-col",
    list: "flex w-full justify-start gap-1",
    trigger: [
      "flex items-center gap-2 px-2 py-1 rounded-md",
      "hover:bg-primary-50 cursor-pointer font-normal",
      "aria-selected:border-b-2 border-text-primary",
    ],
    content:
      "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    triggerBody: "flex flex-col items-start gap-0.5",
    triggerIcon: "mr-2 h-4 w-4",
    triggerLabel: "font-medium",
    triggerSubLabel: "text-xs text-text-muted",
  },
});

export type TabsVariants = VariantProps<typeof tabsVariants>;
