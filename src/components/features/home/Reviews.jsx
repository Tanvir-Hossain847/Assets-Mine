"use client";

import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Fullstack Developer",
    content: "The Figma kits here are unmatched. Saved me literally weeks of work on my last project. Worth every cent.",
    rating: 5,
    avatar: "AT"
  },
  {
    name: "Sarah Chen",
    role: "Game Designer",
    content: "Found some incredible low-poly assets for my indie game. High quality and well-optimized. Definitely coming back.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Michael Ross",
    role: "Creative Director",
    content: "AssetsMine has become my go-to for premium visuals. The curation is exceptional, and the licenses are straightforward.",
    rating: 4.8,
    avatar: "MR"
  }
];

export default function Reviews() {
  return (
    <section className="container mx-auto px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
           Our Community
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Creators Say</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((review) => (
          <div
            key={review.name}
            className="relative rounded-3xl border bg-card/30 p-8 backdrop-blur-sm transition-all duration-200 hover:bg-card hover:shadow-lg"
          >
            <Quote className="absolute right-8 top-8 h-8 w-8 text-primary/5" />
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(review.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
            <p className="mb-8 text-muted-foreground italic leading-relaxed">
              &quot;{review.content}&quot;
            </p>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">{review.avatar}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h4 className="font-bold text-sm tracking-tight">{review.name}</h4>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
