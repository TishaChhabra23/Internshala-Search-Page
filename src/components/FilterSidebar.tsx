"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FilterSidebar() {
  const [wfh, setWfh] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [activelyHiring, setActivelyHiring] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft hidden lg:block w-72 flex-shrink-0 self-start sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Filter className="h-4 w-4 text-primary" />
          Filters
        </h2>
        <button className="text-xs font-medium text-muted hover:text-primary transition-colors">
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Profile</label>
          <input
            type="text"
            placeholder="e.g. Marketing"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/70"
          />
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Location</label>
          <input
            type="text"
            placeholder="e.g. Delhi"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 placeholder:text-muted/70"
          />
        </div>

        {/* Quick Toggles */}
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center border transition-all",
                wfh
                  ? "bg-primary border-primary text-white"
                  : "border-border bg-card group-hover:border-primary/50"
              )}
              onClick={() => setWfh(!wfh)}
            >
              {wfh && <X className="h-3 w-3" />}
            </div>
            <span className="text-sm text-foreground">Work from home</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center border transition-all",
                partTime
                  ? "bg-primary border-primary text-white"
                  : "border-border bg-card group-hover:border-primary/50"
              )}
              onClick={() => setPartTime(!partTime)}
            >
              {partTime && <X className="h-3 w-3" />}
            </div>
            <span className="text-sm text-foreground">Part-time</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center border transition-all",
                activelyHiring
                  ? "bg-primary border-primary text-white"
                  : "border-border bg-card group-hover:border-primary/50"
              )}
              onClick={() => setActivelyHiring(!activelyHiring)}
            >
              {activelyHiring && <X className="h-3 w-3" />}
            </div>
            <span className="text-sm text-foreground">Actively Hiring</span>
          </label>
        </div>

        {/* Duration */}
        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium text-foreground">Max Duration</label>
          <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/5 appearance-none text-foreground">
            <option value="">Choose duration</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
          </select>
        </div>

        {/* Stipend */}
        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium text-foreground flex justify-between">
            <span>Minimum Stipend</span>
            <span className="text-primary">₹2K</span>
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="1000"
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted">
            <span>0</span>
            <span>10K+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
