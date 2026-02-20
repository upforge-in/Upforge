import { createClient } from "@/lib/supabase/server"
import { StartupCard } from "@/components/startup-card"
import { WhyUpforge } from "@/components/why-upforge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Clock, Crown } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "UpForge is India’s premium founder registry. Discover verified startups, rising builders, and sponsored spotlight companies.",
  keywords: [
    "Indian startups",
    "startup directory India",
    "founder registry",
    "startup listing platform",
    "sponsored startup promotion",
  ],
  openGraph: {
    title: "UpForge – India’s Independent Founder Network",
    description:
      "A curated public ledger of serious builders. Verified startups. Real founders.",
    type: "website",
  },
}

export default async function Home() {
  const supabase = await createClient()

  // Sponsored (Top Priority – Monetization Engine)
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .limit(6)
    .order("created_at", { ascending: false })

  // Featured (Editorial Picks)
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .limit(6)
    .order("created_at", { ascending: false })

  // Recent
  const { data: recent } = await supabase
    .from("startups")
    .select("*")
    .limit(6)
    .order("created_at", { ascending: false })

  return (
    <div className="relative bg-[#FAFAF9] text-zinc-900 antialiased overflow-hidden">

      {/* PREMIUM GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.25] pointer-events-none" />

      {/* ================= HERO ================= */}
      <section className="relative pt-44 pb-36 px-6 text-center">
        <div className="max-w-5xl mx-auto">

          <div className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-8">
            UPFORGE · VERIFIED FOUNDER REGISTRY
          </div>

          <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
            India’s Independent
            <span className="block font-semibold">
              Startup Directory.
            </span>
          </h1>

          <p className="mt-10 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Discover serious founders. Sponsor visibility.  
            Build reputation in the new digital economy.
          </p>

          <div className="mt-14 flex justify-center gap-5 flex-wrap">
            <Link href="/apply">
              <Button className="h-12 px-10 rounded-full bg-black hover:bg-zinc-800 text-white text-xs uppercase tracking-[0.25em]">
                List Your Startup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button
                variant="outline"
                className="h-12 px-10 rounded-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs uppercase tracking-[0.25em]"
              >
                Browse Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SPONSORED SECTION ================= */}
      {sponsored && sponsored.length > 0 && (
        <section className="relative py-24 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Crown className="h-5 w-5 text-amber-500" />
            <h2 className="text-xs tracking-[0.35em] uppercase font-semibold">
              Sponsored Spotlight
            </h2>
          </div>

          {/* LOGO-FIRST GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {sponsored.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`}>
                <div className="bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <img
                    src={startup.logo_url}
                    alt={`${startup.name} logo`}
                    className="max-h-12 object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= FEATURED ================= */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto border-t border-zinc-200">
        <div className="flex items-center gap-3 mb-12">
          <Sparkles className="h-5 w-5 text-zinc-500" />
          <h2 className="text-xs tracking-[0.35em] uppercase font-semibold">
            Editorial Picks
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {featured?.map((startup) => (
            <Link key={startup.id} href={`/startup/${startup.slug}`}>
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-lg transition flex items-center justify-center">
                <img
                  src={startup.logo_url}
                  alt={`${startup.name} logo`}
                  className="max-h-12 object-contain grayscale hover:grayscale-0 transition"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= RECENT ================= */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto border-t border-zinc-200">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xs tracking-[0.35em] uppercase font-semibold">
              Recently Added
            </h2>
          </div>

          <Link
            href="/startup"
            className="group text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-black flex items-center gap-2 transition-colors"
          >
            View Full Registry
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {recent?.map((startup) => (
            <Link key={startup.id} href={`/startup/${startup.slug}`}>
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-md transition flex items-center justify-center">
                <img
                  src={startup.logo_url}
                  alt={`${startup.name} logo`}
                  className="max-h-12 object-contain grayscale hover:grayscale-0 transition"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHY UPFORGE ================= */}
      <div className="relative bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <WhyUpforge />
        </div>
      </div>

      {/* ================= SPONSOR CTA ================= */}
      <section className="relative py-28 text-center bg-gradient-to-r from-zinc-900 to-black text-white">
        <h3 className="text-3xl font-semibold mb-6">
          Get Visible. Get Sponsored.
        </h3>
        <p className="text-zinc-400 max-w-xl mx-auto mb-10">
          Don’t get lost in the noise. Feature your startup in our Sponsored
          Spotlight and get promoted across our social channels.
        </p>

        <Link href="/sponsor">
          <Button className="h-12 px-10 rounded-full bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-[0.25em]">
            Sponsor With Us
          </Button>
        </Link>
      </section>

      {/* ================= FOOTER STRIP ================= */}
      <div className="py-10 text-center text-[10px] tracking-[0.4em] uppercase text-zinc-400">
        UpForge · Independent · Curated · Founder First · 2026
      </div>

    </div>
  )
}
