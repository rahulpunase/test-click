import * as LucideIcons from "lucide-react";
import { useGetDynamicIcon } from "./useGetDynamicIcon";

interface IconProps {
  iconName: string;
  className?: string;
}

export const DynamicIcon = ({ iconName, className }: IconProps) => {
  const Icon = useGetDynamicIcon(iconName);
  return <Icon className={className} />;
};
