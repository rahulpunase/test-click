import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { tooltipVariants } from "./Tooltip.variants";

export interface TooltipProps extends React.ComponentProps<
  typeof BaseTooltip.Root
> {
  /**
   * The element that triggers the tooltip.
   */
  children: React.ReactNode;
  /**
   * The content to display inside the tooltip.
   */
  content: React.ReactNode;
  /**
   * The side of the trigger the tooltip should be positioned.
   */
  side?: React.ComponentProps<typeof BaseTooltip.Positioner>["side"];
  /**
   * The alignment of the tooltip relative to the trigger.
   */
  align?: React.ComponentProps<typeof BaseTooltip.Positioner>["align"];
  /**
   * The distance in pixels from the trigger.
   * @default 4
   */
  sideOffset?: number;
  /**
   * Class name applied to the tooltip popup content.
   */
  className?: string;
  /**
   * Whether to show the tooltip arrow.
   * @default true
   */
  showArrow?: boolean;
  /**
   * The delay before the tooltip is shown.
   * @default 300
   */
  delay?: number;
}

export const Tooltip = ({
  children,
  content,
  side,
  align,
  sideOffset = 8,
  showArrow = true,
  className,
  delay = 300,
  ...props
}: TooltipProps) => {
  const { content: contentClass, arrow } = tooltipVariants();

  return (
    <BaseTooltip.Root {...props}>
      <BaseTooltip.Trigger
        delay={delay}
        render={(triggerProps) => <Slot {...triggerProps}>{children}</Slot>}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BaseTooltip.Popup className={cn(contentClass(), className)}>
            {content}
            {showArrow && (
              <BaseTooltip.Arrow className={arrow()}>
                <ArrowSvg />
              </BaseTooltip.Arrow>
            )}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
};

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-background-tooltip"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-border-tooltip"
      />
    </svg>
  );
}

Tooltip.displayName = "Tooltip";
