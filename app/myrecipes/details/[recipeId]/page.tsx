"use client";

import React from "react";
import { useMyRecipeStore } from "@/store/myRecipeStore";
import { useFavouritesStore } from "@/store/favouriteStore";
import Image from "next/image";
import {  House, Pen, Trash, Youtube } from "lucide-react";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{ recipeId: string }>;
}

const placeholderImage = "/placeholder-recipe.jpg";
const placeholderIngredientImage = "/placeholder-ingredient.png";

export default function Page({ params }: PageProps) {
  const { recipeId } = React.use(params);
  const { myRecipes } = useMyRecipeStore();
  const { addFavourite, favourites } = useFavouritesStore();


  const customRecipe = myRecipes.find((recipe) => recipe.idMeal === recipeId);

  const handleAddToFavourite = () => {
    if (customRecipe && !favourites.includes(recipeId)) {
      addFavourite(recipeId);
      toast.success(`${customRecipe.strMeal || "Recipe"} added to favorites!`);
    } else {
      toast.info("Recipe already in favorites!");
    }
  };

  if (!customRecipe) {
    return (
      <div className="flex flex-col items-center p-4">
        <p className="text-red-600">Custom recipe not found.</p>
        <a href="/my-recipes" className="flex items-center text-indigo-600 mt-4">
          <House className="mr-2" />
          Go back to My Recipes
        </a>
      </div>
    );
  }

  const UpdateRecipe = (idMeal: string | undefined) => {
    return () => {
      if (idMeal) {
        window.location.href = `/myrecipes/update/${idMeal}`;
      } else {
        toast.error("Recipe ID is undefined.");
      }
    };
  }

  const recipe = customRecipe;
  const ingredientImages = (recipe.ingredients || []).map(() => placeholderIngredientImage);

  return (
    <div className="flex flex-col items-center p-4">
      <span className="self-stretch flex items-center text-indigo-600 mb-4">
        <House />
        <a href="/my-recipes" className="underline ml-2">
          Go back to My Recipes
        </a>
      </span>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full max-w-4xl">
        <Image
          src={recipe.strMealThumb || placeholderImage}
          alt={recipe.strMeal || "Recipe Image"}
          width={500}
          height={500}
          className="w-full md:w-1/2 rounded-lg object-cover h-64"
          placeholder="blur"
          blurDataURL={placeholderImage}
        />
        <div className="flex flex-col gap-4 md:flex-1">
          <h1 className="text-2xl font-bold">{recipe.strMeal || "Unnamed Recipe"}</h1>
          <p className="text-gray-600">Category: {recipe.strCategory || "N/A"}</p>
          <p className="text-gray-600">Area Popular in: {recipe.strArea || "N/A"}</p>
          <p className="text-gray-600 font-semibold">Procedure:</p>
          <p className="text-gray-600">{recipe.strInstructions || "No instructions provided."}</p>
          {recipe.strYoutube && (
            <button
              onClick={() => window.open(recipe.strYoutube, "_blank")}
              className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              <Youtube className="fill-red-600" />
              Watch Video on YouTube
            </button>
          )}
          <button
            onClick={handleAddToFavourite}
            className={`flex items-center gap-2 border px-4 py-2 rounded transition-colors duration-200 hover:bg-red-600 hover:text-white hover:cursor-pointer`}
          >
            <Trash className={favourites.includes(recipeId) ? "fill-white" : ""} />
            Delete 
          </button>
          <button
            onClick={UpdateRecipe(recipe.idMeal)}
            className={`flex items-center gap-2 border px-4 py-2 rounded transition-colors duration-200 hover:bg-indigo-600 hover:text-white hover:cursor-pointer`}
          >
            <Pen className={favourites.includes(recipeId) ? "fill-white" : ""} />
            Update 
          </button>
        </div>
      </div>
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-xl font-bold mb-4">Ingredients</h2>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul className="flex flex-wrap gap-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex flex-col items-center border p-2 rounded w-32"
              >
                {!ingredientImages[index] ? (
                  <Image
                    src={ingredientImages[index]}
                    alt={ingredient.ingredient || "Ingredient"}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover mb-2 rounded"
                  />
                ):(
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mb-2 rounded">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
                <span className="text-sm text-center">
                  {ingredient.ingredient || "Unknown"} - {ingredient.measure || "N/A"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No ingredients listed.</p>
        )}
      </div>
    </div>
  );
}