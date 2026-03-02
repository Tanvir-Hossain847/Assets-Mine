"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border bg-card/30 p-8 text-center backdrop-blur-sm sm:p-16 lg:p-24"
      >
        {/* Decorative Circles */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
             <Zap className="h-6 w-6" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-3xl">
            Start Building Your <span className="text-gradient">Next Big Thing</span> Today
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Join thousands of developers and designers already accelerating their workflow with AssetsMine premium digital goods.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-14 rounded-full px-8 text-lg font-bold shadow-md active:scale-95 transition-all">
              <Link href="/" className="flex items-center">
                 Explore the Marketplace
                 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-lg font-bold border-primary/20 hover:bg-primary/10 active:scale-95 transition-all">
              Sell Your Assets
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
