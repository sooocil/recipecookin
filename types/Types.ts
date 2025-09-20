import * as z from 'zod';


export type Recipe = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  strTags?: string;
  [key: string]: any;
  ingredients: { ingredient: string; measure: string }[];
};





export const recipeSchema = z.object({
  strMeal: z.string().min(1, "Recipe name is required"),
  strCategory: z.string().min(1, "Category is required"),
  strArea: z.string().min(1, "Area is required"),
  strInstructions: z.string().min(1, "Instructions are required"),
  strMealThumb: z.string().url().optional(),
  strYoutube: z.string().url().optional(),
  ingredients: z
    .array(
      z.object({
        ingredient: z.string().min(1, "Ingredient name is required"),
        measure: z.string().min(1, "Measure is required"),
      })
    )
    .min(1, "At least one ingredient is required"),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

