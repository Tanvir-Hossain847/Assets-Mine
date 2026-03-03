"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { label: "All Assets", value: "all" },
  { label: "Figma", value: "figma" },
  { label: "Unity", value: "unity" },
  { label: "3D Models", value: "3d" },
  { label: "UI Kits", value: "ui" },
];

export default function CategoryFilter() {
  return (
    <div className="flex justify-center py-8">
      <Tabs defaultValue="all" className="w-auto">
        <TabsList className="bg-muted/50 p-1 backdrop-blur-sm">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.value} 
              value={category.value}
              className="rounded-md px-6 py-2 transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
