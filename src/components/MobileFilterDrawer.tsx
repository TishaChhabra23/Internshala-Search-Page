"use client";

import { Filter, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PROFILES = ["Software Engineering", "Marketing", "Design", "Data Science", "HR"];
const LOCATIONS = ["Remote", "Bangalore", "Delhi NCR", "Mumbai", "Hyderabad"];
const DURATIONS = ["1 Month", "2 Months", "3 Months", "6 Months"];

export default function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(["Remote"]);
  const [profileSearch, setProfileSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  
  const [wfh, setWfh] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [stipendValue, setStipendValue] = useState(0);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const clearAll = () => {
    setActiveFilters([]);
    setWfh(false);
    setPartTime(false);
    setStipendValue(0);
    setProfileSearch("");
    setLocationSearch("");
  };

  return (
    <>
      {/* Floating Action Button for Filters (Mobile) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-white bg-foreground px-6 py-3.5 rounded-full shadow-lg hover:scale-105 transition-transform active:scale-95"
        >
          <Filter className="h-4 w-4" />
          Filters {(activeFilters.length > 0 || wfh || partTime) && <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] ml-1">{activeFilters.length + (wfh ? 1 : 0) + (partTime ? 1 : 0)}</span>}
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
                  className="p-2 text-muted hover:text-foreground transition-colors bg-muted/10 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 pb-28">
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
                          <X className="h-3.5 w-3.5 cursor-pointer" onClick={() => toggleFilter(filter)} />
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                 {/* Reusing filter form contents */}
                 <div className="space-y-4">
                  {/* Profile Filter */}
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <div className="border-b border-border/50 pb-4">
                        <DisclosureButton className="flex w-full justify-between items-center py-2 text-base font-bold text-foreground hover:text-primary transition-colors">
                          Profile
                          <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", open && "rotate-180")} />
                        </DisclosureButton>
                        <AnimatePresence>
                          {open && (
                            <DisclosurePanel static as={motion.div}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 pb-2 space-y-3">
                                <div className="relative">
                                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
                                  <input
                                    type="text"
                                    placeholder="e.g. Marketing"
                                    value={profileSearch}
                                    onChange={(e) => setProfileSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/60"
                                  />
                                </div>
                                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                                  {PROFILES.filter(p => p.toLowerCase().includes(profileSearch.toLowerCase())).map((profile) => (
                                    <label key={profile} className="flex items-center gap-3 cursor-pointer group">
                                      <div className={cn(
                                        "w-5 h-5 rounded flex items-center justify-center border transition-all",
                                        activeFilters.includes(profile) ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                                      )}>
                                        {activeFilters.includes(profile) && <X className="h-3.5 w-3.5" />}
                                      </div>
                                      <span className="text-sm text-foreground/90 font-medium">{profile}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </DisclosurePanel>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </Disclosure>

                  {/* Location Filter */}
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <div className="border-b border-border/50 pb-4">
                        <DisclosureButton className="flex w-full justify-between items-center py-2 text-base font-bold text-foreground hover:text-primary transition-colors">
                          Location
                          <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", open && "rotate-180")} />
                        </DisclosureButton>
                        <AnimatePresence>
                          {open && (
                            <DisclosurePanel static as={motion.div}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 pb-2 space-y-3">
                                <div className="relative">
                                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
                                  <input
                                    type="text"
                                    placeholder="e.g. Delhi"
                                    value={locationSearch}
                                    onChange={(e) => setLocationSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/60"
                                  />
                                </div>
                                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                                  {LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map((location) => (
                                    <label key={location} className="flex items-center gap-3 cursor-pointer group">
                                      <div className={cn(
                                        "w-5 h-5 rounded flex items-center justify-center border transition-all",
                                        activeFilters.includes(location) ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                                      )}>
                                        {activeFilters.includes(location) && <X className="h-3.5 w-3.5" />}
                                      </div>
                                      <span className="text-sm text-foreground/90 font-medium">{location}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </DisclosurePanel>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </Disclosure>

                  {/* Quick Toggles */}
                  <div className="py-2 space-y-4 border-b border-border/50 pb-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={cn(
                        "w-5 h-5 rounded flex items-center justify-center border transition-all",
                        wfh ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                      )}>
                        {wfh && <X className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-sm text-foreground/90 font-medium">Work from home</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={cn(
                        "w-5 h-5 rounded flex items-center justify-center border transition-all",
                        partTime ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                      )}>
                        {partTime && <X className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-sm text-foreground/90 font-medium">Part-time</span>
                    </label>
                  </div>

                  {/* Duration */}
                  <Disclosure>
                    {({ open }) => (
                      <div className="border-b border-border/50 pb-4">
                        <DisclosureButton className="flex w-full justify-between items-center py-2 text-base font-bold text-foreground hover:text-primary transition-colors">
                          Max Duration
                          <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", open && "rotate-180")} />
                        </DisclosureButton>
                        <AnimatePresence>
                          {open && (
                            <DisclosurePanel static as={motion.div}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 pb-2 space-y-3">
                                {DURATIONS.map((duration) => (
                                  <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                                      <div className={cn(
                                        "w-5 h-5 rounded-full flex items-center justify-center border transition-all",
                                        activeFilters.includes(duration) ? "border-primary border-4" : "border-border bg-card group-hover:border-primary/50"
                                      )}>
                                      </div>
                                      <span className="text-sm text-foreground/90 font-medium">{duration}</span>
                                    </label>
                                ))}
                              </div>
                            </DisclosurePanel>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </Disclosure>
                </div>
              </div>

              <div className="p-4 border-t border-border/60 flex gap-4 bg-card w-full absolute bottom-0 rounded-b-3xl">
                <button 
                  onClick={clearAll}
                  className="flex-1 py-3.5 text-sm font-bold text-foreground border border-border/80 rounded-xl hover:bg-muted/5 transition-colors"
                >
                  Clear all
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3.5 text-sm font-bold text-white bg-primary rounded-xl shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all"
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
