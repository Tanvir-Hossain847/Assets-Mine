"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import OwnedAssetCard from "@/components/features/library/OwnedAssetCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { orderAPI } from "@/lib/api";

export default function LibraryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [ownedAssets, setOwnedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchOwnedAssets();
  }, [user, router]);

  const fetchOwnedAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      const orders = await orderAPI.getUserOrders();
      console.log("User orders:", orders);
      
      // Extract assets from orders
      const assets = orders.map(order => order.asset).filter(Boolean);
      setOwnedAssets(assets);
    } catch (error) {
      console.error("Error fetching owned assets:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = ownedAssets.filter(asset => {
    const title = asset.title || asset.name || "";
    const category = asset.category || asset.language || "";
    const searchLower = searchQuery.toLowerCase();
    return title.toLowerCase().includes(searchLower) || 
           category.toLowerCase().includes(searchLower);
  });

  const hasAssets = ownedAssets.length > 0;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-12 opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-8 border-b">
         <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">Your Library</h1>
            <p className="text-muted-foreground">
               Welcome back{user?.displayName ? `, ${user.displayName}` : ""}. You own {ownedAssets.length} {ownedAssets.length === 1 ? "asset" : "assets"}.
            </p>
         </div>
         {hasAssets && (
            <div className="flex items-center gap-2">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search library..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full rounded-full border bg-muted/30 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-64 transition-all duration-200"
                  />
               </div>
            </div>
         )}
      </header>

      <main className="py-12">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
            <p className="text-destructive font-semibold mb-2">Error loading library</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button 
              onClick={fetchOwnedAssets}
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        )}

        {hasAssets ? (
          <>
            {filteredAssets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAssets.map((asset, index) => (
                  <div
                    key={asset._id || asset.id || index}
                    className="opacity-0 translate-y-5 animate-[fadeInUp_0.4s_ease-out_forwards]"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <OwnedAssetCard asset={asset} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No assets found matching &quot;{searchQuery}&quot;</p>
                <Button 
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="mb-6 rounded-full bg-muted/30 p-8">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/20" />
             </div>
             <h2 className="text-xl font-bold">Your library is empty</h2>
             <p className="mt-2 text-muted-foreground max-w-sm">
                You haven&apos;t purchased any assets yet. Explore our marketplace to find premium digital assets for your projects.
             </p>
             <Button asChild className="mt-8 rounded-full px-8 transition-all duration-200 active:scale-95">
                <Link href="/product">Browse Assets</Link>
             </Button>
          </div>
        )}
      </main>
    </div>
  );
}
