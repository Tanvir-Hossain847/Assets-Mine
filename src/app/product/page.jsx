"use client";

import CategoryFilter from "@/components/features/home/CategoryFilter";
import BentoGrid from "@/components/features/home/BentoGrid";

export default function ProductPage() {
  return (
    <div className="flex flex-col gap-12 pb-24 pt-12">
      <div className="mx-auto w-11/12 text-center lg:text-left">
        <div className="opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gradient mb-6">
            All Products
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
            Explore our entire collection of premium digital assets. Find the perfect fit for your next project.
          </p>
        </div>
      </div>
      
      <div className="mx-auto w-11/12 space-y-12">
        <CategoryFilter />
        <BentoGrid limit={null} showViewAll={false} />
      </div>
    </div>
  );
}
