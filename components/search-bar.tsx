"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import type { Startup } from "@/types/startup"
import { Search, X, Crown } from "lucide-react"

interface SearchBarProps {
  initialData: Startup[]
}

export function SearchBar({ initialData }: SearchBarProps) {
  const [search, setSearch] = useState("")

  // Simple Name-Based Search (Scalable & Fast)
  const filteredStartups = useMemo(() => {
    if (!search) return initialData

    return initialData.filter((startup) =>
      startup.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, initialData])

  return (
    <div className="space-y-16">

      {/* ================= SEARCH INPUT ================= */}
      <div className="max-w-3xl mx-auto">
        <div className="relative group">

          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
            <Search className="h-5 w-5" />
          </div>

          <Input
            placeholder="Search startup by name..."
            className="h-16 pl-14 pr-14 rounded-full border-zinc-200 bg-white shadow-sm text-lg focus-visible:ring-2 focus-visible:ring-black/10 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* ================= RESULTS GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">

        {filteredStartups.map((startup) => (
          <Link key={startup.id} href={`/startup/${startup.slug}`}>
            <div className="relative bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex items-center justify-center group">

              {startup.is_sponsored && (
                <div className="absolute top-3 right-3 text-amber-500">
                  <Crown className="h-4 w-4" />
                </div>
              )}

              <img
                src={startup.logo_url}
                alt={`${startup.name} logo`}
                className="max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
          </Link>
        ))}

      </div>

      {/* ================= EMPTY STATE ================= */}
      {filteredStartups.length === 0 && (
        <div className="text-center py-24">
          <div className="text-zinc-400 text-sm uppercase tracking-[0.3em]">
            No Startup Found
          </div>
        </div>
      )}

    </div>
  )
}
