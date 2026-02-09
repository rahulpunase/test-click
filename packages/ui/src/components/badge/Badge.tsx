import {
  forwardRef,
  type ReactElement,
  cloneElement,
  isValidElement,
} from "react";
import { badgeVariants, type BadgeVariants } from "./Badge.variants";
import { cn } from "../../lib/utils";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, BadgeVariants {
  /** Icon to display on the left side of the badge */
  icon?: ReactElement<{ className?: string }>;
  /** Badge content */
  children: React.ReactNode;
}

/**
 * Badge component for displaying status labels, tags, or categories.
 *
 * @example
 * // Default badge
 * <Badge>Default</Badge>
 *
 * @example
 * // With icon
 * <Badge icon={<CheckIcon />} variant="success">Active</Badge>
 *
 * @example
 * // Different variants
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="destructive">Error</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, icon, className, children, ...props }, ref) => {
    // Clone icon with appropriate sizing
    const iconElement =
      icon && isValidElement(icon)
        ? cloneElement(icon, {
            className: cn("w-3 h-3", icon.props.className),
          })
        : null;

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {iconElement}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
