import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, ShieldCheck, Zap, Globe, BarChart3, Fingerprint } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "The UpForge Ledger | India's Elite Founder Registry",
  description: "The definitive high-trust registry for India's 1%. UpForge catalogs verified startups and ambitious builders into a permanent digital legacy.",
  openGraph: {
    title: "UpForge | The Legacy Founder Network",
    description: "Not a directory. A pedigree. Discover the startups shaping India's future.",
    images: ["/og-main.jpg"],
  }
}

export default async function Home() {
  const supabase = await createClient()

  // Data Fetching
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
    .limit(3)

  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="relative bg-[#FDFCFB] text-[#0F172A] selection:bg-[#C6A43F]/20 overflow-hidden">
      
      {/* 3D BACKGROUND AMBIENCE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e3a5f0d,transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1e3a5f]/10 to-transparent" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1e3a5f]/10 shadow-sm mb-10 animate-fade-in">
            <ShieldCheck className="h-3.5 w-3.5 text-[#C6A43F]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1e3a5f]">
              Private Beta: The 2026 Founder Cohort
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-light tracking-tight leading-[1.1] text-[#0F172A]">
            The Digital Ledger of <br />
            <span className="font-semibold italic font-serif text-[#1e3a5f]">Indian Founders.</span>
          </h1>

          <p className="mt-8 text-xl text-[#4a4a4a] max-w-2xl mx-auto font-light leading-relaxed">
            UpForge is not a directory. It is a high-trust pedigree. We catalog 
            the architects of India's new economy for investors and elite builders.
          </p>

          <div className="mt-12 flex justify-center gap-6 flex-wrap">
            <Link href="/apply">
              <Button className="rounded-none px-10 h-14 bg-[#0F172A] text-white hover:bg-[#1e3a5f] transition-all text-xs uppercase tracking-widest font-bold shadow-2xl">
                Submit Your Credentials
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button
                variant="outline"
                className="rounded-none px-10 h-14 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
              >
                Access Registry
              </Button>
            </Link>
          </div>

          {/* LIVE METRICS BAR */}
          <div className="mt-20 py-8 border-y border-[#1e3a5f]/5 flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="text-left">
              <div className="text-2xl font-bold text-[#1e3a5f]">3.4K<span className="text-[#C6A43F]">+</span></div>
              <div className="text-[10px] uppercase tracking-tighter text-[#4a4a4a]">Verified Entities</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[#1e3a5f]">70K<span className="text-[#C6A43F]">+</span></div>
              <div className="text-[10px] uppercase tracking-tighter text-[#4a4a4a]">Monthly Interactions</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[#1e3a5f]">₹4.2B<span className="text-[#C6A43F]">+</span></div>
              <div className="text-[10px] uppercase tracking-tighter text-[#4a4a4a]">Combined Valuation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPONSOR OF THE WEEK (THE CROWN JEWEL) ================= */}
      {sponsorOfWeek && sponsorOfWeek.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C6A43F]/30" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C6A43F] font-bold">Luminaries</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C6A43F]/30" />
          </div>

          <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="block relative group">
            <div className="bg-white border border-[#C6A43F]/20 p-1 md:p-2 shadow-2xl overflow-hidden">
              <div className="border border-[#C6A43F]/10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 transition-all group-hover:bg-[#FDFCFB]">
                
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#C6A43F]/5 rounded-full blur-2xl group-hover:bg-[#C6A43F]/10 transition-all" />
                  <img
                    src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                    className="relative h-32 w-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={sponsorOfWeek[0].name}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <Crown className="h-5 w-5 text-[#C6A43F]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C6A43F]">Registry Feature of the Week</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-medium text-[#0F172A] mb-4">
                    {sponsorOfWeek[0].name}
                  </h3>
                  <p className="text-[#4a4a4a] text-lg font-light leading-relaxed max-w-2xl">
                    {sponsorOfWeek[0].short_description || "A cornerstone of the Indian startup ecosystem, demonstrating exceptional growth and founder resilience."}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-[#0F172A]">
                    View Portfolio <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ================= PREMIUM TIERS (GRID) ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1e3a5f]/40 mb-12 text-center md:text-left">
          The Verified Tier
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e3a5f]/10 border border-[#1e3a5f]/10">
          {(sponsored || []).map((startup, index) => (
            <Link key={startup.id} href={`/startup/${startup.slug}`} className="group bg-[#FDFCFB] p-10 hover:bg-white transition-all">
              <div className="flex justify-between items-start mb-8">
                <img
                  src={startup.logo_url || "/placeholder-logo.svg"}
                  className="h-12 w-12 object-contain filter contrast-125"
                  alt={startup.name}
                />
                <span className="text-[10px] font-serif italic text-[#C6A43F]">Record №00{index + 1}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-[#1e3a5f] transition-colors">
                {startup.name}
              </h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed line-clamp-2 font-light">
                {startup.short_description}
              </p>
              <div className="mt-8 pt-6 border-t border-[#1e3a5f]/5 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#C6A43F]">Premium Delegate</span>
                <Fingerprint className="h-4 w-4 text-[#1e3a5f]/20" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= GLOBAL CALL TO ACTION ================= */}
      <section className="relative py-32 bg-[#0F172A] overflow-hidden">
        {/* Abstract 3D shape/glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A43F]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-6xl font-display text-white mb-6">
            Secure Your Place <br /> in <span className="italic font-serif text-[#C6A43F]">Startup History.</span>
          </h3>
          <p className="text-white/50 text-lg mb-12 font-light max-w-xl mx-auto">
            UpForge isn't for everyone. It's for the builders who intend to last. 
            Apply for listing or premium sponsorship.
          </p>
          <Link href="/sponsor">
            <Button className="rounded-none px-12 h-16 bg-[#C6A43F] text-white hover:bg-white hover:text-[#0F172A] transition-all text-xs uppercase tracking-[0.2em] font-bold shadow-2xl">
              Apply for Sponsorship
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 text-center">
        <div className="text-[9px] tracking-[0.6em] uppercase text-[#1e3a5f]/30">
          UpForge Registry · Established 2024 · New Delhi, India
        </div>
      </footer>

    </div>
  )
}
