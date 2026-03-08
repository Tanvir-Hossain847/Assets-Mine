"use client";

import { useState, useEffect } from "react";
import AssetCard from "@/components/features/assets/AssetCard";
import { assetAPI } from "@/lib/api";

export default function BentoGrid() {
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
      setAssets(data);
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
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Error loading assets: {error}</p>
          <button 
            onClick={fetchAssets}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {assets.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No assets available
          </div>
        ) : (
          assets.map((asset) => (
            <AssetCard key={asset._id || asset.id} asset={asset} />
          ))
        )}
      </div>
    </section>
  );
}
