"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink } from "lucide-react";
import { assetAPI } from "@/lib/api";

export default function OwnedAssetCard({ asset }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setDownloading(true);
      const assetId = asset._id || asset.id;
      const result = await assetAPI.download(assetId);
      
      if (result.downloadUrl) {
        window.location.href = result.downloadUrl;
      } else {
        alert("Download URL not available");
      }
    } catch (error) {
      console.error("Error downloading asset:", error);
      alert("Failed to download: " + error.message);
    } finally {
      setDownloading(false);
    }
  };

  // Map backend fields
  const assetId = asset._id || asset.id;
  const title = asset.title || asset.name || "Untitled";
  const image = asset.image || asset.picture;
  const category = asset.category || asset.language || "Asset";
  const version = asset.version || "1.0.0";

  return (
    <Link href={`/asset/${assetId}`}>
      <div className="group transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98]">
        <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-200 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5">
          <CardContent className="p-0">
            <div className="relative aspect-video overflow-hidden bg-muted/20">
               {image ? (
                 <Image
                   src={image}
                   alt={title}
                   fill
                   className="object-cover transition-transform duration-300 group-hover:scale-110"
                   unoptimized
                 />
               ) : (
                 <div className="flex h-full w-full items-center justify-center p-8 text-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <FileText className="h-20 w-20" />
                 </div>
               )}
               <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
               <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="rounded-md bg-background/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                     {category}
                  </span>
               </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4">
            <div className="space-y-0.5 flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{title}</h3>
              <p className="text-xs text-muted-foreground">Version {version}</p>
            </div>
            <Button 
              size="sm" 
              className="rounded-full shadow-lg shadow-primary/10 transition-all duration-200 active:scale-95 ml-2"
              onClick={handleDownload}
              disabled={downloading}
            >
               {downloading ? (
                 <>
                   <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                   ...
                 </>
               ) : (
                 <>
                   <Download className="mr-2 h-3.5 w-3.5" />
                   Download
                 </>
               )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
}
