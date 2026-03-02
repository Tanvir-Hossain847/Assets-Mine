"use client";

import Hero from "@/components/features/home/Hero";
import CategoryFilter from "@/components/features/home/CategoryFilter";
import BentoGrid from "@/components/features/home/BentoGrid";
import Newsletter from "@/components/features/home/Newsletter";
import CategorySearch from "@/components/features/home/CategorySearch";
import Reviews from "@/components/features/home/Reviews";
import LegalSection from "@/components/features/home/LegalSection";
import CallToAction from "@/components/features/home/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Hero />
      <div className="mx-auto w-11/12 space-y-12">
        <CategoryFilter />
        <BentoGrid />
        <CategorySearch />
        <Reviews />
        <LegalSection />
        <Newsletter />
      </div>
      <div className="mx-auto w-11/12">
        <CallToAction />
      </div>
    </div>
  );
}
