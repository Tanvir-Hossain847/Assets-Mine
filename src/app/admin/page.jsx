"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminSidebar from "@/components/layout/AdminSidebar";
import StatCard from "@/components/features/admin/StatCard";
import RevenueChart from "@/components/features/admin/RevenueChart";
import { 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart,
  Plus,
  MoreVertical,
  Filter,
  Download,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assetAPI, analyticsAPI } from "@/lib/api";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalSales: 0,
    totalAssets: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch assets and stats from backend
      const [assetsData, statsData] = await Promise.all([
        assetAPI.getAll(),
        analyticsAPI.getStats()
      ]);
      
      setAssets(assetsData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      try {
        await assetAPI.delete(assetId);
        fetchData();
      } catch (error) {
        console.error("Error deleting asset:", error);
        alert("Failed to delete asset: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requireAdmin={true}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="mx-auto w-11/12 px-4 py-8 sm:px-6">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-8">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your performance and manage assets.</p>
              </div>
              <Link href="/admin/products/new">
                <Button className="rounded-full shadow-lg shadow-primary/20 transition-all duration-200 active:scale-95">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload New Asset
                </Button>
              </Link>
            </header>

            {error && (
              <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                <p className="font-semibold">Error loading data</p>
                <p className="text-sm">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchData}
                  className="mt-2"
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Total Revenue" 
                value={`$${stats.totalRevenue?.toLocaleString() || 0}`} 
                trend="up" 
                trendValue="+12.5%" 
                icon={DollarSign} 
              />
              <StatCard 
                title="Active Users" 
                value={stats.totalUsers?.toString() || "0"} 
                trend="up" 
                trendValue="+5.2%" 
                icon={Users} 
              />
              <StatCard 
                title="Total Sales" 
                value={stats.totalSales?.toString() || "0"} 
                trend="up" 
                trendValue="+8.1%" 
                icon={ShoppingCart} 
              />
              <StatCard 
                title="Published Assets" 
                value={stats.totalAssets?.toString() || "0"} 
                trend="up" 
                trendValue="+2.4%" 
                icon={Package} 
              />
            </div>

            {/* Revenue Chart */}
            <div className="mt-12">
              <RevenueChart />
            </div>

            {/* Asset Management Table */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Assets</h2>
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm" className="rounded-full">
                      <Filter className="mr-2 h-3.5 w-3.5" />
                      Filter
                   </Button>
                   <Button variant="outline" size="sm" className="rounded-full">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Export
                   </Button>
                </div>
              </div>
              
              <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden text-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[300px]">Asset Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No assets found. Create your first asset!
                        </TableCell>
                      </TableRow>
                    ) : (
                      assets.map((asset) => (
                        <TableRow key={asset.id} className="group hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                               <div className="h-10 w-10 shrink-0 rounded-lg bg-muted/50" />
                               <span className="truncate">{asset.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>${asset.price}</TableCell>
                          <TableCell>{asset.sales || 0}</TableCell>
                          <TableCell>${((asset.price || 0) * (asset.sales || 0)).toLocaleString()}</TableCell>
                          <TableCell>
                             <Badge variant={asset.status === "active" ? "secondary" : "outline"}>
                                {asset.status || "active"}
                             </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                             <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <MoreVertical className="h-4 w-4" />
                                 </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end">
                                 <DropdownMenuItem asChild>
                                   <Link href={`/admin/products/edit/${asset.id}`}>
                                     <Edit className="mr-2 h-4 w-4" />
                                     Edit
                                   </Link>
                                 </DropdownMenuItem>
                                 <DropdownMenuItem 
                                   onClick={() => handleDeleteAsset(asset.id)}
                                   className="text-destructive"
                                 >
                                   <Trash2 className="mr-2 h-4 w-4" />
                                   Delete
                                 </DropdownMenuItem>
                               </DropdownMenuContent>
                             </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
