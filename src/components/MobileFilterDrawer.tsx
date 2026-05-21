"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterOptions, { FilterOptionsProps } from "./FilterOptions";

interface MobileFilterDrawerProps extends FilterOptionsProps {
  clearAll: () => void;
}

export default function MobileFilterDrawer(props: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { activeFilters, toggleFilter, clearAll } = props;

  return (
    <>
      {/* Floating Action Button for Filters (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-white bg-foreground px-6 py-3.5 rounded-full shadow-lg hover:scale-105 transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Filter className="h-4 w-4" />
          Filters {(activeFilters.length > 0 || props.wfh || props.partTime) && <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] ml-1">{activeFilters.length + (props.wfh ? 1 : 0) + (props.partTime ? 1 : 0)}</span>}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-[70] bg-card rounded-t-3xl shadow-2xl lg:hidden h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border/60 flex-shrink-0 bg-card rounded-t-3xl">
                <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Filter className="h-5 w-5 text-primary" />
                  Filters
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted hover:text-foreground transition-colors bg-muted/10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 pb-28 custom-scrollbar">
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
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1.5 rounded-lg"
                        >
                          {filter}
                          <button 
                            onClick={() => toggleFilter(filter)}
                            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
                            title={`Remove ${filter}`}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                 <FilterOptions {...props} />
              </div>

              <div className="p-4 border-t border-border/60 flex gap-4 bg-card w-full absolute bottom-0 rounded-b-3xl">
                <button 
                  onClick={clearAll}
                  className="flex-1 py-3.5 text-sm font-bold text-foreground border border-border/80 rounded-xl hover:bg-muted/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Clear all
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3.5 text-sm font-bold text-white bg-primary rounded-xl shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


