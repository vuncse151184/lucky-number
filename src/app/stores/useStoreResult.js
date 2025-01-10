import { create } from "zustand";

export const useStoreResult = create((set) => ({
    storeResult:[],
    setStoreResult: (result) => set({ storeResult: result }),
}));
