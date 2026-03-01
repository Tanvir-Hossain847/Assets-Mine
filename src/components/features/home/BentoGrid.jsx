"use client";

import { motion } from "motion/react";
import AssetCard from "@/components/features/assets/AssetCard";

const dummyAssets = [
  { 
    id: 1, 
    title: "Modern SaaS UI Kit", 
    price: 49, 
    category: "Figma", 
    platform: "figma", 
    rating: 4.9,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
  },
  { 
    id: 2, 
    title: "3D Abstract Shapes", 
    price: 29, 
    category: "3D Models", 
    platform: "3d", 
    rating: 4.8,
    image: "https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg"
  },
  { 
    id: 3, 
    title: "Fantasy RPG Icons", 
    price: 19, 
    category: "Unity", 
    platform: "unity", 
    rating: 4.7,
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg"
  },
  { 
    id: 4, 
    title: "E-commerce Mobile App", 
    price: 59, 
    category: "Figma", 
    platform: "figma", 
    rating: 4.9,
    image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg"
  },
  { 
    id: 5, 
    title: "Cyberpunk Environment", 
    price: 89, 
    category: "Unity", 
    platform: "unity", 
    rating: 5.0,
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
  },
  { 
    id: 6, 
    title: "Minimalist Portfolio", 
    price: 35, 
    category: "Figma", 
    platform: "figma", 
    rating: 4.6,
    image: "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg"
  },
];

export default function BentoGrid() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dummyAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <AssetCard asset={asset} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
