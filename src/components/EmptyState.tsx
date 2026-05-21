"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card border border-border border-dashed rounded-xl"
    >
      <div className="bg-muted/10 p-4 rounded-full mb-4">
        <SearchX className="h-10 w-10 text-muted" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No internships found</h3>
      <p className="text-muted max-w-sm mb-8">
        We couldn't find any internships matching your current filters. Try adjusting your search criteria.
      </p>
      <button className="px-6 py-2.5 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
        Clear all filters
      </button>
    </motion.div>
  );
}
