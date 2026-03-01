"use client";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="container mx-auto px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border bg-card/30 p-8 text-center backdrop-blur-sm sm:p-16 lg:p-24"
      >
        {/* Decorative Background */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail className="h-6  w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join the <span className="text-gradient">Waitlist</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Get notified when we launch new premium assets and exclusive creator bundles. No spam, just pure value.
          </p>
          
          <form className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="h-11 rounded-full bg-background/50 focus-visible:ring-primary/30"
              required
            />
            <Button size="lg" className="h-11 rounded-full px-8 shadow-md transition-all active:scale-95">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
