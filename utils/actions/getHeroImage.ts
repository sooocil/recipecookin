import axios from "axios";

export async function getHeroImage() {
  const response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  return response.data.meals[0].strMealThumb;
}
