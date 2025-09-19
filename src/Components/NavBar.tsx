"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  

  const searchItem = () => {
    console.log("searching...");
  }

  return (
    <nav className="flex flex-wrap shadow-md w-full  px-40 justify-between items-center p-4  ">
      <h1 onClick={()=>{window.location.href = "/"}} className="hover:cursor-pointer  text-bold text-2xl">
        <span className="text-indigo-600">Recipe</span>Cookin&apos;
      </h1>

      <div className="flex ml-20 gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="Search recipes..."
          className="border  border-gray-300 rounded-md p-2 active:outline-none focus:outline-none"
        />
        <span onClick={searchItem} className="border bg-indigo-600 p-2 rounded-md text-white hover:cursor-pointer hover:bg-indigo-700 transition-all duration-200">
          <Search />
        </span>
      </div>

      <div className="flex gap-6 justify-center items-center">
        <Link
          href="/recipes"
          className=" text-lg  hover:underline hover:text-indigo-600 transition-all duration-200 "
        >
          All Recipes
        </Link>
        <Link
          href="/myrecipes"
          className=" text-lg  hover:underline hover:text-indigo-600 transition-all duration-200 "
        >
          My Recipes
        </Link>
        <Link
          href="/addrecipe"
          className=" text-lg rounded-sm bg-indigo-600 px-4 py-2 hover:bg-indigo-700 text-white transition-all duration-200 "
        >
          Add Recipe
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
