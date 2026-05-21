"use client";

import { useState, useEffect } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import InternshipCard, { Internship } from "@/components/InternshipCard";
import SkeletonCard from "@/components/SkeletonCard";
import FilterSidebarSkeleton from "@/components/FilterSidebarSkeleton";
import HeroSection from "@/components/HeroSection";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchInternships() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/internships");
        const json = await res.json();
        if (json.success && json.data) {
          setInternships(json.data);
          setIsEmpty(json.data.length === 0);
        } else {
          throw new Error(json.error || "Failed to load data");
        }
      } catch (err: unknown) {
        console.error(err);
        setIsEmpty(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchInternships();
  }, []);

  // Filter State
  const [activeFilters, setActiveFilters] = useState<string[]>(["Remote"]);
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
  };

  const filterProps = {
    activeFilters,
    toggleFilter,
    wfh,
    setWfh,
    partTime,
    setPartTime,
    stipendValue,
    setStipendValue,
    clearAll
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-background relative flex flex-col"
    >
      {/* Hero Search Area */}
      <HeroSection />

      {/* Mobile Filter Header */}
      <MobileFilterDrawer {...filterProps} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex gap-8 items-start">
          
          {/* Desktop Sidebar */}
          {isLoading ? <FilterSidebarSkeleton /> : <FilterSidebar {...filterProps} />}
          
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
                  {internships.map((internship, index) => (
                    <motion.div 
                      key={internship.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                    >
                      <InternshipCard internship={internship} />
                    </motion.div>
                  ))}
                  
                  {/* Pagination */}
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={12}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
}
