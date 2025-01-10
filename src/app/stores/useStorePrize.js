import { create } from "zustand";

export const useStorePrize = create((set) => ({
    currentPrize: {
        'name': '',
        'quantity': 0,
    },
    setCurrentPrize: (data) => set({ currentPrize: data }),
}));
