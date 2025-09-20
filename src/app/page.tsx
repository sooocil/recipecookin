"use client";

import { useEffect  , useRef, useState } from "react";

import HeroSection from "@/Components/HomeSections/HeroSection";
import RecipeGrid from "@/Components/HomeSections/RecipeGrid";
import HomeFooter from "@/Components/HomeSections/footer";
import MyRecipepage from "./myrecipes/page";

export default function Home() {
  const recipeGridRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;


  return (
    <div className="inset-0 w-full h-screen ">
      <HeroSection recipeGridRef={recipeGridRef} />
      <RecipeGrid ref={recipeGridRef} />
      <MyRecipepage />
      <HomeFooter />
    </div>
  );
}
