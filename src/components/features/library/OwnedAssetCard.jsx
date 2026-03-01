"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink } from "lucide-react";

export default function OwnedAssetCard({ asset }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className="group"
    >
      <Card className="overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:bg-card">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted/20">
             {/* Simple visual indicator for the asset */}
             <div className="flex h-full w-full items-center justify-center p-8 text-primary/10 transition-transform group-hover:scale-110">
                <FileText className="h-20 w-20" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
             <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="rounded-md bg-background/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                   {asset.category}
                </span>
             </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="space-y-0.5">
            <h3 className="font-semibold text-sm truncate max-w-[150px]">{asset.title}</h3>
            <p className="text-xs text-muted-foreground">Version {asset.version}</p>
          </div>
          <Button size="sm" className="rounded-full shadow-lg shadow-primary/10 active:scale-95">
             <Download className="mr-2 h-3.5 w-3.5" />
             Download
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
