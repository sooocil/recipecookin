import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Recipe } from "@/types/Types";
import { v4 as uuidv4 } from "uuid";

interface MyRecipeStore {
  myRecipes: Recipe[];
  hasHydrated: boolean;
  isHydrating: boolean;
  addRecipe: (recipe: Omit<Recipe, "idMeal">) => string;
  removeRecipe: (idMeal: string) => void;
  updateRecipe: (idMeal: string, recipeData: Omit<Recipe, "idMeal">) => boolean;
  getRecipes: () => Recipe[];
  getRecipeById: (idMeal: string) => Recipe | undefined;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useMyRecipeStore = create<MyRecipeStore>()(
  persist(
    (set, get) => ({
      myRecipes: [],
      hasHydrated: false,
      isHydrating: true,
      
      addRecipe: (recipe) => {
        const newRecipe = { ...recipe, idMeal: uuidv4() } as Recipe;
        set((state) => ({
          myRecipes: [...state.myRecipes, newRecipe],
        }));
        console.log("Added recipe:", newRecipe);
        return newRecipe.idMeal;
      },
      
      removeRecipe: (idMeal) => {
        set((state) => ({
          myRecipes: state.myRecipes.filter((r) => r.idMeal !== idMeal),
        }));
        console.log("Removed recipe with ID:", idMeal);
      },
      
      updateRecipe: (idMeal, recipeData) => {
        if (!idMeal) {
          console.error("Update failed: Invalid ID");
          return false;
        }
        
        const { myRecipes } = get();
        const recipeIndex = myRecipes.findIndex((r) => r.idMeal === idMeal);
        
        if (recipeIndex === -1) {
          console.error(`Update failed: Recipe with ID ${idMeal} not found`, {
            availableIds: myRecipes.map(r => r.idMeal),
            searchId: idMeal,
            totalRecipes: myRecipes.length
          });
          return false;
        }
        
        set((state) => ({
          myRecipes: state.myRecipes.map((recipe, index) =>
            index === recipeIndex ? { ...recipeData, idMeal } as Recipe : recipe
          ),
        }));
        
        console.log("Updated recipe with ID:", idMeal, "New data:", recipeData);
        return true;
      },
      
      getRecipes: () => get().myRecipes,
      
      getRecipeById: (idMeal) => {
        const { myRecipes } = get();
        return myRecipes.find((r) => r.idMeal === idMeal);
      },
      
      setHasHydrated: (hasHydrated) => 
        set({ hasHydrated, isHydrating: !hasHydrated }),
    }),
    {
      name: "my-recipes-storage",
      storage: createJSONStorage(() => localStorage),
      
      onRehydrateStorage: () => {
        console.log("Starting rehydration...");
        
        return (state, error) => {
          if (error) {
            console.error("Rehydration failed:", error);
            if (state) {
              state.myRecipes = [];
              state.hasHydrated = true;
              state.isHydrating = false;
            }
          } else {
            console.log("Rehydration successful. State:", state);
            if (state) {
              state.hasHydrated = true;
              state.isHydrating = false;
              console.log(`Loaded ${state.myRecipes?.length || 0} recipes from storage`);
            }
          }
        };
      },
      
      skipHydration: typeof window === 'undefined',
    }
  )
);

export const useStoreHydration = () => {
  const { hasHydrated, isHydrating } = useMyRecipeStore();
  return { hasHydrated, isHydrating, isReady: hasHydrated && !isHydrating };
};
