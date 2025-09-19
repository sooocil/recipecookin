"use client";
import RecipeCard from "@/Components/recipe-card";
import React from "react";

const page = () => {
  return (
    <div className="m-20">
      <div className="space-y-2 mx-22">
        <h1 className="text-2xl font-bold">My Recipes</h1>
        <p className="text-sm text-zinc-600">
          List of my recipes will be displayed here.
        </p>
        <div className="mt-10 bg-zinc-200 shadow-inner  w-full min-h-[700px] rounded-lg flex items-center justify-center">
          
        </div>
      </div>
    </div>
  );
};

export default page;
