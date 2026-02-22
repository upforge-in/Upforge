import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, ShieldCheck, Activity, Globe, Landmark } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | The Institutional Registry for Indian Founders",
  description: "The definitive ledger of high-growth startups and verified founders in India.",
}

export default async function Home() {
  const supabase = await createClient()

  // Data fetching (keep same as before)
  const { data: sponsorOfWeek } = await supabase.from("startups").select("*").eq("is_sponsored", true).order("created_at", { ascending: false }).limit(1)
  const { data: sponsored } = await supabase.from("startups").select("*").eq("is_sponsored", true).order("created_at", { ascending: false }).limit(3)

  return (
    <div className="relative bg-[#FDFCFB] text-[#0F172A]">
      
      {/* 1. ANIMATED LIVE TICKER (Makes it feel alive) */}
      <div className="pt-24 pb-2 bg-[#0F172A] text-[#C6A43F] overflow-hidden whitespace-nowrap border-b border-[#C6A43F]/20">
        <div className="animate-marquee inline-block text-[10px] uppercase tracking-[0.4em] font-bold">
          NEW REGISTRY ENTRY: ZETTA LABS • FUNDING NEWS: NESTBOX SECURES SERIES A • UPFORGE VERIFICATION ENGINE ACTIVE • 3,402 TOTAL ENTITIES ARCHIVED • &nbsp;
        </div>
        <div className="animate-marquee2 absolute top-24 inline-block text-[10px] uppercase tracking-[0.4em] font-bold">
          NEW REGISTRY ENTRY: ZETTA LABS • FUNDING NEWS: NESTBOX SECURES SERIES A • UPFORGE VERIFICATION ENGINE ACTIVE • 3,402 TOTAL ENTITIES ARCHIVED • &nbsp;
        </div>
      </div>

      {/* 2. HERO WITH TYPOGRAPHIC DEPTH */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        {/* Subtle Background 3D element */}
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-[#1e3a5f]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-12 bg-[#C6A43F]" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C6A43F]">The 2026 Archive</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter leading-[0.9]">
                Forge Your <br />
                <span className="italic font-serif text-[#1e3a5f] font-light">Digital Pedigree.</span>
              </h1>
            </div>
            
            <div className="pb-4">
               <p className="text-lg text-[#4a4a4a] max-w-sm font-light leading-relaxed mb-8 border-l-2 border-[#C6A43F]/20 pl-6">
                Not a list, but a legacy. We provide the institutional-grade visibility that serious founders deserve.
              </p>
              <Link href="/apply">
                <Button className="h-16 px-10 bg-[#0F172A] text-white rounded-none hover:bg-[#C6A43F] transition-all group">
                  Submit Application <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO-STYLE METRICS (Modern Professional Touch) */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 bg-white border border-[#0F172A]/5 p-12 flex flex-col justify-between h-[300px] hover:shadow-xl transition-all">
            <Activity className="h-8 w-8 text-[#C6A43F]" />
            <div>
              <div className="text-5xl font-display font-bold">98.2%</div>
              <div className="text-[10px] uppercase tracking-widest font-black text-[#4a4a4a] mt-2">Verification Accuracy</div>
            </div>
          </div>
          <div className="bg-[#1e3a5f] p-12 text-white flex flex-col justify-between h-[300px]">
            <Globe className="h-8 w-8 text-[#C6A43F]" />
            <div className="text-2xl font-display font-light">Global Access, <br />India Heart.</div>
          </div>
          <div className="bg-[#F3F1EE] p-12 flex flex-col justify-between h-[300px]">
            <Landmark className="h-8 w-8 text-[#0F172A]" />
            <div className="text-[10px] uppercase tracking-widest font-black">Registry Grade</div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED SECTION WITH "GLASS" CARDS */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#4a4a4a] mb-16 flex items-center gap-4">
          Verified Registry Entries <span className="h-[1px] flex-1 bg-[#0F172A]/10" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {(sponsored || []).map((startup) => (
            <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
              <div className="relative bg-white border border-[#0F172A]/5 p-10 hover:border-[#C6A43F]/40 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                   <ShieldCheck className="h-5 w-5 text-[#C6A43F]" />
                </div>
                <img src={startup.logo_url || "/placeholder-logo.svg"} className="h-16 w-16 grayscale group-hover:grayscale-0 transition-all mb-12" alt={startup.name} />
                <h3 className="text-2xl font-display font-bold mb-4">{startup.name}</h3>
                <p className="text-sm text-[#4a4a4a] font-light leading-relaxed line-clamp-2">{startup.short_description}</p>
                <div className="mt-12 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#C6A43F]">RECORD_ID: {startup.id.slice(0,8)}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. THE ULTIMATE CTA */}
      <section className="py-32 bg-[#FDFCFB] border-t border-[#0F172A]/5 relative overflow-hidden">
         <div className="max-w-4xl mx-auto text-center px-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Ready to be <br /><span className="italic font-serif font-light text-[#C6A43F]">Recognized?</span></h2>
            <p className="text-[#4a4a4a] text-xl font-light mb-12">Join the ledger that defines India's startup prestige.</p>
            <Link href="/sponsor">
               <Button className="h-20 px-16 bg-[#0F172A] text-white rounded-none text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#1e3a5f] transition-all">
                 Apply for Placement
               </Button>
            </Link>
         </div>
      </section>

    </div>
  )
}
