"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[3rem] bg-primary p-12 text-center text-primary-foreground sm:p-20 lg:p-32"
      >
        {/* Decorative Circles */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
             <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-3xl">
            Start Building Your Next Big Thing Today
          </h2>
          <p className="mt-6 max-w-xl text-lg opacity-90 sm:text-xl leading-relaxed">
            Join thousands of developers and designers already accelerating their workflow with AssetsMine premium digital goods.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-14 rounded-full px-8 text-lg font-bold shadow-2xl active:scale-95 transition-all">
              <Link href="/" className="flex items-center">
                 Explore the Marketplace
                 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="h-14 rounded-full px-8 text-lg font-bold text-white hover:bg-white/10 active:scale-95 transition-all">
              Sell Your Assets
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
