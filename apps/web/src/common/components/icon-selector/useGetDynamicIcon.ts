import * as LucideIcons from "lucide-react";
import { OctagonX, type LucideIcon } from "lucide-react";

export const useGetDynamicIcon = (
  iconName: string,
  shouldGetDefaultIcon: boolean = true,
) => {
  const Icon = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as unknown as LucideIcon;
  const DefaultIcon = OctagonX;

  if (!Icon) {
    console.warn(`Icon "${iconName}" not found`);
    return shouldGetDefaultIcon ? DefaultIcon : null;
  }
  return Icon;
};
