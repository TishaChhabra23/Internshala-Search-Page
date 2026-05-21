"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center py-28 px-4 text-center bg-card/50 border border-border/60 rounded-3xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/5 pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
        className="bg-background shadow-soft p-5 rounded-2xl mb-6 relative z-10 border border-border/80"
      >
        <div className="bg-primary/10 p-4 rounded-xl">
          <SearchX className="h-10 w-10 text-primary" />
        </div>
      </motion.div>
      
      <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight relative z-10">No internships found</h3>
      <p className="text-muted max-w-sm mb-10 text-[15px] leading-relaxed relative z-10 font-medium">
        We couldn&apos;t find any opportunities matching your exact filters. Try broadening your search criteria.
      </p>
      
      <button className="px-8 py-3.5 bg-foreground text-white font-semibold rounded-xl hover:bg-foreground/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 relative z-10">
        Reset all filters
      </button>
    </motion.div>
  );
}

