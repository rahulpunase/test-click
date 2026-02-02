import { forwardRef } from "react";
import {
  separatorVariants,
  type SeparatorVariants,
} from "./Separator.variants";
import { cn } from "../../lib/utils";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>, SeparatorVariants {
  label?: string;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", label, className, ...props }, ref) => {
    // If we have a label and horizontal orientation, we need a different structure
    if (orientation === "horizontal" && label) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center w-full", className)}
          role="separator"
          aria-orientation={orientation}
          {...props}
        >
          <div className="h-px grow bg-border-2" />
          <span className="px-2 text-xs font-medium text-text-muted">
            {label}
          </span>
          <div className="h-px grow bg-border-2" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(separatorVariants({ orientation }), className)}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";
