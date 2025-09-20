import { create } from "zustand";
import { Recipe } from "@/types/Types";

interface RecipeStore {
  recipes: Recipe[];
  lastFetched: number | null;
  page: number;
  setRecipes: (recipes: Recipe[]) => void;
  setPage: (page: number) => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  lastFetched: null,
  page: 0,
  setRecipes: (recipes) => set({ recipes, lastFetched: Date.now() }),
  setPage: (page) => set({ page }),
}));