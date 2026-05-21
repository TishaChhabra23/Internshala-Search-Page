"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import FilterSidebar from "./FilterSidebar"; // We can reuse the filter internals if we abstract it, but for simplicity we will duplicate just the body or just render the filter form inside. Let's write the internal separately or duplicate for this mock.

export default function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border py-3 px-4 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Showing 124 internships
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full"
        >
          <Filter className="h-4 w-4" />
          Filters
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
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-2xl shadow-xl lg:hidden h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                  <Filter className="h-5 w-5 text-primary" />
                  Filters
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted hover:text-foreground transition-colors bg-muted/10 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 pb-24">
                 {/* Reusing filter form contents here for mobile */}
                 <div className="space-y-6">
                  {/* Profile */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Profile</label>
                    <input
                      type="text"
                      placeholder="e.g. Marketing"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/70"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/70"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border flex gap-4 bg-card w-full absolute bottom-0">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-muted/5 transition-colors"
                >
                  Clear all
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 text-sm font-medium text-white bg-primary rounded-xl shadow-soft hover:shadow-hover hover:bg-primary/90 transition-all"
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
