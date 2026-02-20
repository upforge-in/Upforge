import { createClient } from "@/lib/supabase/server"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { Crown } from "lucide-react"
import type { StartupDirectoryItem } from "@/types/startup"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Startup Directory | UpForge",
  description:
    "Explore verified Indian startups listed on UpForge.",
}

export default async function StartupsPage() {
  const supabase = await createClient()

  // ✅ SIMPLE & STABLE QUERY (working one)
  const { data: startups, error } = await supabase
    .from("startups")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("Startup fetch error:", error)
  }

  const safeStartups: StartupDirectoryItem[] = startups ?? []
  const total = safeStartups.length

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 overflow-hidden">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.25] pointer-events-none" />

      <div className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-8">
              UpForge · Public Startup Ledger
            </p>

            <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
              The Founder
              <span className="block font-semibold">
                Registry.
              </span>
            </h1>

            <p className="mt-10 text-lg text-zinc-600 leading-relaxed">
              A structured, searchable record of verified Indian startups.
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-zinc-400">
              {total} {total === 1 ? "Startup" : "Startups"} Listed
            </p>
          </div>

          {/* SEARCH */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm mb-24">
            <SearchBar initialData={safeStartups} />
          </div>

          {/* LOGO GRID */}
          {safeStartups.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
              {safeStartups.map((startup) => (
                <Link
                  key={startup.id}
                  href={`/startup/${startup.slug}`}
                  className="group"
                >
                  <div className="relative bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center aspect-square">

                    {startup.is_sponsored && (
                      <div className="absolute top-3 right-3 text-amber-500">
                        <Crown className="h-4 w-4" />
                      </div>
                    )}

                    {startup.logo_url ? (
                      <img
                        src={startup.logo_url}
                        alt={`${startup.name} logo`}
                        className="max-h-12 w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-sm font-medium text-zinc-400">
                        {startup.name}
                      </span>
                    )}

                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-zinc-200 rounded-3xl">
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
