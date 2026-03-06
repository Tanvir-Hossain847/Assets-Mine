"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function RevenueChart() {
  // Sample data - replace with real data from Firebase
  const data = [
    { month: "Jan", revenue: 4200, sales: 45 },
    { month: "Feb", revenue: 5800, sales: 62 },
    { month: "Mar", revenue: 7200, sales: 78 },
    { month: "Apr", revenue: 6500, sales: 71 },
    { month: "May", revenue: 8900, sales: 95 },
    { month: "Jun", revenue: 10200, sales: 112 },
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Monthly revenue and sales performance
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="font-semibold text-green-500">+18.2%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{item.sales} sales</span>
                  <span className="font-bold">${item.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                  style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border bg-muted/30 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-lg font-bold">
              ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Sales</p>
            <p className="text-lg font-bold">
              {data.reduce((sum, item) => sum + item.sales, 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Order</p>
            <p className="text-lg font-bold">
              ${Math.round(
                data.reduce((sum, item) => sum + item.revenue, 0) /
                data.reduce((sum, item) => sum + item.sales, 0)
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
