"use client";

import { useState } from "react";
import { Filter, X, Search, ChevronDown } from "lucide-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PROFILES = ["Software Engineering", "Marketing", "Design", "Data Science", "HR"];
const LOCATIONS = ["Remote", "Bangalore", "Delhi NCR", "Mumbai", "Hyderabad"];
const DURATIONS = ["1 Month", "2 Months", "3 Months", "6 Months"];

export default function FilterSidebar() {
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
    <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hidden lg:block w-72 flex-shrink-0 self-start sticky top-24 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-foreground tracking-tight">
          <Filter className="h-4 w-4 text-primary" />
          Filters
        </h2>
        {(activeFilters.length > 0 || wfh || partTime || stipendValue > 0) && (
          <button 
            onClick={clearAll}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
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
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-primary/70" 
                  onClick={() => toggleFilter(filter)} 
                />
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {/* Profile Filter */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="border-b border-border/50 pb-4">
              <DisclosureButton className="flex w-full justify-between items-center py-2 text-sm font-bold text-foreground hover:text-primary transition-colors">
                Profile
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
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
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted" />
                        <input
                          type="text"
                          placeholder="e.g. Marketing"
                          value={profileSearch}
                          onChange={(e) => setProfileSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/60"
                        />
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                        {PROFILES.filter(p => p.toLowerCase().includes(profileSearch.toLowerCase())).map((profile) => (
                          <label key={profile} className="flex items-center gap-3 cursor-pointer group">
                            <div className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border transition-all",
                              activeFilters.includes(profile) ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                            )}>
                              {activeFilters.includes(profile) && <X className="h-3 w-3" />}
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
              <DisclosureButton className="flex w-full justify-between items-center py-2 text-sm font-bold text-foreground hover:text-primary transition-colors">
                Location
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
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
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted" />
                        <input
                          type="text"
                          placeholder="e.g. Delhi"
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/60"
                        />
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                        {LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map((location) => (
                          <label key={location} className="flex items-center gap-3 cursor-pointer group">
                            <div className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border transition-all",
                              activeFilters.includes(location) ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                            )}>
                              {activeFilters.includes(location) && <X className="h-3 w-3" />}
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
        <div className="py-2 space-y-3 border-b border-border/50 pb-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn(
              "w-4 h-4 rounded flex items-center justify-center border transition-all",
              wfh ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
            )}>
              {wfh && <X className="h-3 w-3" />}
            </div>
            <span className="text-sm text-foreground/90 font-medium">Work from home</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn(
              "w-4 h-4 rounded flex items-center justify-center border transition-all",
              partTime ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
            )}>
              {partTime && <X className="h-3 w-3" />}
            </div>
            <span className="text-sm text-foreground/90 font-medium">Part-time</span>
          </label>
        </div>

        {/* Duration */}
        <Disclosure>
          {({ open }) => (
            <div className="border-b border-border/50 pb-4">
              <DisclosureButton className="flex w-full justify-between items-center py-2 text-sm font-bold text-foreground hover:text-primary transition-colors">
                Max Duration
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
              </DisclosureButton>
              <AnimatePresence>
                {open && (
                  <DisclosurePanel static as={motion.div}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-2 space-y-2">
                      {DURATIONS.map((duration) => (
                         <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                            <div className={cn(
                              "w-4 h-4 rounded-full flex items-center justify-center border transition-all",
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

        {/* Stipend */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="pb-2">
              <DisclosureButton className="flex w-full justify-between items-center py-2 text-sm font-bold text-foreground hover:text-primary transition-colors">
                Minimum Stipend
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
              </DisclosureButton>
              <AnimatePresence>
                {open && (
                  <DisclosurePanel static as={motion.div}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-muted">₹{stipendValue}K</span>
                        <span className="text-xs font-semibold text-primary">₹10K+</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={stipendValue}
                        onChange={(e) => setStipendValue(Number(e.target.value))}
                        className="w-full accent-primary h-1.5 bg-muted/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </DisclosurePanel>
                )}
              </AnimatePresence>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
