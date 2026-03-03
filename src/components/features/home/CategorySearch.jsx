"use client";

import { 
  Figma, 
  Gamepad2, 
  Box, 
  Layout, 
  Code, 
  Palette 
} from "lucide-react";
import Link from "next/link";

const categories = [
  { 
    name: "Figma UI Kits", 
    desc: "Premium dashboards and mobile components.", 
    icon: Figma, 
    count: "450+", 
    color: "bg-primary/10 text-primary" 
  },
  { 
    name: "Unity Assets", 
    desc: "3D environments & game logic scripts.", 
    icon: Gamepad2, 
    count: "280+", 
    color: "bg-primary/10 text-primary" 
  },
  { 
    name: "3D Models", 
    desc: "High-poly characters and low-poly items.", 
    icon: Box, 
    count: "1.2k+", 
    color: "bg-primary/10 text-primary" 
  },
  { 
    name: "Web Templates", 
    desc: "Modern landing pages and dashboard kits.", 
    icon: Layout, 
    count: "150+", 
    color: "bg-primary/10 text-primary" 
  },
];

export default function CategorySearch() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:py-20 border-t border-border/50 mt-12">
      <div className="mb-12 text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
        <p className="mt-2 text-muted-foreground">Find the perfect asset for your next creative project.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group relative overflow-hidden rounded-3xl border bg-card/30 p-8 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/20 hover:bg-card"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${cat.color} group-hover:scale-110 transition-transform duration-200`}>
              <cat.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{cat.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
            
            <div className="mt-6 flex items-center justify-between">
               <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{cat.count} items</span>
               <Link href={`/category/${cat.name.toLowerCase().replace(/ /g, '-')}`} className="text-primary group-hover:translate-x-1 transition-transform duration-200">
                  <span className="sr-only">Browse</span>
                  <Code className="h-4 w-4" />
               </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
