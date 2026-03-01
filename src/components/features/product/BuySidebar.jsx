"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ShieldCheck, Zap, Globe } from "lucide-react";

export default function BuySidebar({ asset }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${asset?.price || "49"}</span>
            <span className="text-sm text-muted-foreground line-through">$79</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
             <Button className="w-full rounded-full py-6 text-base font-semibold shadow-lg shadow-primary/20 active:scale-95" size="lg">
                Add to Cart
             </Button>
             <Button variant="outline" className="w-full rounded-full py-6 active:scale-95" size="lg">
                Buy Now
             </Button>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Instant Download</p>
                <p className="text-xs text-muted-foreground">Access your files immediately</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Commercial License</p>
                <p className="text-xs text-muted-foreground">Use in personal & client projects</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Free Updates</p>
                <p className="text-xs text-muted-foreground">Lifetime access to version 1.2+</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 py-4">
           <p className="w-full text-center text-xs text-muted-foreground">
              Secure payment processed by Stripe
           </p>
        </CardFooter>
      </Card>
    </aside>
  );
}
