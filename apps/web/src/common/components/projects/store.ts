import { create } from "zustand";
import type { Id } from "@repo/backend/types";

interface CreateProjectStore {
  isOpen: boolean;
  spaceId: Id<"spaces"> | null;
  folderId: Id<"folders"> | null;
  open: (spaceId: Id<"spaces">, folderId?: Id<"folders">) => void;
  close: () => void;
}

export const useCreateProjectStore = create<CreateProjectStore>((set) => ({
  isOpen: false,
  spaceId: null,
  folderId: null,
  open: (spaceId, folderId) =>
    set({ isOpen: true, spaceId, folderId: folderId ?? null }),
  close: () => set({ isOpen: false, spaceId: null, folderId: null }),
}));
