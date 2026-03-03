"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin, Mail, Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 w-11/12 mx-auto py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-primary">
              AssetsMine
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The premier marketplace for digital creators. High-quality assets, flexible licenses, and lifetime updates.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Browse All</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Premium UI Kits</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Unity 3D Models</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Game Logic Scripts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider">Stay Updated</h4>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              Get the latest updates on new releases and creator discounts.
            </p>
            <form className="flex gap-2">
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="h-10 w-full rounded-lg border bg-background/50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
               />
               <button className="h-10 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition-all active:scale-95">
                  Go
               </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-center text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-1.5">
            <Copyright className="h-3 w-3" />
            <p>{new Date().getFullYear()} AssetsMine. All rights reserved. Designed with precision for creators.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
