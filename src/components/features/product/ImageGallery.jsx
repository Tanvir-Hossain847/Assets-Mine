"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Fallback if no images
  const displayImages = images.length > 0 ? images : [
    { src: "/placeholder-1.jpg", alt: "Preview 1" },
    { src: "/placeholder-2.jpg", alt: "Preview 2" },
    { src: "/placeholder-3.jpg", alt: "Preview 3" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-3xl border bg-muted/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full w-full items-center justify-center p-12 text-muted-foreground/20"
          >
            {/* Visual Placeholder for Image */}
            <div className="h-24 w-24 rounded-full border-4 border-dashed" />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button 
            onClick={() => setActiveIdx((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))}
            className="rounded-full bg-background/50 p-2 backdrop-blur-md transition-all hover:bg-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setActiveIdx((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))}
            className="rounded-full bg-background/50 p-2 backdrop-blur-md transition-all hover:bg-background"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative aspect-video w-32 overflow-hidden rounded-xl border-2 transition-all ${
              activeIdx === idx ? "border-primary shadow-lg shadow-primary/10" : "border-border/50 opacity-60 hover:opacity-100"
            }`}
          >
             <div className="flex h-full w-full items-center justify-center bg-muted/20 text-[10px] text-muted-foreground/30">
               Thumbnail {idx + 1}
             </div>
          </button>
        ))}
      </div>
    </div>
  );
}
