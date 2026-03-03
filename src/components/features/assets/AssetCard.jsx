"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Figma, Gamepad2, Box, Layout } from "lucide-react";

const PlatformIcon = ({ type }) => {
  switch (type) {
    case "figma": return <Figma className="h-3.5 w-3.5" />;
    case "unity": return <Gamepad2 className="h-3.5 w-3.5" />;
    case "3d": return <Box className="h-3.5 w-3.5" />;
    default: return <Layout className="h-3.5 w-3.5" />;
  }
};

export default function AssetCard({ asset }) {
  return (
    <div className="transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]">
      <Card className="group overflow-hidden border-border/50 bg-card/50 transition-all duration-200 hover:border-primary/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
             {/* Asset Image */}
            {asset.image ? (
              <Image 
                src={asset.image} 
                alt={asset.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 opacity-60" />
            )}
            
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            
            <div className="absolute right-3 top-3 z-10">
              <Badge variant="secondary" className="glass py-1 backdrop-blur-md">
                ${asset.price}
              </Badge>
            </div>

            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
               <div className="rounded-full bg-background/80 p-1.5 text-primary backdrop-blur-md">
                  <PlatformIcon type={asset.platform} />
               </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1 p-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="font-semibold tracking-tight">{asset.title}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span>{asset.rating}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{asset.category}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
