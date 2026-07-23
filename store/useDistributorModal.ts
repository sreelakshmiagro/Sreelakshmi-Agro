import { create } from "zustand";

interface DistributorModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useDistributorModal = create<DistributorModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
