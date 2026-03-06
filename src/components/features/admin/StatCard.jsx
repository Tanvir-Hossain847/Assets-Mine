"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ title, value, trend, trendValue, icon: Icon }) {
  const isPositive = trend === "up";

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/5 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-1 flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-destructive" />
          )}
          <span className={isPositive ? "text-green-500" : "text-destructive"}>
            {trendValue}
          </span>
          <span className="text-[10px] text-muted-foreground ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
