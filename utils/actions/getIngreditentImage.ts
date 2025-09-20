
import axios from "axios";

export async function getIngredientImage(ingredient: string): Promise<string> {
  const formattedIngredient = ingredient.trim().replace(/ /g, "%20");
  return `https://www.themealdb.com/images/ingredients/${formattedIngredient}-Small.png`;
}