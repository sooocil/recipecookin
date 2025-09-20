"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormData } from "@/types/Types";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { useMyRecipeStore } from "@/store/myRecipeStore";

export default function RecipeForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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


  

  const { addRecipe } = useMyRecipeStore();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<RecipeFormData> = (data) => {
    addRecipe(data);
    toast.success("Recipe added successfully!");
    reset(); 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col my-30 space-y-4 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
    >
      <div>
        <input
          {...register("strMeal")}
          placeholder="Recipe Name (e.g., Chocolate Cake)"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.strMeal && (
          <p className="text-red-500 text-sm mt-1">{errors.strMeal.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strCategory")}
          placeholder="Category (e.g., Dessert)"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.strCategory && (
          <p className="text-red-500 text-sm mt-1">{errors.strCategory.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strArea")}
          placeholder="Area (e.g., Italian)"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.strArea && (
          <p className="text-red-500 text-sm mt-1">{errors.strArea.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("strInstructions")}
          placeholder="Instructions (e.g., Mix ingredients, bake at 350°F...)"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
        {errors.strInstructions && (
          <p className="text-red-500 text-sm mt-1">{errors.strInstructions.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strMealThumb")}
          placeholder="Image URL (optional, e.g., https://example.com/image.jpg)"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.strMealThumb && (
          <p className="text-red-500 text-sm mt-1">{errors.strMealThumb.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("strYoutube")}
          placeholder="YouTube Link (optional, e.g., https://youtube.com/watch?v=...)"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.strYoutube && (
          <p className="text-red-500 text-sm mt-1">{errors.strYoutube.message}</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-gray-800">Ingredients</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-3 items-center">
            <div className="flex-1">
              <input
                {...register(`ingredients.${index}.ingredient`)}
                placeholder="Ingredient (e.g., Flour)"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.ingredients?.[index]?.ingredient && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients[index].ingredient.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                {...register(`ingredients.${index}.measure`)}
                placeholder="Measure (e.g., 2 cups)"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.ingredients?.[index]?.measure && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients[index].measure.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ ingredient: "", measure: "" })}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Ingredient
        </button>
        {errors.ingredients && !errors.ingredients[0] && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Add Recipe
      </button>
    </form>
  );
}