"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Package, 
  Upload, 
  Users, 
  TrendingUp, 
  Settings,
  LayoutDashboard,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "All Assets", icon: Package, href: "/admin/assets" },
  { label: "Upload New", icon: Upload, href: "/admin/upload" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Sales", icon: TrendingUp, href: "/admin/sales" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 border-r bg-card/50 backdrop-blur-sm lg:block">
      <div className="flex h-full flex-col p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted/50",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4  w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto space-y-1 pt-4 border-t">
           <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-3 px-3 text-muted-foreground hover:bg-muted/50">
               <ChevronLeft className="h-4 w-4" />
               Collapse
            </Button>
        </div>
      </div>
    </aside>
  );
}
