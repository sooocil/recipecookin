"use client";
import MyRecipeCard from "@/Components/my-recipe-card";
import { useMyRecipeStore } from "@/store/myRecipeStore";
import React from "react";

const MyRecipepage = () => {
  const { myRecipes, removeRecipe } = useMyRecipeStore();

  return (
    <div className="m-20">
      <div className="space-y-2 mx-22">
        <h1 className="text-2xl font-bold">My Recipes</h1>
        <p className="text-sm text-zinc-600">
          List of my recipes will be displayed here.
        </p>
        <div className="mt-10 p-4 bg-zinc-200 shadow-inner  w-full min-h-[700px] rounded-lg flex  ">
          {myRecipes.length === 0 ? (
            <div className="m-auto text-gray-500">No recipes added yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {myRecipes.map((recipe) => (
                <MyRecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onDelete={() => removeRecipe(recipe.idMeal)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRecipepage;
