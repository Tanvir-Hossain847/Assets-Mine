"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Download, Library } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 py-12 text-center sm:px-6">
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.6 
        }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CheckCircle2 className="h-16 w-16" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Purchase <span className="text-gradient">Successful!</span>
        </h1>
        <p className="mx-auto max-w-md text-lg text-muted-foreground">
          Thank you for your order. Your premium assets are now available in your personal library for immediate download.
        </p>
      </motion.div>

      {/* Order Summary Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-12 w-full max-w-md overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4 text-left">
           <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm font-medium text-muted-foreground">Order ID</span>
              <span className="text-sm font-mono font-bold">#AM-9428-SX</span>
           </div>
           <div className="space-y-3">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted/50" />
                    <span className="text-sm font-semibold">Modern SaaS UI Kit</span>
                 </div>
                 <span className="text-sm font-bold">$49.00</span>
              </div>
           </div>
           <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-primary">$49.00</span>
           </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20 active:scale-95">
          <Link href="/library">
            Go to My Library
            <Library className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full active:scale-95">
          <Link href="/">
             Continue Shopping
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
