"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/Components/HomeSections/HeroSection";
import RecipeGrid from "@/Components/HomeSections/RecipeGrid";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;


  return (
    <div className="inset-0 w-full h-screen ">
      <HeroSection />
      <RecipeGrid  />

    </div>
  );
}
