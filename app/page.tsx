import { createClient } from "@/lib/supabase/server"
import { StartupCard } from "@/components/startup-card"
import { WhyUpforge } from "@/components/why-upforge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Clock } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  // Fetch 3 Top (Featured) Startups
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .limit(3)
    .order("created_at", { ascending: false })

  // Fetch 3 Recent Startups
  const { data: recent } = await supabase
    .from("startups")
    .select("*")
    .limit(3)
    .order("created_at", { ascending: false })

  return (
    <div className="bg-[#F8F8F6] text-zinc-900 antialiased">

      {/* ================= HERO ================= */}
      <section className="pt-44 pb-36 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-8">
            Upforge · Founder Registry
          </div>

          <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
            India’s Independent
            <span className="block font-semibold">
              Founder Network.
            </span>
          </h1>

          <p className="mt-10 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            A curated public ledger of serious builders.  
            Verified startups. Real founders. Long-term reputation.
          </p>

          <div className="mt-14 flex justify-center gap-5 flex-wrap">
            <Link href="/apply">
              <Button className="h-12 px-10 rounded-full bg-black hover:bg-zinc-800 text-white text-xs uppercase tracking-[0.25em]">
                Request Listing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button
                variant="outline"
                className="h-12 px-10 rounded-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs uppercase tracking-[0.25em]"
              >
                Browse Registry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TOP STARTUPS (3) ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-2xl font-bold tracking-tight uppercase text-xs tracking-[0.3em]">Top Builders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured?.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </section>

      {/* ================= RECENT STARTUPS (3) ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-zinc-400" />
            <h2 className="text-2xl font-bold tracking-tight uppercase text-xs tracking-[0.3em]">Recently Added</h2>
          </div>
          
          <Link
            href="/startup"
            className="group text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-black flex items-center gap-2 transition-colors"
          >
            View All Registry
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recent?.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </section>

      {/* ================= WHY UPFORGE ================= */}
      <div className="bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <WhyUpforge />
        </div>
      </div>

      {/* ================= FINAL STRIP ================= */}
      <div className="py-12 text-center text-[10px] tracking-[0.4em] uppercase text-zinc-400">
        Upforge · Invite-only · Verified Founder Registry · 2026
      </div>

    </div>
  )
}
