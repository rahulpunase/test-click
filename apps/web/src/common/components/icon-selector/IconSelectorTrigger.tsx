import { Icon } from "@repo/ui";
import { useGetDynamicIcon } from "./useGetDynamicIcon";
import { forwardRef } from "react";

type IconSelectorTrigger = {
  iconName: string;
  letter: string;
};

export const IconSelectorTrigger = forwardRef<
  HTMLButtonElement,
  IconSelectorTrigger
>(({ iconName, letter, ...props }, ref) => {
  const IconToRender = useGetDynamicIcon(iconName, false);
  return (
    <button
      ref={ref}
      className="w-8 h-8 rounded-md border border-border-3 flex items-center cursor-pointer justify-center"
      {...props}
    >
      <Icon
        icon={IconToRender ?? undefined}
        letter={letter}
        className="h-4 w-4"
      />
    </button>
  );
});
