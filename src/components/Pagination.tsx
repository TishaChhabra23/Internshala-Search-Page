"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination() {
  const pages = [1, 2, 3, "...", 12];
  
  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      <button className="p-2 rounded-lg border border-border bg-card text-muted hover:text-foreground hover:bg-muted/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {pages.map((page, i) => (
        <button
          key={i}
          disabled={page === "..."}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
            page === 1
              ? "bg-primary text-white shadow-soft"
              : page === "..."
              ? "text-muted cursor-default"
              : "bg-card border border-border text-foreground hover:bg-muted/5"
          )}
        >
          {page}
        </button>
      ))}
      
      <button className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted/5 transition-colors">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
