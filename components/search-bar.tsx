// officialnewbharat-art/upforge-next/upforge-next-7b82ebbdc8bb9b76587d7c750b36e9b3eafb2119/components/search-bar.tsx
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { StartupCard } from "@/components/startup-card"
import type { Startup } from "@/types/startup"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SearchBarProps {
  initialData: Startup[]
}

export function SearchBar({ initialData }: SearchBarProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // Generate unique categories from the data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialData.map((s) => s.category).filter(Boolean)))
    return ["All", ...cats.sort()]
  }, [initialData])

  // Filter logic: Matches name/description AND category
  const filteredStartups = useMemo(() => {
    return initialData.filter((startup) => {
      const matchesSearch = 
        startup.name.toLowerCase().includes(search.toLowerCase()) || 
        startup.description.toLowerCase().includes(search.toLowerCase())
      
      const matchesCategory = activeCategory === "All" || startup.category === activeCategory
      
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory, initialData])

  return (
    <div className="space-y-12">
      {/* SEARCH & FILTER INTERFACE */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative group">
          {/* Main Search Input */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <Search className="h-6 w-6" />
          </div>
          
          <Input
            placeholder="Search by startup name, industry, or mission..."
            className="h-20 pl-16 pr-14 rounded-[2rem] border-slate-200 bg-white shadow-xl shadow-slate-200/50 text-xl font-medium focus-visible:ring-4 focus-visible:ring-indigo-50 focus-visible:border-indigo-200 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-2 mr-2 text-slate-400">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
                  : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredStartups.map((startup) => (
            <motion.div
              key={startup.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <StartupCard startup={startup} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* EMPTY STATE */}
      {filteredStartups.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 rounded-[3rem] bg-white border border-dashed border-slate-200 shadow-inner"
        >
          <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-slate-300" />
          </div>
          <p className="text-slate-900 font-black text-xl mb-2">No matching startups found</p>
          <p className="text-slate-400 font-medium">Try adjusting your search terms or filters.</p>
          <button 
            onClick={() => { setSearch(""); setActiveCategory("All"); }}
            className="mt-6 text-indigo-600 font-bold text-sm uppercase tracking-widest hover:underline"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  )
}
