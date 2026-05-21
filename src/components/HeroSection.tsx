"use client";

import { Search, MapPin, Code, Palette, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
        >
          Find your dream <span className="text-primary">internship</span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted mb-10 max-w-2xl"
        >
          Launch your career with premium opportunities from top startups and global tech companies.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl relative"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-32 py-4 border border-border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-soft bg-card placeholder:text-muted/60"
            placeholder="Search by role, company, or skills..."
          />
          <div className="absolute inset-y-2 right-2 flex items-center">
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition-colors shadow-soft hover:shadow-hover h-full">
              Search
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="text-sm text-muted/80 mr-2 self-center font-medium">Popular:</span>
          {[
            { label: "Software Engineering", icon: Code },
            { label: "Product Design", icon: Palette },
            { label: "Marketing", icon: Megaphone },
            { label: "Remote", icon: MapPin },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border/60 bg-muted/5 text-sm font-medium text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

