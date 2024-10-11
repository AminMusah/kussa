import { create } from "zustand";

export type ModalType = "toggleCart" | "createCategory" | "editCategory";

interface ModalStore {
  type: ModalType | null;
  data: any;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: any) => void;
  onClose: () => void;
  onRender: () => void;
  render: boolean;
  setRender: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  render: false,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  onRender: () => set({ type: null, render: true }),
  setRender: () => set({ render: false }),
}));
