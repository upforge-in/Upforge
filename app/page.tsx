import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, Sparkles } from "lucide-react"
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
    <div className="bg-[#FAFAF9] text-zinc-900">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-zinc-500 mb-6">
            UPFORGE · VERIFIED FOUNDER REGISTRY
          </div>

          <h1 className="text-5xl md:text-6xl font-light leading-tight">
            Discover India’s
            <span className="block font-semibold">
              Rising Startups.
            </span>
          </h1>

          <p className="mt-8 text-zinc-600 max-w-xl mx-auto">
            A curated directory of serious founders.
            Sponsor visibility. Build authority.
          </p>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Link href="/apply">
              <Button className="rounded-full px-8 h-11 bg-black text-white text-xs uppercase tracking-widest">
                List Startup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button
                variant="outline"
                className="rounded-full px-8 h-11 text-xs uppercase tracking-widest"
              >
                Browse Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SPONSOR OF THE WEEK ================= */}
      {sponsorOfWeek && sponsorOfWeek.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center gap-2 mb-8">
            <Crown className="h-4 w-4 text-amber-500" />
            <h2 className="text-xs uppercase tracking-[0.35em] font-semibold">
              Sponsor of the Week
            </h2>
          </div>

          <Link href={`/startup/${sponsorOfWeek[0].slug}`}>
            <div className="bg-white border-2 border-amber-400 rounded-2xl p-8 flex items-center gap-6 hover:shadow-xl transition">
              <img
                src={sponsorOfWeek[0].logo_url}
                className="h-16 w-16 object-contain"
                alt=""
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {sponsorOfWeek[0].name}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Featured premium visibility startup.
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ================= TOP 10 SPONSORED ================= */}
      {sponsored && sponsored.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center gap-2 mb-10">
            <Crown className="h-4 w-4 text-amber-500" />
            <h2 className="text-xs uppercase tracking-[0.35em] font-semibold">
              Top Sponsored
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sponsored.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`}>
                <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition hover:border-amber-400">
                  <img
                    src={startup.logo_url}
                    className="h-10 w-10 object-contain"
                    alt=""
                  />
                  <span className="text-sm font-medium">
                    {startup.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= TOP 10 FEATURED ================= */}
      {featured && featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <div className="flex items-center gap-2 mb-10">
            <Sparkles className="h-4 w-4 text-zinc-500" />
            <h2 className="text-xs uppercase tracking-[0.35em] font-semibold">
              Editorial Picks
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`}>
                <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition hover:border-black">
                  <img
                    src={startup.logo_url}
                    className="h-10 w-10 object-contain"
                    alt=""
                  />
                  <span className="text-sm font-medium">
                    {startup.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-black text-white">
        <h3 className="text-2xl font-semibold mb-4">
          Get Featured on UpForge
        </h3>
        <p className="text-zinc-400 mb-8">
          Increase visibility. Build trust. Reach serious builders.
        </p>

        <Link href="/sponsor">
          <Button className="rounded-full px-8 h-11 bg-white text-black text-xs uppercase tracking-widest">
            Sponsor Now
          </Button>
        </Link>
      </section>

      <div className="py-8 text-center text-[10px] tracking-[0.4em] uppercase text-zinc-400">
        UpForge · Founder First · 2026
      </div>
    </div>
  )
}
