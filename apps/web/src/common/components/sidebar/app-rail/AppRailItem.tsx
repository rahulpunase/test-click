"use client";

import { forwardRef } from "react";
import { cn } from "@repo/ui/utils";
import { Tooltip } from "@repo/ui";

interface AppRailItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  label: string;
  active?: boolean;
}

export const AppRailItem = forwardRef<HTMLButtonElement, AppRailItemProps>(
  ({ icon: Icon, label, active, className, ...props }, ref) => {
    return (
      <Tooltip content={label} side="right">
        <button
          ref={ref}
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-12 h-12 py-2 cursor-pointer group text-text-muted hover:bg-background-secondary transition-colors rounded-md mx-2",
            active &&
              "bg-primary-active text-text-inverted hover:bg-primary-active hover:text-text-inverted",
            className,
          )}
          {...props}
        >
          {Icon && (
            <div className="w-full flex justify-center">
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  active && "text-text-inverted",
                )}
              />
            </div>
          )}
          <div
            className={cn(
              "text-[10px] font-normal transition-colors truncate  max-w-full",
              active && "text-text-inverted",
            )}
          >
            {label}
          </div>
        </button>
      </Tooltip>
    );
  },
);

AppRailItem.displayName = "AppRailItem";
