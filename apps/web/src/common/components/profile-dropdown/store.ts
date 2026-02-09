import { create } from "zustand";

interface SetStatusDialogState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSetStatusDialogStore = create<SetStatusDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
