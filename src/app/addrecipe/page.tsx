"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields, recipeSchema } from "@/types/Types";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-10 flex justify-center items-center bg-indigo-100 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <label className="text-sm font-bold">Recipe Image</label>
        <input
          {...register("strMealThumb")}
          type="file"
          className="bg-white p-2 rounded-xl"
        />
        {errors.strMealThumb && (
          <p className="text-red-500 text-sm">{errors.strMealThumb.message}</p>
        )}

        <input
          {...register("strMeal")}
          type="text"
          placeholder="Recipe Name"
          className="bg-white p-2 rounded-xl"
        />
        {errors.strMeal && (
          <p className="text-red-500 text-sm">{errors.strMeal.message}</p>
        )}

        <input
          {...register("ingredients")}
          type="text"
          placeholder="Ingredients"
          className="bg-white p-2 rounded-xl"
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
        )}

        <input
          {...register("strInstructions")}
          type="text"
          placeholder="Instructions"
          className="bg-white p-2 rounded-xl"
        />
        {errors.strInstructions && (
          <p className="text-red-500 text-sm">{errors.strInstructions.message}</p>
        )}

        <select
          {...register("strCategory")}
          className="bg-white p-2 rounded-xl"
        >
          <option value="">Select Category</option>
          <option value="beef">Beef</option>
          <option value="chicken">Chicken</option>
          <option value="dessert">Dessert</option>
          <option value="lamb">Lamb</option>
        </select>
        {errors.strCategory && (
          <p className="text-red-500 text-sm">{errors.strCategory.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default Page;
