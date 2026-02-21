import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, Sparkles, Users, TrendingUp, Award } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "Discover India’s rising startups. Sponsor your startup. Get visibility in the premium founder registry.",
}

export default async function Home() {
  const supabase = await createClient()

  // Sponsor of the Week (Top 1 newest sponsored)
  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  // Top 10 Sponsored
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(10)

  // Top 10 Featured
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="relative bg-[#fafafa] text-zinc-900">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative">
        {/* ================= HERO ================= */}
        <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-8">
              <Award className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-800 tracking-wide">
                INDIA'S VERIFIED FOUNDER REGISTRY
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight">
              Discover India’s
              <span className="block font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
                Rising Startups.
              </span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto">
              A premium directory where serious founders gain visibility, build authority, 
              and connect with India’s most ambitious builders.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link href="/apply">
                <Button className="rounded-full px-8 h-12 bg-black text-white hover:bg-zinc-800 transition-all text-sm font-medium shadow-lg shadow-black/10">
                  List Your Startup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/startup">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-400 transition-all text-sm font-medium"
                >
                  Browse Directory
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>500+ Founders</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>50+ Sponsored</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SPONSOR OF THE WEEK ================= */}
        {sponsorOfWeek && sponsorOfWeek.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-full bg-amber-100">
                <Crown className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-zinc-500">
                Sponsor of the Week
              </h2>
            </div>

            <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="block group">
              <div className="relative bg-white border-2 border-amber-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 hover:shadow-2xl transition-all duration-300 hover:border-amber-400 group-hover:scale-[1.01]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200 to-amber-100 rounded-3xl blur opacity-30 group-hover:opacity-50 transition" />
                
                <div className="relative flex items-center gap-6 w-full md:w-auto">
                  <img
                    src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                    className="h-20 w-20 object-contain rounded-xl bg-white p-2 shadow-md"
                    alt={sponsorOfWeek[0].name}
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-zinc-900">
                      {sponsorOfWeek[0].name}
                    </h3>
                    <p className="text-zinc-500 mt-1 line-clamp-2">
                      {sponsorOfWeek[0].short_description || "Featured premium visibility startup making waves in the ecosystem."}
                    </p>
                  </div>
                </div>
                
                <div className="relative ml-auto">
                  <span className="text-sm font-medium text-amber-600 flex items-center gap-1">
                    View Startup <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ================= TOP 10 SPONSORED ================= */}
        {sponsored && sponsored.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-full bg-amber-50">
                <Crown className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-zinc-500">
                Top Sponsored Startups
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sponsored.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                  <div className="bg-white rounded-2xl border border-zinc-200 p-5 hover:shadow-xl transition-all duration-200 hover:border-amber-300 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={startup.logo_url || "/placeholder-logo.svg"}
                        className="h-12 w-12 object-contain rounded-lg bg-white"
                        alt={startup.name}
                      />
                      <h3 className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                        {startup.name}
                      </h3>
                    </div>
                    {startup.short_description && (
                      <p className="text-sm text-zinc-500 line-clamp-2">
                        {startup.short_description}
                      </p>
                    )}
                    <div className="mt-auto pt-3 text-xs text-amber-600 font-medium">
                      Sponsored
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= TOP 10 FEATURED ================= */}
        {featured && featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-full bg-zinc-100">
                <Sparkles className="h-5 w-5 text-zinc-600" />
              </div>
              <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-zinc-500">
                Editorial Picks
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                  <div className="bg-white rounded-2xl border border-zinc-200 p-5 hover:shadow-xl transition-all duration-200 hover:border-black h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={startup.logo_url || "/placeholder-logo.svg"}
                        className="h-12 w-12 object-contain rounded-lg bg-white"
                        alt={startup.name}
                      />
                      <h3 className="font-semibold text-zinc-900 group-hover:text-black transition-colors line-clamp-1">
                        {startup.name}
                      </h3>
                    </div>
                    {startup.short_description && (
                      <p className="text-sm text-zinc-500 line-clamp-2">
                        {startup.short_description}
                      </p>
                    )}
                    <div className="mt-auto pt-3 text-xs text-zinc-500 font-medium">
                      Featured
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= WHY UPFORGE ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-black/5 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Founder First</h3>
              <p className="text-sm text-zinc-500">Join a network of serious builders, not just a listing.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-black/5 mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Amplified Visibility</h3>
              <p className="text-sm text-zinc-500">Sponsored startups get social media promotion and prime placement.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-black/5 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Trust & Credibility</h3>
              <p className="text-sm text-zinc-500">Every founder is verified, ensuring a premium directory.</p>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-28 text-center bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          <div className="relative max-w-3xl mx-auto px-6">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              Get Featured on UpForge
            </h3>
            <p className="text-zinc-400 mb-8 text-lg">
              Increase visibility, build trust, and reach serious builders across India.
            </p>

            <Link href="/sponsor">
              <Button className="rounded-full px-10 h-14 bg-white text-black hover:bg-zinc-100 text-sm uppercase tracking-widest font-semibold shadow-xl">
                Sponsor Your Startup
              </Button>
            </Link>
          </div>
        </section>

        <div className="py-8 text-center text-[10px] tracking-[0.4em] uppercase text-zinc-400 border-t border-zinc-200">
          UpForge · Founder First · 2026
        </div>
      </div>
    </div>
  )
}
