"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllRecipes } from "@/utils/actions/getAllRecipes";
import { Recipe } from "@/types/Types";
import { Search } from "lucide-react";

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const allRecipes = await getAllRecipes(50);
        const filtered = allRecipes.filter((r) =>
          r.strMeal.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setIsOpen(filtered.length > 0);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-96">
      <div className="flex items-center gap-2 border px-2 py-1 rounded-md shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="w-full rounded-md border-gray-300 placeholder:text-black px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <span
          className="hover:cursor-pointer bg-indigo-600 p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Search className="h-5 w-5 text-white hover:fill-indigo-600" />
        </span>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50 max-h-60 overflow-auto">
          {results.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-3"
              onClick={() => {
                router.push(`/details/${recipe.idMeal}`);
                setIsOpen(false);
              }}
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
              />

              <div className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {recipe.strMeal}
                </span>
                <span className="text-gray-500 text-sm">
                  {recipe.strCategory}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && (
        <div className="absolute mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50 p-3 text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
}
