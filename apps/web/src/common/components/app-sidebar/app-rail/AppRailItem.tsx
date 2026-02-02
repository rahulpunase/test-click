"use client";

import { cn } from "@repo/ui/utils";

interface AppRailItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

export const AppRailItem = ({
  icon: Icon,
  label,
  active,
}: AppRailItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-3 cursor-pointer group text-text-muted hover:bg-background-hover transition-colors rounded-md mx-2",
        active &&
          "bg-primary-active text-text-inverted hover:bg-primary-active hover:text-text-inverted",
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-colors",
          active && "text-text-inverted",
        )}
      />
      <span
        className={cn(
          "text-[10px] font-medium transition-colors",
          active && "text-text-inverted",
        )}
      >
        {label}
      </span>
    </div>
  );
};
