"use client";

import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import InternshipCard, { Internship } from "@/components/InternshipCard";
import SkeletonCard from "@/components/SkeletonCard";
import FilterSidebarSkeleton from "@/components/FilterSidebarSkeleton";
import HeroSection from "@/components/HeroSection";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: "1",
    role: "Frontend Engineering Intern",
    company: "Linear",
    logoInitial: "L",
    location: "Remote",
    workMode: "Remote",
    stipend: "₹30,000 /month",
    duration: "6 Months",
    type: "Internship",
    activelyHiring: true,
    postedAgo: "2 days ago",
  },
  {
    id: "2",
    role: "Product Design Intern",
    company: "Stripe",
    logoInitial: "S",
    location: "Bangalore",
    workMode: "Hybrid",
    stipend: "₹45,000 /month",
    duration: "3 Months",
    type: "Internship",
    activelyHiring: false,
    postedAgo: "1 week ago",
  },
  {
    id: "3",
    role: "Full Stack Developer",
    company: "Vercel",
    logoInitial: "V",
    location: "Remote",
    workMode: "Remote",
    stipend: "₹50,000 /month",
    duration: "6 Months",
    type: "Internship with Job Offer",
    activelyHiring: true,
    postedAgo: "Just now",
  },
  {
    id: "4",
    role: "Marketing Analytics Intern",
    company: "Notion",
    logoInitial: "N",
    location: "Delhi NCR",
    workMode: "On-site",
    stipend: "₹25,000 /month",
    duration: "2 Months",
    type: "Internship",
    activelyHiring: false,
    postedAgo: "3 days ago",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // Mock toggle for testing states
  // useEffect(() => {
  //   setTimeout(() => setIsLoading(false), 2000);
  // }, []);

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* Hero Search Area */}
      <HeroSection />

      {/* Mobile Filter Header */}
      <MobileFilterDrawer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex gap-8 items-start">
          
          {/* Desktop Sidebar */}
          {isLoading ? <FilterSidebarSkeleton /> : <FilterSidebar />}
          
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 lg:gap-0">
              <h2 className="text-lg font-bold text-foreground">
                {isLoading ? "Searching..." : isEmpty ? "0 Internships" : "124 Internships found"}
              </h2>
              <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
                <span className="text-muted whitespace-nowrap">Sort by:</span>
                <select className="font-medium bg-transparent border-none focus:ring-0 cursor-pointer text-foreground w-full sm:w-auto outline-none">
                  <option>Relevance</option>
                  <option>Most Recent</option>
                  <option>Highest Stipend</option>
                </select>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </motion.div>
              ) : isEmpty ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState />
                </motion.div>
              ) : (
                <motion.div 
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  {MOCK_INTERNSHIPS.map((internship) => (
                    <InternshipCard key={internship.id} internship={internship} />
                  ))}
                  
                  {/* Pagination */}
                  <Pagination />
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </div>
  );
}
