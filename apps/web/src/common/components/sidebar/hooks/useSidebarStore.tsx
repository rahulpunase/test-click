import { create } from "zustand";

interface SidebarStore {
  isNavConfigDialogOpen: boolean;
  defaultTab: string;
  openNavConfigDialog: (tab?: string) => void;
  closeNavConfigDialog: () => void;
  setNavConfigDialogOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isNavConfigDialogOpen: false,
  defaultTab: "navigation",
  openNavConfigDialog: (tab?: string) =>
    set({ isNavConfigDialogOpen: true, defaultTab: tab || "navigation" }),
  closeNavConfigDialog: () =>
    set({ isNavConfigDialogOpen: false, defaultTab: "navigation" }),
  setNavConfigDialogOpen: (open) => {
    if (open) {
      set({ isNavConfigDialogOpen: true });
    } else {
      set({ isNavConfigDialogOpen: false, defaultTab: "navigation" });
    }
  },
}));
