"use client";

import Hero from "@/components/features/home/Hero";
import CategoryFilter from "@/components/features/home/CategoryFilter";
import BentoGrid from "@/components/features/home/BentoGrid";
import Newsletter from "@/components/features/home/Newsletter";
import CategorySearch from "@/components/features/home/CategorySearch";
import Reviews from "@/components/features/home/Reviews";
import CallToAction from "@/components/features/home/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />
      <div className="mx-auto w-11/12 space-y-24">
        <CategoryFilter />
        <BentoGrid />
        <CategorySearch />
        <Reviews />
        <Newsletter />
      </div>
      <div className="mx-auto w-11/12">
        <CallToAction />
      </div>
    </div>
  );
}
