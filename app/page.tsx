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
  Sparkle,
  Hexagon,
  CircleDot,
  Fingerprint
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
      {/* Premium gradient orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/30 rounded-full blur-3xl" />

      {/* SECTION 1: PREMIUM HERO WITH COLOR ACCENTS */}
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 shadow-sm">
                <Fingerprint className="h-4 w-4 text-indigo-600" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  The Founder's Benchmark
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.1]">
                The elite ecosystem for India's most 
                <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                  ambitious builders.
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
                Vetted startups, verified founders, and institutional‑grade networking. 
                <span className="block mt-2 text-indigo-600 font-medium">Every status symbol dreams of being listed here.</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="group h-12 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold uppercase tracking-[0.15em] shadow-lg shadow-indigo-200 transition-all duration-300">
                  Join the registry
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="h-12 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-200 text-xs font-semibold uppercase tracking-[0.15em] transition-all">
                  View featured
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent rounded-3xl" />
              <div className="grid grid-cols-2 gap-4 p-6 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl shadow-indigo-500/10">
                {[ 
                  { label: 'Vetted startups', value: '500+', icon: Shield, color: 'indigo' },
                  { label: 'Verified founders', value: '850+', icon: Users, color: 'purple' },
                  { label: 'Capital tracked', value: '$2.4B', icon: TrendingUp, color: 'blue' },
                  { label: 'Network events', value: '48/yr', icon: Zap, color: 'pink' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col p-5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 transition-all shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                        <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
                      </div>
                      <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                    </div>
                    <span className="text-[0.7rem] font-medium text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
              {/* Decorative element */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS – LIVE VERIFICATION WITH COLOR */}
      <div className="border-y border-slate-100 bg-gradient-to-r from-indigo-50/30 via-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 uppercase tracking-widest">
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

      {/* SECTION 2: FEATURED STARTUPS (SPONSORED) WITH PREMIUM CARDS */}
      <section className="py-28 px-6 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-transparent pointer-events-none" />
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 mb-6 shadow-sm">
            <Award className="h-4 w-4 text-amber-600" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-widest bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              The Vetted Few
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 max-w-2xl mx-auto">
            Hand‑picked startups leading the next 
            <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-1">
              wave of innovation.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsored?.map((startup, index) => (
            <div 
              key={startup.id} 
              className="group relative"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-b from-indigo-100 via-purple-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
              <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500">
                <SponsoredCard startup={startup} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY UPFORGE – REFINED WITH COLOR GRADIENTS */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <WhyUpforge />
        </div>
      </div>

      {/* SECTION 3: LIVE NETWORK (TRENDING) WITH ENHANCED CARDS */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Real‑time index
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
              Trending 
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-1">
                networks today.
              </span>
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
              <div className="relative bg-white rounded-xl border border-slate-100 p-5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
                <StartupCard startup={startup} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/startup">
            <Button className="group h-11 px-7 rounded-full bg-gradient-to-r from-slate-900 to-indigo-900 hover:from-indigo-900 hover:to-purple-900 text-white text-[0.7rem] font-semibold uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 transition-all duration-300">
              Explore entire registry
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-6 text-[0.65rem] font-medium text-slate-400 uppercase tracking-wider">
            Data verified · February 2026
          </p>
        </div>
      </section>

      {/* TRUST MARQUEE – PREMIUM PARTNERS WITH COLOR */}
      <div className="border-t border-slate-100 bg-gradient-to-r from-indigo-50/20 via-white to-purple-50/20 py-16">
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

      {/* FOOTER NOTE – EXCLUSIVITY WITH PREMIUM TOUCH */}
      <div className="border-t border-slate-100 bg-gradient-to-r from-indigo-50/30 via-white to-purple-50/30 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2">
            <Hexagon className="h-3 w-3 text-indigo-400" />
            <p className="text-[0.65rem] font-medium text-slate-400 uppercase tracking-widest">
              Invite‑only for verified founders · 850+ members and growing
            </p>
            <CircleDot className="h-3 w-3 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
