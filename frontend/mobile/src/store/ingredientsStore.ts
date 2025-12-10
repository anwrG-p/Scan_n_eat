import { create } from 'zustand';
import { Ingredient } from '../types';

interface IngredientsState {
    scannedIngredients: Ingredient[];
    setIngredients: (ingredients: Ingredient[]) => void;
    addIngredient: (ingredient: Ingredient) => void;
    removeIngredient: (index: number) => void;
    clearIngredients: () => void;
}

export const useIngredientsStore = create<IngredientsState>((set) => ({
    scannedIngredients: [],
    setIngredients: (ingredients) => set({ scannedIngredients: ingredients }),
    addIngredient: (ingredient) =>
        set((state) => ({
            scannedIngredients: [...state.scannedIngredients, ingredient],
        })),
    removeIngredient: (index) =>
        set((state) => ({
            scannedIngredients: state.scannedIngredients.filter((_, i) => i !== index),
        })),
    clearIngredients: () => set({ scannedIngredients: [] }),
}));
