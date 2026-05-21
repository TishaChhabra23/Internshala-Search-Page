"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, PlayCircle, Wallet, Bookmark, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Internship {
  id: string;
  role: string;
  company: string;
  logoInitial: string;
  location: string;
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-soft hover:shadow-hover transition-all duration-300 group flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5 pr-4">
          {internship.activelyHiring && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/10 w-max px-2.5 py-0.5 rounded-full mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Actively hiring
            </div>
          )}
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight cursor-pointer">
            {internship.role}
          </h3>
          <p className="text-sm font-medium text-muted flex items-center gap-1.5">
            <Building2 className="h-4 w-4 opacity-70" />
            {internship.company}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => {
              e.preventDefault();
              setSaved(!saved);
            }}
            className="p-2 rounded-full text-muted hover:text-primary hover:bg-primary/5 transition-colors"
            title="Save internship"
          >
            <Bookmark className={cn("h-5 w-5 transition-all", saved && "fill-primary text-primary")} />
          </button>
          
          <div className="h-12 w-12 rounded-lg border border-border flex items-center justify-center bg-background shadow-sm text-muted font-bold text-lg flex-shrink-0">
            {internship.logoInitial}
          </div>
        </div>
      </div>

      {/* Meta Information Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-1 bg-muted/5 p-4 rounded-lg border border-border/50">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-semibold">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </div>
          <span className="text-sm font-medium text-foreground">{internship.location}</span>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-semibold">
            <PlayCircle className="h-3.5 w-3.5" />
            Start Date
          </div>
          <span className="text-sm font-medium text-foreground">Immediately</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-semibold">
            <Calendar className="h-3.5 w-3.5" />
            Duration
          </div>
          <span className="text-sm font-medium text-foreground">{internship.duration}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-semibold">
            <Wallet className="h-3.5 w-3.5" />
            Stipend
          </div>
          <span className="text-sm font-medium text-foreground">{internship.stipend}</span>
        </div>
      </div>

      {/* Footer / Tags */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-muted/10 text-muted px-2.5 py-1 rounded-md border border-border/50">
            {internship.type}
          </span>
          <span className="text-xs font-medium text-muted/70">{internship.postedAgo}</span>
        </div>
        
        <button className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5">
          Apply Now
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
