// app/page.tsx
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, Crown, Sparkles, 
  ArrowUpRight, Plus, Minus
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description: "A premium registry for India's verified startup founders.",
}

export default async function Home() {
  const supabase = await createClient()

  // Sponsor of the Week
  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  // Recent Registry Additions
  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6)

  return (
    <div className="bg-white text-black">
      {/* ================= HERO: ASYMMETRICAL LAYOUT ================= */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-10 overflow-hidden">
                <span className="h-px w-12 bg-black animate-slide-right"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">
                  EST. 2026 — FOUNDER REGISTRY
                </span>
              </div>

              <h1 className="text-7xl md:text-[120px] leading-[0.85] font-display font-bold tracking-tighter mb-10">
                Forge Your <br />
                <span className="text-gray-300 italic font-medium">Authority.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 max-w-xl leading-tight mb-12">
                UpForge is the premier directory where India’s most ambitious builders 
                gain visibility and connect with the ecosystem.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link href="/apply">
                  <Button className="rounded-full px-12 h-14 bg-black text-white hover:bg-gray-900 text-[11px] font-bold uppercase tracking-widest transition-transform active:scale-95">
                    Apply to Join
                  </Button>
                </Link>
                <Link href="/startup">
                  <Button variant="ghost" className="group text-black text-[11px] font-bold uppercase tracking-widest">
                    Browse Directory 
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-black/5 pt-12 lg:pt-0 lg:pl-12">
              <div className="space-y-10">
                {[
                  { label: "Verified Startups", val: "3,400+" },
                  { label: "Active Founders", val: "1,200+" },
                  { label: "Monthly Reach", val: "250K+" }
                ].map((stat, i) => (
                  <div key={i} className="group cursor-default">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase opacity-30 group-hover:opacity-100 transition-opacity">
                      {stat.label}
                    </span>
                    <span className="text-4xl font-display font-bold">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPONSOR SPOTLIGHT: LARGE CANVAS ================= */}
      {sponsorOfWeek?.[0] && (
        <section className="bg-[#f8f8f8] py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="group block">
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="w-full lg:w-1/2 aspect-square relative bg-white rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                  <img
                    src={sponsorOfWeek[0].logo_url || "/placeholder.svg"}
                    className="w-full h-full object-contain p-24 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    alt={sponsorOfWeek[0].name}
                  />
                  <div className="absolute top-8 left-8">
                    <div className="bg-black text-white p-3 rounded-full">
                      <Crown className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 mb-8 block">
                    Featured Spotlight
                  </span>
                  <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-none">
                    {sponsorOfWeek[0].name}
                  </h2>
                  <p className="text-2xl text-gray-500 mb-10 leading-snug">
                    {sponsorOfWeek[0].short_description}
                  </p>
                  <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-2 group-hover:gap-5 transition-all">
                    Explore Project <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ================= REGISTRY LIST: MINIMALIST ROW LAYOUT ================= */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <div>
              <h2 className="text-4xl font-display font-bold tracking-tighter mb-4">The Registry</h2>
              <p className="text-gray-400">Latest startups verified on UpForge.</p>
            </div>
            <Link href="/startup" className="text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
              View all 3,400+
            </Link>
          </div>

          <div className="divide-y divide-black/5">
            {startups?.map((startup) => (
              <Link 
                key={startup.id} 
                href={`/startup/${startup.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-12 transition-all hover:px-6 hover:bg-black hover:text-white"
              >
                <div className="flex items-center gap-8">
                  <span className="text-[10px] font-bold opacity-30 group-hover:text-white/40">
                    {new Date(startup.created_at).getFullYear()}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tighter transition-all group-hover:translate-x-4">
                    {startup.name}
                  </h3>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center gap-12">
                  <p className="text-sm opacity-50 group-hover:opacity-80 max-w-[200px] line-clamp-1">
                    {startup.short_description}
                  </p>
                  <div className="hidden md:block">
                    <div className="h-10 w-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-white/30">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-40 px-6 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-10">
            Ready to be <span className="text-gray-500 italic">Discovered?</span>
          </h2>
          <Link href="/apply">
            <Button className="rounded-full px-16 h-20 bg-white text-black hover:bg-gray-200 text-sm font-bold uppercase tracking-widest transition-all">
              Apply to the Registry
            </Button>
          </Link>
          <p className="mt-12 text-[10px] font-bold tracking-[0.5em] uppercase opacity-30">
            UpForge · Premium Network
          </p>
        </div>
      </section>
    </div>
  )
}
