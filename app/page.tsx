import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { WhyUpforge } from "@/components/why-upforge"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  // Section 2: Fetch Sponsored Startups (Top 3)
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .limit(3)
    .order("created_at", { ascending: false })

  // Section 3: Fetch Trending/Regular Startups (Next 6)
  const { data: trending } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", false)
    .limit(6)
    .order("created_at", { ascending: false })

  return (
    <div className="relative overflow-hidden bg-white">
      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: SPONSORED STARTUPS */}
      <section className="relative py-24 px-6 overflow-hidden bg-slate-50/30">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50/50 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-amber-50 rounded-xl shadow-sm border border-amber-100">
              <Sparkles className="h-6 w-6 text-amber-500 fill-amber-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Sponsored Startups
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsored?.map((startup) => (
              <SponsoredCard key={startup.id} startup={startup} />
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER: WHY UPFORGE */}
      <div className="bg-white border-y border-slate-100">
        <WhyUpforge />
      </div>

      {/* SECTION 3: TRENDING STARTUPS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                Trending Networks
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-lg max-w-xl">
              The most influential startups currently verified within the UpForge ecosystem.
            </p>
          </div>
          
          <Link 
            href="/startup" 
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-600 transition-all hover:gap-4"
          >
            View Full Directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trending?.map((startup) => (
            <div key={startup.id} className="transition-all duration-300 hover:-translate-y-1">
              <StartupCard startup={startup} />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/startup">
            <Button className="group relative h-16 px-12 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-300 shadow-2xl shadow-slate-200 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                Explore All Startups
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          <p className="mt-6 text-sm font-medium text-slate-400">Join 500+ founders building the future of India</p>
        </div>
      </section>

      {/* PREMIUM TRUST CALLOUT */}
      <div className="border-t border-slate-100 bg-slate-50/50 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-slate-600 font-bold">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>New startups verified Daily</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="font-mono text-sm font-black tracking-tighter text-slate-900">SEQUOIA</span>
            <span className="font-mono text-sm font-black tracking-tighter text-slate-900">ACCEL</span>
            <span className="font-mono text-sm font-black tracking-tighter text-slate-900">BLUME</span>
            <span className="font-mono text-sm font-black tracking-tighter text-slate-900">YCOMBINATOR</span>
          </div>
        </div>
      </div>
    </div>
  )
}
