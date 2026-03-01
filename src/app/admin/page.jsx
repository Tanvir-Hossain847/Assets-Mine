"use client";

import { motion } from "motion/react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import StatCard from "@/components/features/admin/StatCard";
import { 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart,
  Plus,
  MoreVertical,
  Filter,
  Download
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

const assets = [
  { id: 1, title: "Modern SaaS UI Kit", price: 49, sales: 124, revenue: 6076, status: "Active" },
  { id: 2, title: "3D Abstract Shapes", price: 29, sales: 86, revenue: 2494, status: "Active" },
  { id: 3, title: "Fantasy RPG Icons", price: 19, sales: 215, revenue: 4085, status: "Active" },
  { id: 4, title: "Mobile App Template", price: 59, sales: 42, revenue: 2478, status: "Review" },
  { id: 5, title: "Vector Illustration Pack", price: 15, sales: 312, revenue: 4680, status: "Active" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="mx-auto w-11/12 px-4 py-8 sm:px-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground">Monitor your performance and manage assets.</p>
            </div>
            <Button className="rounded-full shadow-lg shadow-primary/20 active:scale-95">
              <Plus className="mr-2 h-4 w-4" />
              Upload New Asset
            </Button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Revenue" value="$24,892" trend="up" trendValue="+12.5%" icon={DollarSign} delay={0.1} />
            <StatCard title="Active Users" value="1,284" trend="up" trendValue="+5.2%" icon={Users} delay={0.2} />
            <StatCard title="Total Sales" value="856" trend="up" trendValue="+8.1%" icon={ShoppingCart} delay={0.3} />
            <StatCard title="Published Assets" value="42" trend="down" trendValue="-2.4%" icon={Package} delay={0.4} />
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
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id} className="group hover:bg-muted/30">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 shrink-0 rounded-lg bg-muted/50" />
                           <span className="truncate">{asset.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>${asset.price}</TableCell>
                      <TableCell>{asset.sales}</TableCell>
                      <TableCell>${asset.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                         <Badge variant={asset.status === "Active" ? "secondary" : "outline"} className={asset.status === "Active" ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20" : ""}>
                            {asset.status}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
