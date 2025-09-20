"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import { Recipe } from "@/types/Types";

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (idMeal: string) => void;
}

const RecipeCard = ({ recipe, onDelete }: RecipeCardProps) => {
  const router = useRouter();

  return (
    <div className="h-fit flex flex-col border border-gray-300 rounded-lg bg-white hover:shadow-2xl transition-all duration-300">
      <Image
        width={500}
        height={400}
        className="object-cover rounded-lg h-50 w-full hover:scale-101 transition-transform duration-200"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        placeholder="blur"
        blurDataURL="/placeholder-image.jpg"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
          {recipe.strMeal}
        </h2>
        <div className="flex flex-row gap-3 mb-3 flex-wrap">
          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {recipe.strCategory}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {recipe.strArea}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {recipe.strInstructions}
        </p>
        <div className="flex flex-row gap-3 flex-wrap justify-between mt-auto">
          <button
            onClick={() => router.push(`/details/${recipe.idMeal}`)}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
            aria-label={`View details for ${recipe.strMeal}`}
          >
            <Eye size={16} />
            View Recipe
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${recipe.strMeal}?`
                )
              ) {
                onDelete(recipe.idMeal);
              }
            }}
            className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            aria-label={`Delete ${recipe.strMeal} from favorites`}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
