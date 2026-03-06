"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { db } from "@/contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    platform: "",
    image: "",
    status: "active",
    sales: 0,
  });

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const productDoc = await getDoc(doc(db, "assets", params.id));
      if (productDoc.exists()) {
        setFormData(productDoc.data());
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(doc(db, "assets", params.id), {
        ...formData,
        price: parseFloat(formData.price),
        updatedAt: new Date().toISOString(),
      });
      
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (fetching) {
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
          <div className="mx-auto w-11/12 max-w-4xl px-4 py-8 sm:px-6">
            <div className="mb-8">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-3xl font-extrabold tracking-tight">Edit Asset</h1>
              <p className="text-muted-foreground">Update asset details</p>
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Asset Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Modern SaaS UI Kit"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your asset..."
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="49.99"
                        value={formData.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UI Kits">UI Kits</SelectItem>
                          <SelectItem value="3D Models">3D Models</SelectItem>
                          <SelectItem value="Unity">Unity</SelectItem>
                          <SelectItem value="Figma">Figma</SelectItem>
                          <SelectItem value="Templates">Templates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select value={formData.platform} onValueChange={(value) => handleChange("platform", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="figma">Figma</SelectItem>
                          <SelectItem value="unity">Unity</SelectItem>
                          <SelectItem value="3d">3D</SelectItem>
                          <SelectItem value="web">Web</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => handleChange("image", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading} className="transition-all duration-200">
                      {loading ? "Updating..." : "Update Asset"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
