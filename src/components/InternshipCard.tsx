"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, PlayCircle, Wallet, Bookmark, ArrowUpRight, Laptop } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Internship {
  id: string;
  role: string;
  company: string;
  logoInitial: string;
  location: string;
  workMode?: string;
  stipend: string;
  duration: string;
  type: string;
  activelyHiring: boolean;
  postedAgo: string;
}

export default function InternshipCard({ internship }: { internship: Internship }) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 group flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2 pr-4">
          {internship.activelyHiring && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary/10 w-max px-2.5 py-0.5 rounded-full mb-0.5 uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Actively hiring
            </div>
          )}
          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight cursor-pointer tracking-tight">
            {internship.role}
          </h3>
          <p className="text-sm font-semibold text-muted flex items-center gap-2">
            <Building2 className="h-4 w-4 opacity-70" />
            {internship.company}
          </p>
        </div>
        
        <div className="flex items-start gap-2 sm:gap-4">
          <button 
            onClick={(e) => {
              e.preventDefault();
              setSaved(!saved);
            }}
            className="p-2 sm:p-2.5 rounded-full text-muted hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            title={saved ? "Remove bookmark" : "Save internship"}
          >
            <Bookmark className={cn("h-5 w-5 transition-all", saved && "fill-primary text-primary")} />
          </button>
          
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-border flex items-center justify-center bg-muted/5 shadow-sm text-foreground font-bold text-xl flex-shrink-0">
            {internship.logoInitial}
          </div>
        </div>
      </div>

      {/* Meta Information Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-1 bg-muted/5 p-4 rounded-xl border border-border/50">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted uppercase tracking-wider font-bold">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </div>
          <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            {internship.location}
            {internship.workMode && (
              <span className="text-[10px] bg-foreground/5 px-1.5 py-0.5 rounded text-muted font-medium">
                {internship.workMode}
              </span>
            )}
          </span>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted uppercase tracking-wider font-bold">
            <PlayCircle className="h-3.5 w-3.5" />
            Start Date
          </div>
          <span className="text-sm font-semibold text-foreground">Immediately</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted uppercase tracking-wider font-bold">
            <Calendar className="h-3.5 w-3.5" />
            Duration
          </div>
          <span className="text-sm font-semibold text-foreground">{internship.duration}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted uppercase tracking-wider font-bold">
            <Wallet className="h-3.5 w-3.5" />
            Stipend
          </div>
          <span className="text-sm font-semibold text-foreground">{internship.stipend}</span>
        </div>
      </div>

      {/* Footer / Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-muted/10 text-muted px-3 py-1.5 rounded-lg border border-border/50">
            {internship.type}
          </span>
          <span className="text-xs font-medium text-muted flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-muted/50"></span>
            {internship.postedAgo}
          </span>
        </div>
        
        <button 
          onClick={() => alert(`Successfully applied to the ${internship.role} position at ${internship.company}!`)}
          className="w-full sm:w-auto text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Apply Now
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
