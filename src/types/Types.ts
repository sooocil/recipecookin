import * as z from 'zod';

export const recipeSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string(),
  strArea: z.string(),
  strInstructions: z.string(),
  strMealThumb: z.string(),
  strYoutube: z.string().optional(),
  strTags: z.string().optional(),
  ingredients: z.array(z.object({
    ingredient: z.string(),
    measure: z.string()
  }))
});

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




export type FormFields = z.infer<typeof recipeSchema>;