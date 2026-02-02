"use client";

import {
  Home,
  LayoutGrid,
  Users,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { AppRailItem } from "./AppRailItem";

export const AppRail = () => {
  return (
    <div className="flex flex-col border-r border-border-2 bg-background w-[72px] h-full py-2 gap-2 shrink-0">
      <AppRailItem icon={Home} label="Home" active />
      <AppRailItem icon={LayoutGrid} label="Spaces" />
      <AppRailItem icon={Users} label="Teams" />
      <AppRailItem icon={FileText} label="Docs" />
      <AppRailItem icon={LayoutDashboard} label="Dashboard" />
    </div>
  );
};
