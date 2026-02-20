import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { WhyUpforge } from "@/components/why-upforge"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  CheckCircle,
  Award,
  Sparkle 
} from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

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
    <div className="relative bg-white overflow-hidden font-sans antialiased">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      {/* SECTION 1: EDITORIAL HERO */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
                <Sparkle className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-indigo-600">
                  The Founder's Benchmark
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.1]">
                The elite ecosystem for India's most 
                <span className="font-bold text-indigo-600 block mt-2">ambitious builders.</span>
              </h1>
              <p className="text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
                Vetted startups, verified founders, and institutional‑grade networking. 
                Every status symbol dreams of being listed here.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="group h-12 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold uppercase tracking-[0.15em] shadow-lg shadow-indigo-200 transition-all duration-300">
                  Join the registry
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="h-12 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold uppercase tracking-[0.15em]">
                  View featured
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-3xl" />
              <div className="grid grid-cols-2 gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-2xl shadow-indigo-500/5">
                {[ 
                  { label: 'Vetted startups', value: '500+', icon: Shield },
                  { label: 'Verified founders', value: '850+', icon: Users },
                  { label: 'Capital tracked', value: '$2.4B', icon: TrendingUp },
                  { label: 'Network events', value: '48/yr', icon: Zap },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col p-4 rounded-2xl bg-white border border-slate-100">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <stat.icon className="h-4 w-4" />
                      <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                    </div>
                    <span className="text-[0.7rem] font-medium text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS – LIVE VERIFICATION */}
      <div className="border-y border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-xs font-medium text-slate-400 uppercase tracking-widest">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>Live verification · Updated daily</span>
            </div>
            <div className="flex items-center gap-8">
              {['SEQUOIA', 'ACCEL', 'BLUME', 'Y COMBINATOR'].map((partner) => (
                <span key={partner} className="text-sm font-black tracking-tight text-slate-900 opacity-30 hover:opacity-60 transition">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FEATURED STARTUPS (SPONSORED) */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/50 mb-6">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-amber-600">
              The Vetted Few
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 max-w-2xl mx-auto">
            Hand‑picked startups leading the next 
            <span className="font-bold text-indigo-600 block mt-1">wave of innovation.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsored?.map((startup, index) => (
            <div 
              key={startup.id} 
              className="group relative"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-b from-indigo-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-500">
                <SponsoredCard startup={startup} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY UPFORGE – MINIMAL VALUE PROPS */}
      <div className="bg-slate-50/40 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <WhyUpforge />
        </div>
      </div>

      {/* SECTION 3: LIVE NETWORK (TRENDING) */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Real‑time index
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
              Trending 
              <span className="font-bold text-indigo-600 block mt-1">networks today.</span>
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              The most influential startups in our ecosystem, updated in real time.
            </p>
          </div>
          <Link 
            href="/startup" 
            className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition"
          >
            View full directory
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {trending?.map((startup) => (
            <div key={startup.id} className="group">
              <div className="relative bg-white rounded-xl border border-slate-100 p-5 hover:border-indigo-100 hover:shadow-md transition-all duration-300">
                <StartupCard startup={startup} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/startup">
            <Button className="group h-11 px-7 rounded-full bg-slate-900 hover:bg-indigo-600 text-white text-[0.7rem] font-semibold uppercase tracking-[0.2em] shadow-lg transition-all duration-300">
              Explore entire registry
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-6 text-[0.65rem] font-medium text-slate-400 uppercase tracking-wider">
            Data verified · February 2026
          </p>
        </div>
      </section>

      {/* TRUST MARQUEE – PREMIUM PARTNERS */}
      <div className="border-t border-slate-100 bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-10">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Trusted by leading capital firms
            </span>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              {['SEQUOIA', 'ACCEL', 'BLUME', 'MATRIX', 'YCOMBINATOR'].map((partner) => (
                <span 
                  key={partner} 
                  className="text-lg md:text-xl font-black tracking-tight text-slate-900 opacity-20 hover:opacity-40 transition"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE – EXCLUSIVITY */}
      <div className="border-t border-slate-100 bg-slate-50/30 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-medium text-slate-400 uppercase tracking-widest">
            Invite‑only for verified founders · 850+ members and growing
          </p>
        </div>
      </div>
    </div>
  )
}
