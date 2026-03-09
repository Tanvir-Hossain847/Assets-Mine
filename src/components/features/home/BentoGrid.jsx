"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AssetCard from "@/components/features/assets/AssetCard";
import { assetAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BentoGrid({ limit = 6, showViewAll = true }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching assets from API...");
      const data = await assetAPI.getAll();
      console.log("Assets received:", data);
      console.log("Assets type:", typeof data);
      console.log("Assets is array:", Array.isArray(data));
      console.log("Assets length:", data?.length);
      
      // Handle if data is wrapped in a response object
      const assetsArray = Array.isArray(data) ? data : (data?.assets || data?.data || []);
      console.log("Final assets array:", assetsArray);
      
      setAssets(assetsArray);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
        <div className="text-center py-12 max-w-2xl mx-auto">
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive font-semibold mb-2">Error loading assets</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <p>Make sure your backend server is running on:</p>
            <code className="block bg-muted p-2 rounded">http://localhost:4000</code>
            <p className="mt-2">Expected endpoint:</p>
            <code className="block bg-muted p-2 rounded">GET /assets</code>
          </div>
          <button 
            onClick={fetchAssets}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const displayAssets = limit ? assets.slice(0, limit) : assets;
  
  console.log("Rendering BentoGrid:", {
    totalAssets: assets.length,
    displayAssets: displayAssets.length,
    limit,
    showViewAll,
    firstAsset: displayAssets[0]
  });

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayAssets.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No assets available
          </div>
        ) : (
          displayAssets.map((asset, index) => {
            console.log(`Rendering asset ${index}:`, asset);
            return <AssetCard key={asset._id || asset.id || index} asset={asset} />;
          })
        )}
      </div>

      {showViewAll && assets.length > limit && (
        <div className="mt-12 text-center">
          <Link href="/product">
            <Button size="lg" className="rounded-full transition-all duration-200 active:scale-95">
              View All Assets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
