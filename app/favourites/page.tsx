"use client";
import React from "react";
import RecipeCard from "../../Components/recipe-card";
import { useFavouritesStore } from "@/store/favouriteStore";
import { getRecipeById } from "@/utils/actions/getRecipeById";
import { Recipe } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";

const FavouritesPage = () => {
  const { favourites, removeFavourite, clearFavourites } =
    useFavouritesStore();

  const clearAllFav = () => {
    if (confirm("Are you sure you want to clear all favourites?")) {
      clearFavourites();
    }
  }

  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useQuery<Recipe[]>({
    queryKey: ["favorites", favourites],
    queryFn: async () => {
      const recipePromises = favourites.map((id) => getRecipeById(id));
      const results = await Promise.all(recipePromises);
      return results.filter((recipe): recipe is Recipe => recipe !== null);
    },
    enabled: favourites.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="m-20">
      <div className="space-y-2 mx-22">
        <h1 className="text-2xl font-bold">My Favourites</h1>
        <button
          onClick={clearAllFav}
          className="inline-block float-end m-2 bg-indigo-600 text-white font-bold px-4 py-1 rounded"
        >
          Clear All
        </button>
        <p className="text-sm text-zinc-600">
          List of my Favourite Recipe will be displayed here.
        </p>

        <div className="mt-10 p-4 bg-zinc-200 shadow-inner  w-full min-h-[700px] rounded-lg flex  ">
          {isLoading ? (
            <div className="m-auto text-gray-500">Loading...</div>
          ) : isError ? (
            <div className="m-auto text-red-500">
              Error loading favorite recipes.
            </div>
          ) : recipes.length === 0 ? (
            <div className="m-auto text-gray-500">No favorite recipes yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onDelete={removeFavourite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
