
import {create} from 'zustand';
import {z} from 'zod';
import {recipeSchema} from '@/types/Types';

interface MyRecipeState {
  myRecipes: z.infer<typeof recipeSchema>[];
  addRecipe: (recipe: z.infer<typeof recipeSchema>) => void;
  updateRecipe: (updatedRecipe: z.infer<typeof recipeSchema>) => void;
  removeRecipe: (idMeal: string) => void;

}