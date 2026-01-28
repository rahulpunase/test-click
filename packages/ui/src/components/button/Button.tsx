import { forwardRef, type ButtonHTMLAttributes } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariants } from "./Button.variants";

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariants {
  /**
   * Icon component from lucide-react to display on the left
   */
  icon?: LucideIcon;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Button content
   */
  children?: React.ReactNode;
}

/**
 * Button component with multiple variants, sizes, and icon support
 *
 * @example
 * ```tsx
 * import { Button } from '@repo/ui/components/button'
 * import { Plus } from 'lucide-react'
 *
 * <Button variant="solid" color="primary" size="md" icon={Plus}>
 *   Add Item
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      color = "primary",
      size = "md",
      icon: Icon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, color, size }), className)}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
