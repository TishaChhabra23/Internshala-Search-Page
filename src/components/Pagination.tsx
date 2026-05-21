"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPages();
  
  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-border bg-card text-muted hover:text-foreground hover:bg-muted/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {pages.map((page, i) => (
        <button
          key={i}
          disabled={page === "..."}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
            page === currentPage
              ? "bg-primary text-white shadow-soft"
              : page === "..."
              ? "text-muted cursor-default"
              : "bg-card border border-border text-foreground hover:bg-muted/5"
          )}
        >
          {page}
        </button>
      ))}
      
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

