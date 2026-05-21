"use client";

import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PROFILES = ["Software Engineering", "Marketing", "Design", "Data Science", "HR"];
const LOCATIONS = ["Remote", "Bangalore", "Delhi NCR", "Mumbai", "Hyderabad"];
const DURATIONS = ["1 Month", "2 Months", "3 Months", "6 Months"];

export interface FilterOptionsProps {
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
  wfh: boolean;
  setWfh: (val: boolean) => void;
  partTime: boolean;
  setPartTime: (val: boolean) => void;
  stipendValue: number;
  setStipendValue: (val: number) => void;
}

export default function FilterOptions({
  activeFilters,
  toggleFilter,
  wfh,
  setWfh,
  partTime,
  setPartTime,
  stipendValue,
  setStipendValue,
}: FilterOptionsProps) {
  const [profileSearch, setProfileSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  return (
    <div className="space-y-4">
      {/* Profile Filter */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="border-b border-border/50 pb-4">
            <DisclosureButton className="flex w-full justify-between items-center py-2 text-base font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg">
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
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {PROFILES.filter(p => p.toLowerCase().includes(profileSearch.toLowerCase())).map((profile) => (
                        <label key={profile} className="flex items-center gap-3 cursor-pointer group">
                          <div className={cn(
                            "w-5 h-5 rounded flex items-center justify-center border transition-all",
                            activeFilters.includes(profile) ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                          )}>
                            {activeFilters.includes(profile) && <X className="h-3.5 w-3.5" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={activeFilters.includes(profile)} 
                            onChange={() => toggleFilter(profile)} 
                          />
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
            <DisclosureButton className="flex w-full justify-between items-center py-2 text-base font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg">
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
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map((location) => (
                        <label key={location} className="flex items-center gap-3 cursor-pointer group">
                          <div className={cn(
                            "w-5 h-5 rounded flex items-center justify-center border transition-all",
                            activeFilters.includes(location) ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
                          )}>
                            {activeFilters.includes(location) && <X className="h-3.5 w-3.5" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={activeFilters.includes(location)} 
                            onChange={() => toggleFilter(location)} 
                          />
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
          <input 
            type="checkbox" 
            className="sr-only" 
            checked={wfh} 
            onChange={(e) => setWfh(e.target.checked)} 
          />
          <span className="text-sm text-foreground/90 font-medium">Work from home</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={cn(
            "w-5 h-5 rounded flex items-center justify-center border transition-all",
            partTime ? "bg-primary border-primary text-white" : "border-border bg-card group-hover:border-primary/50"
          )}>
            {partTime && <X className="h-3.5 w-3.5" />}
          </div>
          <input 
            type="checkbox" 
            className="sr-only" 
            checked={partTime} 
            onChange={(e) => setPartTime(e.target.checked)} 
          />
          <span className="text-sm text-foreground/90 font-medium">Part-time</span>
        </label>
      </div>

      {/* Duration */}
      <Disclosure>
        {({ open }) => (
          <div className="border-b border-border/50 pb-4">
            <DisclosureButton className="flex w-full justify-between items-center py-2 text-base font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg">
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

      {/* Stipend */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="pb-2">
            <DisclosureButton className="flex w-full justify-between items-center py-2 text-base font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg">
              Minimum Stipend
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
                  <div className="pt-4 pb-2 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-muted">₹{stipendValue}K</span>
                      <span className="text-sm font-semibold text-primary">₹10K+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={stipendValue}
                      onChange={(e) => setStipendValue(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-muted/20 rounded-lg appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
                    />
                  </div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
