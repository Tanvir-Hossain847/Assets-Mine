"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { assetAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Download, 
  Lock, 
  Star, 
  ShoppingCart, 
  Check,
  Figma,
  Gamepad2,
  Box,
  Layout
} from "lucide-react";

const PlatformIcon = ({ type }) => {
  switch (type) {
    case "figma": return <Figma className="h-5 w-5" />;
    case "unity": return <Gamepad2 className="h-5 w-5" />;
    case "3d": return <Box className="h-5 w-5" />;
    default: return <Layout className="h-5 w-5" />;
  }
};

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchAsset();
      if (user) {
        checkPurchaseStatus();
      }
    }
  }, [params.slug, user]);

  const fetchAsset = async () => {
    try {
      setLoading(true);
      const data = await assetAPI.getById(params.slug);
      setAsset(data);
    } catch (error) {
      console.error("Error fetching asset:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkPurchaseStatus = async () => {
    try {
      setCheckingPurchase(true);
      const result = await assetAPI.checkPurchase(params.slug);
      setIsPurchased(result.purchased);
    } catch (error) {
      console.error("Error checking purchase:", error);
      setIsPurchased(false);
    } finally {
      setCheckingPurchase(false);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!isPurchased) {
      alert("Please purchase this asset first");
      return;
    }

    try {
      setDownloading(true);
      const result = await assetAPI.download(params.slug);
      
      if (result.downloadUrl) {
        window.location.href = result.downloadUrl;
      }
    } catch (error) {
      console.error("Error downloading asset:", error);
      alert("Failed to download asset: " + error.message);
    } finally {
      setDownloading(false);
    }
  };

  const handlePurchase = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/checkout/${params.slug}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Asset not found</h1>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto w-11/12 max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Image */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-card/30">
              {asset.image ? (
                <Image
                  src={asset.image}
                  alt={asset.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30" />
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <PlatformIcon type={asset.platform} />
                  {asset.category}
                </Badge>
                {isPurchased && (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    <Check className="mr-1 h-3 w-3" />
                    Purchased
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {asset.title}
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{asset.rating || "4.8"}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{asset.sales || 0} sales</span>
              </div>
            </div>

            {/* Price */}
            <div className="rounded-2xl border border-border/50 bg-card/30 p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${asset.price}</span>
                <span className="text-muted-foreground">one-time payment</span>
              </div>
            </div>

            {/* Download/Purchase Button */}
            <div className="space-y-3">
              {isPurchased ? (
                <Button
                  size="lg"
                  className="w-full rounded-full text-lg font-bold transition-all duration-200 active:scale-95"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Now
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full rounded-full text-lg font-bold transition-all duration-200 active:scale-95"
                  onClick={handlePurchase}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Purchase Now
                </Button>
              )}
              
              {!isPurchased && user && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                  <Lock className="h-4 w-4" />
                  <span>Download available after purchase</span>
                </div>
              )}
            </div>

            {/* Description */}
            <Card className="border-border/50 bg-card/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {asset.description || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="border-border/50 bg-card/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Platform</span>
                    <div className="flex items-center gap-2">
                      <PlatformIcon type={asset.platform} />
                      <span className="font-medium capitalize">{asset.platform}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{asset.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="secondary" className="capitalize">
                      {asset.status || "active"}
                    </Badge>
                  </div>
                  {asset.createdAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Published</span>
                      <span className="font-medium">
                        {new Date(asset.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
