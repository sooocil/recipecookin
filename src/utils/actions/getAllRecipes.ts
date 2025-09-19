import axios from "axios";
import { Recipe } from "@/types/Recipe";

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export async function getAllRecipes(count = 8, skip = 0): Promise<Recipe[]> {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let allMeals: Recipe[] = [];

  for (const letter of letters) {
    if (allMeals.length >= skip + count) break;

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );

      if (res.data.meals) {
        allMeals = allMeals.concat(res.data.meals);
      }
    } catch (error) {
      console.error(`Error fetching meals for letter ${letter}:`, error);
    }
  }

  return shuffleArray(allMeals).slice(skip, skip + count);
}