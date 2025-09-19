import { create } from "zustand";
import { Recipe } from "@/types/Recipe";


type RecipeState = {
  recipes: Recipe[];
  lastFetched: number | null;
  setRecipes: (recipes: Recipe[]) => void;
};

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  lastFetched: null,
  setRecipes: (recipes) =>
    set({ recipes, lastFetched: Date.now() }),
}));
