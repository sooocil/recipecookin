//get all recipes by alphabets\

import axios from "axios";
import { Recipe } from "@/types/Recipe";

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export async function getAllRecipes(count = 10) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const usedLetters = new Set<string>();
  let allMeals: Recipe[] = [];

  while (allMeals.length < count && usedLetters.size < letters.length) {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    if (usedLetters.has(randomLetter)) continue;
    usedLetters.add(randomLetter);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${randomLetter}`
      );

      if (res.data.meals) {
        allMeals = allMeals.concat(res.data.meals);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  }

  return shuffleArray(allMeals).slice(0, count);
}
