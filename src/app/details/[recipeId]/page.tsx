"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/utils/actions/getRecipeById";
import { Recipe } from "@/types/Types";
import Image from "next/image";
import { Heart, House, Youtube } from "lucide-react";
import { getIngredientImage } from "@/utils/actions/getIngreditentImage";

interface PageProps {
  params: Promise<{ recipeId: string }>;
}

export default function Page({ params }: PageProps) {
  const { recipeId } = React.use(params);

  const addToFavourite = () => {
    alert("Added to favourite!");
  };

  const { data, isLoading, isError } = useQuery<{
    recipe: Recipe;
    ingredientImages: string[];
  }>({
    queryKey: ["recipeWithImages", recipeId],
    queryFn: async () => {
      const recipe = await getRecipeById(recipeId);
      if (!recipe) {
        throw new Error("Recipe not found");
      }

      const ingredientImages = await Promise.all(
        recipe.ingredients.map((i) => getIngredientImage(i.ingredient))
      );

      return { recipe, ingredientImages };
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error fetching recipe details.</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <span className="self-stretch flex items-center text-indigo-600 mb-4">
        <House />
        <a href="/" className="underline ml-2">
          {" "}
          Go back to Home
        </a>
      </span>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full max-w-4xl">
        <Image
          width={500}
          height={400}  
          src={data.recipe.strMealThumb}
          alt={data.recipe.strMeal}
          className="w-full md:w-1/2 rounded-lg"
        />

        <div className="flex flex-col gap-4 md:flex-1">
          <h1 className="text-2xl font-bold">{data.recipe.strMeal}</h1>

          <p>Procedure to make one:</p>
          <p className="text-gray-600 "> {data.recipe.strInstructions}</p>

          <button
            onClick={() => {
              window.open(data.recipe.strYoutube, "_blank");
            }}
            className="flex group items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            <Youtube className="fill-red-600" />
            <span> Watch Video on youtube</span>
          </button>
          <button
            onClick={addToFavourite}
            className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            <Heart />
            Add to Favourite
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-xl font-bold mb-4">Ingredients</h2>
        <ul className="flex flex-wrap gap-4 min-w-[1000px]">
          {data.recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex flex-col items-center border p-2 rounded"
            >
              {data.ingredientImages[index] && (
                <Image
                  width={80}
                  height={80}
                  src={data.ingredientImages[index]}
                  alt={ingredient.ingredient}
                  className="w-20 h-20 object-cover mb-2 rounded"
                />
              )}
              <span>
                {ingredient.ingredient} - {ingredient.measure}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
