"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, PlayCircle, Wallet } from "lucide-react";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-soft hover:shadow-hover transition-all duration-300 group cursor-pointer flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          {internship.activelyHiring && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/10 w-max px-2 py-0.5 rounded flex-row mb-1">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Actively hiring
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
            {internship.role}
          </h3>
          <p className="text-sm font-medium text-muted flex items-center gap-1.5">
            {internship.company}
          </p>
        </div>
        
        {/* Logo Placeholder */}
        <div className="h-12 w-12 rounded border border-border flex items-center justify-center bg-muted/5 text-muted font-semibold text-lg flex-shrink-0">
          {internship.logoInitial}
        </div>
      </div>

      {/* Meta Information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-medium">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </div>
          <span className="text-sm font-medium text-foreground">{internship.location}</span>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-medium">
            <PlayCircle className="h-3.5 w-3.5" />
            Start Date
          </div>
          <span className="text-sm font-medium text-foreground">Immediately</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-medium">
            <Calendar className="h-3.5 w-3.5" />
            Duration
          </div>
          <span className="text-sm font-medium text-foreground">{internship.duration}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted uppercase tracking-wider font-medium">
            <Wallet className="h-3.5 w-3.5" />
            Stipend
          </div>
          <span className="text-sm font-medium text-foreground">{internship.stipend}</span>
        </div>
      </div>

      {/* Footer / Tags */}
      <div className="flex items-center justify-between mt-2 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-muted/10 text-muted px-2.5 py-1 rounded-md">
            {internship.type}
          </span>
          <span className="text-xs text-muted/70">{internship.postedAgo}</span>
        </div>
        
        <button className="text-sm font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          View details &rarr;
        </button>
      </div>
    </motion.div>
  );
}
