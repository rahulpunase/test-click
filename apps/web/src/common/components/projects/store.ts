import { create } from "zustand";
import type { Id } from "@repo/backend/types";

interface CreateProjectStore {
  isOpen: boolean;
  spaceId: Id<"spaces"> | null;
  open: (spaceId: Id<"spaces">) => void;
  close: () => void;
}

export const useCreateProjectStore = create<CreateProjectStore>((set) => ({
  isOpen: false,
  spaceId: null,
  open: (spaceId) => set({ isOpen: true, spaceId }),
  close: () => set({ isOpen: false, spaceId: null }),
}));
