"use client"

import { useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { Crown, Search } from "lucide-react"
import type { StartupDirectoryItem } from "@/types/startup"
import { useEffect } from "react"

export default function StartupsPage() {
  const supabase = createClient()

  const [startups, setStartups] = useState<StartupDirectoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchStartups = async () => {
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .order("name", { ascending: true })

      if (!error && data) {
        setStartups(data)
      }

      setLoading(false)
    }

    fetchStartups()
  }, [])

  const filteredStartups = useMemo(() => {
    if (!query) return startups

    return startups.filter((startup) =>
      startup.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, startups])

  const total = startups.length

  return (
    <div className="relative min-h-screen bg-[#fbf9f6] text-[#1e1b1b]">
      {/* Subtle diagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />
      
      <div className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 mb-6">
              <span className="text-xs font-medium text-[#1e3a5f] tracking-wide">
                UPFORGE · FOUNDER DIRECTORY
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-[#1e1b1b]">
              Startup
              <span className="block font-semibold text-[#1e3a5f]">
                Registry.
              </span>
            </h1>

            <p className="mt-6 text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Search and discover verified Indian startups—curated for serious founders and investors.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-1 w-8 bg-[#c6a43f]/30 rounded-full" />
              <p className="text-sm uppercase tracking-[0.3em] text-[#4a4a4a] font-medium">
                {total} {total === 1 ? "Startup" : "Startups"} Listed
              </p>
              <div className="h-1 w-8 bg-[#c6a43f]/30 rounded-full" />
            </div>
          </div>

          {/* SEARCH */}
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-6 shadow-sm mb-16">
            <div className="relative">
              <SearchBar query={query} setQuery={setQuery} />
            </div>
          </div>

          {/* DIRECTORY GRID */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-3 text-[#4a4a4a]">
                <div className="h-4 w-4 rounded-full border-2 border-[#c6a43f] border-t-transparent animate-spin" />
                <span className="text-sm uppercase tracking-wider">Loading directory...</span>
              </div>
            </div>
          ) : filteredStartups.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredStartups.map((startup) => (
                <Link
                  key={startup.id}
                  href={`/startup/${startup.slug}`}
                  className="group"
                >
                  <div className="relative bg-white border border-[#1e3a5f]/10 rounded-2xl p-5 hover:shadow-xl transition-all duration-200 hover:border-[#c6a43f]/40 h-full flex flex-col items-center text-center">
                    
                    {startup.is_sponsored && (
                      <div className="absolute top-3 right-3">
                        <Crown className="h-4 w-4 text-[#c6a43f]" />
                      </div>
                    )}

                    {startup.logo_url ? (
                      <img
                        src={startup.logo_url}
                        alt={`${startup.name} logo`}
                        className="h-16 w-16 object-contain rounded-xl bg-white p-2 mb-3"
                      />
                    ) : (
                      <div className="h-16 w-16 flex items-center justify-center bg-[#1e3a5f]/5 rounded-xl mb-3">
                        <span className="text-2xl font-semibold text-[#1e3a5f]">
                          {startup.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    <h3 className="font-medium text-[#1e1b1b] group-hover:text-[#1e3a5f] transition-colors line-clamp-1">
                      {startup.name}
                    </h3>

                    {startup.short_description && (
                      <p className="text-xs text-[#4a4a4a] mt-1 line-clamp-2">
                        {startup.short_description}
                      </p>
                    )}

                    {startup.is_sponsored && (
                      <span className="mt-2 text-[10px] uppercase tracking-wider text-[#c6a43f] font-medium">
                        Sponsored
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-[#1e3a5f]/20 rounded-2xl bg-white/50">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#1e3a5f]/5 mb-4">
                <Search className="h-6 w-6 text-[#1e3a5f]/40" />
              </div>
              <p className="text-[#4a4a4a] uppercase tracking-widest text-xs">
                No startups found
              </p>
              <p className="text-sm text-[#4a4a4a] mt-2">
                Try adjusting your search
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
