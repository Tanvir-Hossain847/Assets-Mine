"use client";

import { motion } from "motion/react";
import OwnedAssetCard from "@/components/features/library/OwnedAssetCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search } from "lucide-react";
import Link from "next/link";

const ownedAssets = [
  { id: 1, title: "Modern SaaS UI Kit", category: "Figma", version: "1.2.0" },
  { id: 2, title: "3D Abstract Shapes", category: "3D Models", version: "2.1.0" },
  { id: 3, title: "Fantasy RPG Icons", category: "Unity", version: "1.0.4" },
];

export default function LibraryPage() {
  const hasAssets = ownedAssets.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 sm:px-6 lg:py-12"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-8 border-b">
         <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">Your Library</h1>
            <p className="text-muted-foreground">
               Welcome back, Tushar. You own {ownedAssets.length} assets.
            </p>
         </div>
         {hasAssets && (
            <div className="flex items-center gap-2">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search library..." 
                    className="h-10 w-full rounded-full border bg-muted/30 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-64"
                  />
               </div>
            </div>
         )}
      </header>

      <main className="py-12">
        {hasAssets ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ownedAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <OwnedAssetCard asset={asset} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="mb-6 rounded-full bg-muted/30 p-8">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/20" />
             </div>
             <h2 className="text-xl font-bold">Your library is empty</h2>
             <p className="mt-2 text-muted-foreground max-w-sm">
                You haven&apos;t purchased any assets yet. Explore our marketplace to find premium digital assets for your projects.
             </p>
             <Button asChild className="mt-8 rounded-full px-8">
                <Link href="/">Browse Assets</Link>
             </Button>
          </div>
        )}
      </main>
    </motion.div>
  );
}
