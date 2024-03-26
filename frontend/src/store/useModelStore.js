import { create } from "zustand";


export const useModelStore = create((set) => ({
    models: [],
    
    setModels: (models) => set({ models })
}))