import { create } from "zustand";

interface SidebarStore {
  isNavConfigDialogOpen: boolean;
  openNavConfigDialog: () => void;
  closeNavConfigDialog: () => void;
  toggleNavConfigDialog: () => void;
  setNavConfigDialogOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isNavConfigDialogOpen: false,
  openNavConfigDialog: () => set({ isNavConfigDialogOpen: true }),
  closeNavConfigDialog: () => set({ isNavConfigDialogOpen: false }),
  toggleNavConfigDialog: () =>
    set((state) => ({ isNavConfigDialogOpen: !state.isNavConfigDialogOpen })),
  setNavConfigDialogOpen: (open) => set({ isNavConfigDialogOpen: open }),
}));
