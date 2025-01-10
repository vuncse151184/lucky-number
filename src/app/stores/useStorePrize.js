import { create } from "zustand";

export const useStorePrize = create((set) => ({
    storePrize: [],
    setStoreData: (data) => set({ storePrize: data }),
}));
