"use client";

import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FilterOptions, { FilterOptionsProps } from "./FilterOptions";

interface FilterSidebarProps extends FilterOptionsProps {
  clearAll: () => void;
}

export default function FilterSidebar(props: FilterSidebarProps) {
  const { activeFilters, toggleFilter, clearAll } = props;

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hidden lg:block w-72 flex-shrink-0 self-start sticky top-24 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-foreground tracking-tight">
          <Filter className="h-4 w-4 text-primary" />
          Filters
        </h2>
        {(activeFilters.length > 0 || props.wfh || props.partTime || props.stipendValue > 0) && (
          <button 
            onClick={clearAll}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors focus:outline-none focus-visible:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {activeFilters.map(filter => (
              <motion.span 
                key={filter}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[11px] font-bold px-2 py-1 rounded-md"
              >
                {filter}
                <button 
                  onClick={() => toggleFilter(filter)}
                  className="hover:text-primary/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
                  title={`Remove ${filter}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <FilterOptions {...props} />
    </div>
  );
}
