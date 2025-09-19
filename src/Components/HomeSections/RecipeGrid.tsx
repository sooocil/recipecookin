"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Image from "next/image";
import { getAllRecipes } from "@/utils/actions/getAllRecipes";
import { Eye, Heart } from "lucide-react";
import { useRecipeStore } from "@/store/homeRecipeStore";
import { Recipe } from "@/types/Recipe";
import { forwardRef } from "react";

const RecipeGrid = forwardRef<HTMLDivElement>((props, ref) => {
  const { recipes, lastFetched, page, setRecipes, setPage } = useRecipeStore();
 const recipesPerPage = 8;
  
  const shouldRefetch =
    !lastFetched || Date.now() - lastFetched > 1000 * 60 * 2;

  const { data, isLoading, isError } = useQuery<Recipe[]>({
    queryKey: ["recipes", page],
    queryFn: () => getAllRecipes(recipesPerPage, page * recipesPerPage),
    enabled: shouldRefetch || page > 0,
    staleTime: 1000 * 60 * 5,
  });

    const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (data && data.length === recipesPerPage) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data, setRecipes]);

  if (isLoading)
    return (
      <div  >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-20  mt-10 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col border border-zinc-200 p-4 rounded animate-pulse"
            >
              <div className="bg-gray-300 h-48 w-full mb-4 rounded"></div>
              <div className="h-6 bg-gray-300 mb-2 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 mb-2 rounded w-full"></div>
              <div className="h-4 bg-gray-300 mb-2 rounded w-full"></div>
              <div className="h-4 bg-gray-300 mb-2 rounded w-full"></div>
              <div className="mt-auto h-10 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );

  if (isError) return <p>Error fetching recipes</p>;
  if (!recipes?.length)
    return <p className="font-bold text-center">No recipes found.</p>;

  return (
    <div ref={ref}  className="my-20  ">
      <h1 className="text-4xl font-bold text-center">Random Recipe List</h1>
      <p className="text-bold text-zinc-600 text-center">
        Here are some recipe you can look into
      </p>
      <main className="mx-20  mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
        {recipes.map((recipe: Recipe) => (
          <div
            key={recipe.idMeal}
            className="flex flex-col  border border-zinc-200 p-0   rounded hover:shadow-xl hover:cursor-pointer transition-all duration-300"
          >
            <Image
              width={600}
              height={100}
              className="object-cover  rounded mx-auto hover:scale-101 transition-transform duration-100"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{recipe.strMeal}</h3>
              <div className="flex flex-row gap-4 my-2 flex-wrap">
                <span className="bg-green-100 text-green-900 text-sm px-2 py-1 rounded-full">
                  category: {recipe.strCategory}
                </span>
                <span className="relative "> {recipe.strArea}</span>
              </div>
              <p className="text-sm text-gray-600 ">
                {recipe.strInstructions.slice(0, 100)}...
              </p>
              <div className="flex flex-row gap-10  flex-wrap justify-around m-4">
                <button
                  onClick={() => {
                    window.location.href = `/details/${recipe.idMeal}`;
                  }}
                  className="flex flex-row gap-2 mt-auto bg-indigo-600 text-white hover:cursor-pointer py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
                >
                  <span>
                    <Eye />
                  </span>
                  View Recipe
                </button>
                <button
                  onClick={() => {
                    window.location.href = `/details/${recipe.idMeal}`;
                  }}
                  className="group flex flex-row gap-2 mt-auto border hover:cursor-pointer py-2 px-4 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                >
                  <span>
                    <Heart className="group-hover:fill-white" />
                  </span>
                  Add to Favourite
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          disabled={page === 0 || isLoading}
          className={`px-6 py-2 bg-indigo-600 text-white rounded-md ${
            page === 0 || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={isLoading || (data && data.length < recipesPerPage)}
          className={`px-6 py-2 bg-indigo-600 text-white rounded-md ${
            isLoading || (data && data.length < recipesPerPage)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default RecipeGrid;
