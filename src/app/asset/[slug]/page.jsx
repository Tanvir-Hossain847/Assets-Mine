"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import ImageGallery from "@/components/features/product/ImageGallery";
import BuySidebar from "@/components/features/product/BuySidebar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, CheckCircle2 } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();

  // Dummy data for now
  const asset = {
    title: "Modern SaaS UI Kit - High Fidelity Reusable Components",
    price: 49,
    rating: 4.9,
    reviews: 128,
    lastUpdate: "Oct 24, 2025",
    category: "Figma UI Kit",
    features: [
      "150+ Reusable Components",
      "Auto Layout 4.0",
      "Variable Support",
      "Dark & Light Mode",
      "Responsive Layouts",
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-11/12 px-4 py-8 sm:px-6 lg:py-12"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-primary font-medium uppercase tracking-wider">
              <span>{asset.category}</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {asset.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-foreground">{asset.rating}</span>
                <span>({asset.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>Last Updated: {asset.lastUpdate}</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                Top Rated
              </Badge>
            </div>
          </div>

          <ImageGallery />

          <div className="pt-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b bg-transparent p-0 rounded-none h-12">
                <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-6">
                  Description
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-6">
                  Features
                </TabsTrigger>
                <TabsTrigger value="changelog" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-6">
                  Changelog
                </TabsTrigger>
              </TabsList>
              <div className="py-6">
                <TabsContent value="description" className="mt-0 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Elevate your design workflow with this comprehensive SaaS UI Kit. Built with 
                    Atomic Design principles, every component is highly customizable and ready for scale.
                  </p>
                  <p>
                    Whether you're building a dashboard, a landing page, or a complex web application, 
                    this kit provides the foundation you need to deliver high-quality results in half the time.
                  </p>
                </TabsContent>
                <TabsContent value="features" className="mt-0">
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {asset.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="changelog" className="mt-0">
                   <div className="space-y-6">
                      <div className="flex gap-4">
                         <div className="w-16 shrink-0 text-sm font-bold text-primary">v1.2.0</div>
                         <div className="space-y-1">
                            <div className="text-sm font-semibold">Added Figma Variables</div>
                            <div className="text-sm text-muted-foreground">Full support for light/dark mode switching using variables.</div>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-16 shrink-0 text-sm font-bold text-primary">v1.1.0</div>
                         <div className="space-y-1">
                            <div className="text-sm font-semibold">New Dashboard Components</div>
                            <div className="text-sm text-muted-foreground">Added 20+ chart types and data table variations.</div>
                         </div>
                      </div>
                   </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <BuySidebar asset={asset} />
        </div>
      </div>
    </motion.div>
  );
}
