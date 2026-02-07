import { create } from "zustand";
import type { Id } from "@repo/backend/types";

interface CreateFolderStore {
  isOpen: boolean;
  spaceId: Id<"spaces"> | null;
  parentId: Id<"folders"> | null;
  open: (spaceId: Id<"spaces">, parentId?: Id<"folders">) => void;
  close: () => void;
}

export const useCreateFolderStore = create<CreateFolderStore>((set) => ({
  isOpen: false,
  spaceId: null,
  parentId: null,
  open: (spaceId, parentId) =>
    set({ isOpen: true, spaceId, parentId: parentId ?? null }),
  close: () => set({ isOpen: false, spaceId: null, parentId: null }),
}));
