"use client"

import { useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { Crown } from "lucide-react"
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
    <div className="min-h-screen bg-[#FAFAF9] text-zinc-900">
      <div className="py-32 px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6">
              UpForge · Founder Directory
            </p>

            <h1 className="text-5xl md:text-6xl font-light leading-tight">
              Startup
              <span className="block font-semibold">
                Registry.
              </span>
            </h1>

            <p className="mt-6 text-zinc-600">
              Search and discover verified Indian startups.
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-zinc-400">
              {total} {total === 1 ? "Startup" : "Startups"} Listed
            </p>
          </div>

          {/* SEARCH */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm mb-16">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* DIRECTORY GRID */}
          {loading ? (
            <div className="text-center py-20 text-zinc-400 text-sm">
              Loading startups...
            </div>
          ) : filteredStartups.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredStartups.map((startup) => (
                <Link
                  key={startup.id}
                  href={`/startup/${startup.slug}`}
                  className="group"
                >
                  <div className="relative bg-white border border-zinc-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition hover:border-black">

                    {startup.is_sponsored && (
                      <div className="absolute top-2 right-2 text-amber-500">
                        <Crown className="h-4 w-4" />
                      </div>
                    )}

                    {startup.logo_url ? (
                      <img
                        src={startup.logo_url}
                        alt={`${startup.name} logo`}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center bg-zinc-100 rounded-md text-xs font-semibold">
                        {startup.name.charAt(0)}
                      </div>
                    )}

                    <span className="text-sm font-medium truncate">
                      {startup.name}
                    </span>

                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-zinc-200 rounded-xl">
              <p className="text-zinc-400 uppercase tracking-widest text-xs">
                No startups found
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
