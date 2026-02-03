import { tv, type VariantProps } from "tailwind-variants";

export const tooltipVariants = tv({
  slots: {
    content:
      "z-50 overflow-hidden rounded-md border border-border-tooltip bg-background-tooltip px-3 py-1.5 text-xs text-white shadow-md transition-all duration-200 data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100",
    arrow: `flex
    data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180
    data-[side=bottom]:top-[-8px] data-[side=bottom]:rotate-0
    data-[side=left]:right-[-13px] data-[side=left]:rotate-90
    data-[side=right]:left-[-13px] data-[side=right]:-rotate-90`,
  },
});

export type TooltipVariants = VariantProps<typeof tooltipVariants>;
