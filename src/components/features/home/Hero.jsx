"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[700px] items-center justify-center overflow-hidden py-20 lg:pb-32">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg"
          alt="Premium Digital Assets Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border bg-background/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-foreground">New Assets Every Week</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl"
        >
          Build Faster with <br />
          <span className="text-gradient">Premium Digital Assets</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl drop-shadow-md"
        >
          Discover high-quality UI kits, 3D models, and Unity assets curated by experts. 
          Everything you need to launch your next big project.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="mt-10 flex flex-wrap items-center justify-center gap-4"
         >
           <Button size="lg" className="rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-all hover:bg-primary/90 active:scale-95">
             Explore All Assets
             <ArrowRight className="ml-2 h-4 w-4" />
           </Button>
           <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95">
             Sell Your Assets
           </Button>
         </motion.div>
      </div>
    </section>
  );
}
