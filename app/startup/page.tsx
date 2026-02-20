import { createClient } from "@/lib/supabase/server"
import { SearchBar } from "@/components/search-bar"
import { Metadata } from "next"

/**
 * SEO METADATA
 * Using a server-side export for improved search rankings and dynamic social previews.
 */
export const metadata: Metadata = {
  title: "Explore Indian Startups | UpForge",
  description: "Discover verified Indian startups, founders and emerging companies on UpForge's comprehensive institutional directory.",
  openGraph: {
    title: "Explore Indian Startups | UpForge",
    description: "Discover verified Indian startups, founders and emerging companies.",
    url: "https://upforge.in/startups",
    type: "website",
  },
}

export default async function StartupsPage() {
  const supabase = await createClient()

  // Initial data fetch from Server Component for SEO and faster initial load
  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("name", { ascending: true })

  return (
    <div className="relative min-h-screen bg-[#0B0F1A] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <div className="mb-20 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-amber-500/10 border border-indigo-500/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-amber-400/90">
                Verified Institutional Database
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white leading-none">
              The 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-amber-200 ml-3">
                Directory
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Access our complete network of verified independent startups. 
              <span className="block text-sm text-slate-500 mt-2">Every profile is rigorously vetted for quality and impact.</span>
            </p>
          </div>

          {/* SEARCH & FILTER COMPONENT 
              Note: The SearchBar component should be updated to match the dark theme.
              If it uses default light classes, consider passing dark mode variants or wrapping it.
          */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 shadow-xl">
            <SearchBar initialData={startups || []} />
          </div>

          {/* QUICK STATS */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Startups', value: startups?.length || '—' },
              { label: 'Verified Founders', value: '850+' },
              { label: 'Total Funding', value: '$2.4B' },
              { label: 'Last Updated', value: 'Feb 2026' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-slate-800/20 border border-slate-700/50">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER CALLOUT */}
      <div className="border-t border-slate-800 bg-slate-900/50 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-[8px] text-emerald-400">✓</span>
            </div>
            <span>New startups authenticated weekly</span>
          </div>
          <div className="flex items-center gap-8 grayscale opacity-30">
            <span className="text-sm font-bold tracking-tight text-slate-500">SEQUOIA</span>
            <span className="text-sm font-bold tracking-tight text-slate-500">ACCEL</span>
            <span className="text-sm font-bold tracking-tight text-slate-500">BLUME</span>
          </div>
        </div>
      </div>
    </div>
  )
}
