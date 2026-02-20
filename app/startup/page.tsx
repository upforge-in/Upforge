import { createClient } from "@/lib/supabase/server"
import { SearchBar } from "@/components/search-bar"
import { Metadata } from "next"

/**
 * SEO METADATA
 */
export const metadata: Metadata = {
  title: "Startup Directory | Upforge Registry",
  description:
    "Browse verified Indian startups and founder-led companies listed on the Upforge Registry.",
  openGraph: {
    title: "Startup Directory | Upforge Registry",
    description:
      "A curated institutional registry of verified Indian startups and founders.",
    url: "https://upforge.in/startup",
    type: "website",
  },
}

export default async function StartupsPage() {
  const supabase = await createClient()

  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("name", { ascending: true })

  const total = startups?.length || 0

  return (
    <div className="min-h-screen bg-[#F8F8F6] text-zinc-900">

      <div className="py-40 px-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-8">
              Upforge Registry
            </p>

            <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
              The Startup
              <span className="block font-semibold">
                Directory.
              </span>
            </h1>

            <p className="mt-10 text-lg text-zinc-600 leading-relaxed">
              A structured public record of verified founder-led companies.
              Each profile is documented for long-term visibility and credibility.
            </p>
          </div>

          {/* SEARCH MODULE */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <SearchBar initialData={startups || []} />
          </div>

          {/* STATS STRIP */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

            <div>
              <p className="text-3xl font-semibold">{total}</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                Listed Startups
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">850+</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                Verified Founders
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">$2.4B</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                Capital Represented
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">Updated</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                February 2026
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="border-t border-zinc-200 py-16 text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
        Upforge · Independent Founder Registry · India
      </div>

    </div>
  )
}
