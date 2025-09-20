"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormData } from "@/types/Types";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { useMyRecipeStore } from "@/store/myRecipeStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateRecipeForm() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const id = Array.isArray(params?.recipeId) ? params.recipeId[0] : params?.recipeId;
  
  const { myRecipes, updateRecipe, hasHydrated } = useMyRecipeStore();
  const recipe = myRecipes.find((r) => r.idMeal === id);

  useEffect(() => {
    console.log("Params:", params);
    console.log("Params ID:", id);
    console.log("MyRecipes:", myRecipes);
    console.log("Found recipe:", recipe);
    console.log("Has hydrated:", hasHydrated);
  }, [id, myRecipes, recipe, hasHydrated, params]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      strMeal: "",
      strCategory: "",
      strArea: "",
      strInstructions: "",
      strMealThumb: "",
      strYoutube: "",
      ingredients: [{ ingredient: "", measure: "" }],
    },
  });

  useEffect(() => {
    if (hasHydrated) {
      setIsLoading(false);
    }
  }, [hasHydrated]);

  useEffect(() => {
    if (recipe && hasHydrated && !isLoading) {
      console.log("Pre-filling form with recipe:", recipe);
      reset({
        strMeal: recipe.strMeal || "",
        strCategory: recipe.strCategory || "",
        strArea: recipe.strArea || "",
        strInstructions: recipe.strInstructions || "",
        strMealThumb: recipe.strMealThumb || "",
        strYoutube: recipe.strYoutube || "",
        ingredients: recipe.ingredients?.length 
          ? recipe.ingredients 
          : [{ ingredient: "", measure: "" }],
      });
    }
  }, [recipe, reset, hasHydrated, isLoading]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<RecipeFormData> = async (formData) => {
    if (!id) {
      toast.error("Invalid recipe ID");
      return;
    }
    
    console.log("Submitting update for ID:", id, "Data:", formData);
    const success = updateRecipe(id, formData);
    
    if (success) {
      toast.success("Recipe updated successfully!");
    } else {
      toast.error("Failed to update recipe. It may not exist.");
    }
  };

  if (isLoading || !hasHydrated) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading your recipes...</p>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">
          No recipe ID provided in the URL.
        </p>
        <p className="text-gray-600">
          Current params: {JSON.stringify(params)}
        </p>
        <a 
          href="/myrecipes" 
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go back to your recipes
        </a>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">
          Recipe not found in local storage (ID: {id}).
        </p>
        <p className="text-gray-600 mb-4">
          Available recipes: {myRecipes.length > 0 
            ? myRecipes.map(r => r.idMeal).join(", ") 
            : "None"}
        </p>
        <a 
          href="/myrecipes" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go back to your recipes
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Edit Recipe: {recipe.strMeal}
      </h2>

      <div>
        <input
          {...register("strMeal")}
          placeholder="Recipe Name"
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        {errors.strMeal && (
          <p className="text-red-500 text-sm mt-1">{errors.strMeal.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strCategory")}
          placeholder="Category"
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        {errors.strCategory && (
          <p className="text-red-500 text-sm mt-1">{errors.strCategory.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strArea")}
          placeholder="Area"
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        {errors.strArea && (
          <p className="text-red-500 text-sm mt-1">{errors.strArea.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("strInstructions")}
          placeholder="Instructions..."
          className="w-full p-3 rounded-lg border border-gray-300 min-h-[100px] focus:border-blue-500 focus:outline-none resize-vertical"
        />
        {errors.strInstructions && (
          <p className="text-red-500 text-sm mt-1">{errors.strInstructions.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strMealThumb")}
          placeholder="Image URL"
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        {errors.strMealThumb && (
          <p className="text-red-500 text-sm mt-1">{errors.strMealThumb.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strYoutube")}
          placeholder="YouTube Link"
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        {errors.strYoutube && (
          <p className="text-red-500 text-sm mt-1">{errors.strYoutube.message}</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-gray-800">Ingredients</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-3 items-end">
            <div className="flex-1">
              <input
                {...register(`ingredients.${index}.ingredient` as const)}
                placeholder="Ingredient"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
              {errors.ingredients?.[index]?.ingredient && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients[index]?.ingredient?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                {...register(`ingredients.${index}.measure` as const)}
                placeholder="Measure"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
              {errors.ingredients?.[index]?.measure && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients[index]?.measure?.message}
                </p>
              )}
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ ingredient: "", measure: "" })}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Ingredient
        </button>
        {errors.ingredients && !Array.isArray(errors.ingredients) && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients.message}</p>
        )}
      </div>

      <button
        type="submit" 
        disabled={isSubmitting}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Updating..." : "Update Recipe"}
      </button>
    </form>
  );
}
