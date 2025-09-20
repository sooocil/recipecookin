"use client";

import { getHeroImage } from "@/utils/actions/getHeroImage";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RefObject, useCallback, useEffect, useState } from "react";

interface HeroSectionProps {
  recipeGridRef: RefObject<HTMLDivElement | null>;
}

const HeroSection = ({ recipeGridRef }: HeroSectionProps) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHeroImage() {
      const response = await getHeroImage();
      setHeroImage(response);
    }
    fetchHeroImage();
  }, []);

  const handleScroll = useCallback(() => {
    if (recipeGridRef.current) {
      recipeGridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeGridRef]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      {heroImage && (
        <Image
          src={heroImage}
          alt="hero image of recipe cookin'"
          className="object-cover transition-opacity  duration-700 ease-in-out opacity-0"
          onLoadingComplete={(img) => {
            img.classList.remove("opacity-0");
          }}
          fill
          priority
        />
      )}
      {!heroImage && <div className="absolute inset-0  animate-pulse"></div>}

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-zinc-900/90 backdrop-blur-sm bg-opacity-30 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          <span className="text-indigo-600">Recipe</span>Cookin&apos;
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-center max-w-2xl">
          Discover your next dish with our different recipes from around the
          world.
        </p>

        <div className="flex gap-4 md:gap-8 mt-6 flex-wrap justify-center">
          <button
            onClick={handleScroll}
            className="flex gap-2 items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
          <Link href="/addrecipe">
            <button className="border-2 border-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-200 hover:text-black transition-all duration-200">
              Add Yours
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
