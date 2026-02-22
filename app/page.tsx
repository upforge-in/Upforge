import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, Sparkles, Users, TrendingUp, Award } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Elite Founder Network",
  description:
    "Discover India's rising startups. Get visibility. Build authority. Join the premium founder registry.",
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
    .limit(8)

  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <div className="bg-[#050505] text-white overflow-hidden relative">

      {/* GLOBAL BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1e3a5f40,transparent_40%),radial-gradient(circle_at_80%_80%,#c6a43f30,transparent_40%)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10">

        {/* ================= HERO ================= */}
        <section className="pt-40 pb-32 px-6 text-center">
          <div className="max-w-5xl mx-auto">

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <Award className="h-4 w-4 text-[#c6a43f]" />
              <span className="text-xs tracking-[0.3em] uppercase text-white/70">
                India's Independent Registry
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              The Future of <br />
              <span className="bg-gradient-to-r from-[#1e3a5f] to-[#c6a43f] bg-clip-text text-transparent">
                Founder Authority
              </span>
            </h1>

            <p className="mt-8 text-lg text-white/60 max-w-2xl mx-auto">
              3,000+ verified startups. 500+ sponsored.  
              India's fastest growing founder visibility platform.
            </p>

            <div className="mt-12 flex justify-center gap-6 flex-wrap">
              <Link href="/apply">
                <Button className="h-14 px-10 rounded-full bg-[#1e3a5f] hover:bg-[#162c47] text-white shadow-xl shadow-[#1e3a5f]/40 transition-all hover:scale-105">
                  List Your Startup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/startup">
                <Button
                  variant="outline"
                  className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/5 transition-all hover:scale-105"
                >
                  Explore Directory
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex justify-center gap-12 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#c6a43f]" />
                3,000+ Startups
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#c6a43f]" />
                10,000+ Monthly Visitors
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#c6a43f]" />
                500+ Sponsored
              </div>
            </div>

          </div>
        </section>

        {/* ================= SPONSOR OF WEEK ================= */}
        {sponsorOfWeek && sponsorOfWeek.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 pb-32">
            <div className="mb-10 flex items-center gap-3">
              <Crown className="h-5 w-5 text-[#c6a43f]" />
              <h2 className="uppercase text-xs tracking-[0.4em] text-white/60">
                Sponsor of the Week
              </h2>
            </div>

            <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="group block">
              <div className="relative rounded-3xl border border-[#c6a43f]/40 bg-gradient-to-br from-white/5 to-white/[0.02] p-10 backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 shadow-2xl shadow-[#c6a43f]/10">

                <div className="flex flex-col md:flex-row gap-10 items-center">

                  <img
                    src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                    className="h-28 w-28 object-contain bg-white rounded-2xl p-4"
                    alt={sponsorOfWeek[0].name}
                  />

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-4xl font-semibold">
                      {sponsorOfWeek[0].name}
                    </h3>

                    <p className="mt-4 text-white/60 max-w-xl">
                      {sponsorOfWeek[0].short_description ||
                        "Premium startup driving innovation in India's ecosystem."}
                    </p>

                    <div className="mt-6 inline-flex px-4 py-1 text-xs uppercase tracking-widest bg-[#c6a43f]/20 text-[#c6a43f] rounded-full">
                      Elite Sponsor
                    </div>
                  </div>

                  <div className="text-[#c6a43f] font-medium flex items-center gap-2">
                    View <ArrowRight className="h-4 w-4" />
                  </div>

                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ================= GRID SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-32 grid md:grid-cols-2 gap-20">

          {/* Sponsored */}
          {sponsored && sponsored.length > 0 && (
            <div>
              <h2 className="mb-8 text-sm uppercase tracking-[0.3em] text-white/50">
                Sponsored Startups
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sponsored.map((startup) => (
                  <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#c6a43f]/50 hover:bg-white/[0.06] transition-all duration-300 h-full">

                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={startup.logo_url || "/placeholder-logo.svg"}
                          className="h-12 w-12 object-contain bg-white rounded-lg"
                          alt={startup.name}
                        />
                        <h3 className="font-medium group-hover:text-[#c6a43f] transition">
                          {startup.name}
                        </h3>
                      </div>

                      {startup.short_description && (
                        <p className="text-sm text-white/50 line-clamp-2">
                          {startup.short_description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Featured */}
          {featured && featured.length > 0 && (
            <div>
              <h2 className="mb-8 text-sm uppercase tracking-[0.3em] text-white/50">
                Editorial Picks
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featured.map((startup) => (
                  <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#1e3a5f]/50 hover:bg-white/[0.06] transition-all duration-300 h-full">

                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={startup.logo_url || "/placeholder-logo.svg"}
                          className="h-12 w-12 object-contain bg-white rounded-lg"
                          alt={startup.name}
                        />
                        <h3 className="font-medium group-hover:text-[#1e3a5f] transition">
                          {startup.name}
                        </h3>
                      </div>

                      {startup.short_description && (
                        <p className="text-sm text-white/50 line-clamp-2">
                          {startup.short_description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-32 text-center bg-gradient-to-r from-[#1e3a5f] to-[#111827]">
          <h3 className="text-4xl font-semibold mb-6">
            Ready to Build Authority?
          </h3>
          <p className="text-white/70 mb-10 max-w-xl mx-auto">
            Get premium placement. Gain visibility. Join India’s most serious founder network.
          </p>

          <Link href="/sponsor">
            <Button className="h-14 px-12 rounded-full bg-[#c6a43f] hover:bg-[#a8892f] text-black font-semibold shadow-2xl transition-all hover:scale-105">
              Sponsor Your Startup
            </Button>
          </Link>
        </section>

      </div>
    </div>
  )
}
