import axios from "axios";

export async function getRecipesByCategory(category?: string) {
  try {
    const url = category
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    const res = await axios.get(url);
    return res.data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}
