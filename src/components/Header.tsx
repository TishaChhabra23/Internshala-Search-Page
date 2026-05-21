"use client";

import { Bell, Bookmark, MessageSquare, Search, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-background/80 backdrop-blur-md border-b",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">i</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              internshala
            </span>
          </div>

          {/* Center Search Bar - Hidden on small screens */}
          <div className="hidden md:flex items-center relative max-w-md w-full mx-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-full text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5"
              placeholder="Search internships..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button className="p-2 text-muted hover:text-foreground transition-colors hover:bg-muted/10 rounded-full hidden sm:block">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="p-2 text-muted hover:text-foreground transition-colors hover:bg-muted/10 rounded-full hidden sm:block">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 text-muted hover:text-foreground transition-colors hover:bg-muted/10 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium cursor-pointer ml-2 hover:bg-primary/20 transition-colors">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
