import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { iconVariants, type IconVariants } from "./Icon.variants";
import { Tooltip } from "../tooltip";

export interface IconProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">, IconVariants {
  /**
   * The icon component to render (e.g. from lucide-react)
   */
  icon?: React.ElementType;
  /**
   * A letter/text to render instead of the icon.
   * If both icon and letter are provided, icon takes precedence.
   */
  letter?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Tooltip text
   */
  tooltip?: React.ReactNode;
  /**
   * If true, the icon will not be resized to fit the container.
   */
  freeSize?: boolean;
}

/**
 * A flexible Icon component that supports icons (components) and letters (avatars/placeholders).
 * Styling is controlled via classNames.
 */
export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    { size, shape, icon: IconComponent, letter, className, tooltip, ...props },
    ref,
  ) => {
    const children = (
      <div
        ref={ref}
        className={cn(iconVariants({ size, shape }), className)}
        {...props}
      >
        {IconComponent ? <IconComponent /> : letter}
      </div>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{children}</Tooltip>;
    }
    return children;
  },
);

Icon.displayName = "Icon";
