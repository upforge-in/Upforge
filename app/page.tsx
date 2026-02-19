import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { WhyUpforge } from "@/components/why-upforge"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Globe } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  // Logic remains the same to preserve functionality
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .limit(3)
    .order("created_at", { ascending: false })

  const { data: trending } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", false)
    .limit(6)
    .order("created_at", { ascending: false })

  return (
    <div className="relative overflow-hidden bg-white">
      {/* SECTION 1: EDITORIAL HERO */}
      <Hero />

      {/* LIVE VERIFICATION STATS - Instant Trust Builder */}
      <div className="border-y border-slate-100 bg-slate-50/50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Verified Data Points", value: "25,000+", icon: ShieldCheck },
              { label: "Active Founders", value: "850+", icon: Zap },
              { label: "Capital Tracked", value: "$2.4B+", icon: Globe },
              { label: "Update Frequency", value: "Real-time", icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-indigo-600">
                  <stat.icon className="h-4 w-4" />
                  <span className="text-sm font-black uppercase tracking-widest">{stat.value}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: PREMIUM ENTRIES (Sponsored) */}
      <section className="relative py-32 px-6 overflow-hidden bg-slate-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="h-3 w-3 fill-amber-500" /> Featured Registry
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-slate-900">
                Premium Network <span className="text-indigo-600 italic">Entries.</span>
              </h2>
            </div>
            <p className="max-w-md text-slate-500 font-medium leading-relaxed text-sm">
              Hand-vetted startups currently leading innovation within the Indian ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {sponsored?.map((startup) => (
              <div key={startup.id} className="transition-transform duration-500 hover:-translate-y-2">
                <SponsoredCard startup={startup} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER: WHY UPFORGE */}
      <div className="bg-white border-y border-slate-100 py-10">
        <WhyUpforge />
      </div>

      {/* SECTION 3: THE DIRECTORY (Trending) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-slate-100 pb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-slate-900">
              Trending <br/> <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Networks</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed">
              Real-time monitoring of the most influential startups within our verified ecosystem.
            </p>
          </div>
          
          <Link 
            href="/startup" 
            className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 transition-all hover:tracking-[0.3em]"
          >
            Access Full Database
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {trending?.map((startup) => (
            <div key={startup.id} className="group relative">
              <div className="absolute -inset-4 rounded-3xl bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <StartupCard startup={startup} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/startup">
            <Button className="group h-14 px-10 rounded-full bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-500 shadow-xl">
              <span className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em]">
                Explore Entire Registry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </span>
            </Button>
          </Link>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
             <div className="h-[1px] w-8 bg-slate-200" />
             Data verified as of Feb 2026
             <div className="h-[1px] w-8 bg-slate-200" />
          </div>
        </div>
      </section>

      {/* PREMIUM TRUST MARQUEE */}
      <div className="border-t border-slate-100 bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Trusted By Leading Capital Firms</span>
            <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40">
              {['SEQUOIA', 'ACCEL', 'BLUME', 'YCOMBINATOR', 'MATRIX'].map((partner) => (
                <span key={partner} className="font-display text-xl font-black tracking-tighter text-slate-900">{partner}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
