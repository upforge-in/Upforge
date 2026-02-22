import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, Crown, Sparkles, Users, TrendingUp, 
  ChevronRight, ArrowUpRight 
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description: "Discover India’s rising startups. Get visibility in the premium founder registry.",
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

  // Top Sponsored
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <div className="bg-white text-black selection:bg-black selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              {/* Minimalist Badge */}
              <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
                <span className="h-1 w-8 bg-black"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">
                  Verified Founder Registry
                </span>
              </div>

              <h1 className="text-6xl md:text-[100px] leading-[0.9] font-display font-bold tracking-tighter mb-8 animate-slide-up">
                Building the <br /> 
                <span className="text-gray-400">Next India.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 max-w-xl leading-tight mb-12 animate-slide-up [animation-delay:100ms]">
                UpForge is the definitive directory for India's most ambitious builders. 
                Where authority meets discovery.
              </p>

              <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:200ms]">
                <Link href="/apply">
                  <Button className="rounded-full px-10 h-14 bg-black text-white hover:bg-gray-800 transition-all text-sm font-bold uppercase tracking-widest">
                    Apply Now
                  </Button>
                </Link>
                <Link href="/startup">
                  <Button variant="ghost" className="rounded-full px-8 h-14 text-black hover:bg-gray-100 text-sm font-bold uppercase tracking-widest">
                    Explore Directory <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Asymmetrical Stats Card */}
            <div className="w-full md:w-72 mt-12 md:mt-0 animate-fade-in [animation-delay:300ms]">
              <div className="p-8 border-l border-black/10 space-y-12">
                <div>
                  <span className="block text-4xl font-display font-bold">3K+</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Startups</span>
                </div>
                <div>
                  <span className="block text-4xl font-display font-bold">10K+</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Visitors</span>
                </div>
                <div>
                  <span className="block text-4xl font-display font-bold">500+</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Sponsors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPONSOR OF THE WEEK ================= */}
      {sponsorOfWeek?.[0] && (
        <section className="py-24 px-6 bg-[#fcfcfc] border-y border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase opacity-30">Featured Spotlight</h2>
              <Link href="/sponsor" className="text-[10px] font-bold uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity">
                Partner with us
              </Link>
            </div>

            <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="group block">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="relative w-full md:w-1/2 aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={sponsorOfWeek[0].logo_url || "/placeholder.svg"}
                    className="w-full h-full object-center p-20 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    alt={sponsorOfWeek[0].name}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <Crown className="h-4 w-4 text-black" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Sponsor of the Week</span>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 group-hover:translate-x-3 transition-transform duration-500">
                    {sponsorOfWeek[0].name}
                  </h3>
                  <p className="text-xl text-gray-500 leading-snug mb-8 max-w-md">
                    {sponsorOfWeek[0].short_description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                    View Project <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ================= DIRECTORY GRID ================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-display font-bold tracking-tighter mb-4">Latest Additions</h2>
            <p className="text-gray-500">Rising startups joining the registry today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {sponsored?.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                <div className="space-y-6">
                  <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden p-12 border border-black/5 group-hover:border-black/20 transition-colors">
                    <img
                      src={startup.logo_url || "/placeholder.svg"}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      alt={startup.name}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold tracking-tight mb-1">{startup.name}</h4>
                    <p className="text-sm text-gray-400 line-clamp-1 mb-4">{startup.short_description}</p>
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER MINI ================= */}
      <footer className="py-20 px-6 border-t border-black/5 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-20">
          UpForge · India · 2026
        </p>
      </footer>
    </div>
  )
}
