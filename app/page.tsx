import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, Sparkles, Users, TrendingUp, Award, ShieldCheck } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Verified Founder Network & Startup Registry",
  description:
    "UpForge is India’s independent founder network — a curated public registry of verified founders and high-signal startups. Build reputation. Gain visibility. Establish credibility.",
  keywords: [
    "Indian startups",
    "founder network India",
    "startup directory India",
    "verified founders",
    "startup registry",
    "Indian entrepreneurs",
    "sponsor startup India",
  ],
  openGraph: {
    title: "UpForge | India’s Verified Founder Network",
    description:
      "A curated public registry of India’s serious founders and high-signal startups.",
    type: "website",
    url: "https://upforge.in",
  },
}

export default async function Home() {
  const supabase = await createClient()

  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(10)

  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(10)

  const { count: totalStartups } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true })

  const { count: totalSponsored } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true })
    .eq("is_sponsored", true)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UpForge",
    url: "https://upforge.in",
    description:
      "India’s independent founder network and curated startup registry.",
    sameAs: [],
  }

  return (
    <div className="relative bg-[#fbf9f6] text-[#1e1b1b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <div className="relative">

        <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
          <div className="max-w-5xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 mb-8">
              <ShieldCheck className="h-4 w-4 text-[#1e3a5f]" />
              <span className="text-xs font-medium text-[#1e3a5f] tracking-wide">
                INDIA'S VERIFIED FOUNDER REGISTRY
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#1e1b1b]">
              India’s Independent
              <span className="block font-semibold text-[#1e3a5f]">
                Founder Network
              </span>
            </h1>

            <p className="mt-6 text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              A curated public registry of verified founders and high-signal startups.
              Built for long-term reputation, credibility, and ecosystem visibility.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link href="/apply">
                <Button className="rounded-full px-8 h-12 bg-[#1e3a5f] text-white hover:bg-[#14304a] transition-all text-sm font-medium shadow-lg shadow-[#1e3a5f]/20">
                  Request Listing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/startup">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 hover:border-[#1e3a5f]/50 transition-all text-sm font-medium"
                >
                  Browse Registry
                </Button>
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-10 text-sm text-[#4a4a4a]">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#1e3a5f]" />
                <span>{totalStartups || 0}+ Verified Startups</span>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#1e3a5f]" />
                <span>{totalSponsored || 0}+ Sponsored</span>
              </div>

              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#1e3a5f]" />
                <span>Growing Monthly</span>
              </div>
            </div>

            <div className="mt-6 w-full max-w-md mx-auto">
              <div className="h-1 bg-[#1e3a5f]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#1e3a5f] w-4/5 animate-pulse" />
              </div>
              <p className="text-xs text-[#4a4a4a] mt-2">
                Registry growth accelerating
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-[#1e3a5f]/10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#4a4a4a]">
                PUBLIC · VERIFIED · FOUNDER FIRST
              </p>
            </div>

          </div>
        </section>

        {sponsorOfWeek && sponsorOfWeek.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="flex items-center gap-3 mb-8">
              <Crown className="h-5 w-5 text-[#c6a43f]" />
              <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#4a4a4a]">
                Sponsor of the Week
              </h2>
            </div>

            <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="block group">
              <div className="bg-white border border-[#c6a43f]/30 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.01]">

                <img
                  src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                  className="h-24 w-24 object-contain rounded-xl bg-white p-3 shadow-md"
                  alt={sponsorOfWeek[0].name}
                />

                <div className="flex-1 text-left">
                  <h3 className="text-3xl font-light text-[#1e1b1b]">
                    {sponsorOfWeek[0].name}
                  </h3>
                  <p className="text-[#4a4a4a] mt-2 line-clamp-2 max-w-xl">
                    {sponsorOfWeek[0].short_description}
                  </p>
                  <span className="text-xs mt-3 inline-block px-3 py-1 bg-[#c6a43f]/10 text-[#c6a43f] rounded-full">
                    Premium Sponsor
                  </span>
                </div>

                <span className="text-sm font-medium text-[#c6a43f] flex items-center gap-1">
                  View Startup <ArrowRight className="h-4 w-4" />
                </span>

              </div>
            </Link>
          </section>
        )}

        <div className="py-8 text-center text-[10px] tracking-[0.4em] uppercase text-[#4a4a4a] border-t border-[#1e3a5f]/10">
          UpForge · Founder First · 2026
        </div>

      </div>
    </div>
  )
}
