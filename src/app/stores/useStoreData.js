import { create } from "zustand";

export const useStoreData = create((set) => ({
    storeData: [],
    setStoreData: (state) => set({ storeData: state }),
}));