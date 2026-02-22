import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, Crown, Search, 
  ArrowUpRight, Quote, ExternalLink, Sparkles
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description: "A premium registry for India's verified startup founders.",
}

export default async function Home() {
  const supabase = await createClient()

  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <div className="bg-[#ffffff] text-black selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* ================= HERO SECTION (WITH FLOATING CHARACTERS) ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Placeholder for Floating Characters (As seen in the design) */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-gray-100 rounded-full animate-subtle-float opacity-20 hidden lg:block"></div>
        <div className="absolute bottom-40 right-[15%] w-48 h-48 bg-gray-100 rounded-2xl rotate-12 animate-subtle-float opacity-20 hidden lg:block" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 bg-gray-50 mb-10">
            <Sparkles className="h-3 w-3 text-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">The 2026 Founder Registry</span>
          </div>
          
          <h1 className="text-7xl md:text-[140px] leading-[0.8] font-display font-bold tracking-tighter mb-12">
            Build. <br />
            <span className="text-gray-200">Verify.</span> <br />
            Forge.
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-tight mb-16">
            The definitive ecosystem for India's rising startups. 
            Join 3,400+ verified builders today.
          </p>

          {/* PREMIUM SEARCH FEATURE (Centered & Minimal) */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for startups, industries, or founders..." 
              className="w-full h-20 pl-16 pr-8 rounded-full border border-black/10 bg-gray-50/50 text-lg focus:outline-none focus:ring-4 focus:ring-black/5 focus:bg-white transition-all shadow-sm"
            />
            <div className="absolute right-4 top-4">
              <Button className="rounded-full h-12 px-8 bg-black text-white text-xs font-bold uppercase tracking-widest">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE REGISTRY ROWS (PREVIEW ON HOVER) ================= */}
      <section className="py-32 px-6 border-t border-black/5 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Selected <br/> Registry</h2>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-2">Verified Members</p>
              <span className="text-4xl font-display font-bold">0{startups?.length || 0}</span>
            </div>
          </div>

          <div className="space-y-0">
            {startups?.map((startup, i) => (
              <div key={startup.id} className="group relative py-12 border-b border-black/10 transition-all duration-700 hover:px-8 hover:bg-white hover:rounded-3xl hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] cursor-pointer">
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-12">
                    <span className="text-xs font-mono opacity-20">0{i + 1}</span>
                    <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tighter group-hover:scale-[1.02] transition-transform duration-500">
                      {startup.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">{startup.industry || "Ecosystem"}</span>
                    <div className="h-14 w-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* THE "VISIT SITE" PREVIEW CARD (Visible on hover) */}
                <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[400px] h-[260px] opacity-0 scale-90 translate-x-12 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-700 z-50 hidden lg:block">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-white border border-black/5">
                    <img 
                      src={startup.logo_url || "/placeholder.jpg"} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      alt={startup.name}
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4">
                      <p className="text-white text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Live Experience</p>
                      <Link 
                        href={startup.website_url || "#"} 
                        target="_blank"
                        className="bg-white text-black px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 pointer-events-auto hover:scale-105 transition-transform"
                      >
                        Visit Website <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (FOUNDER QUOTES) ================= */}
      <section className="py-40 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-12">
                The Founder <br /> <span className="text-gray-600 italic font-medium">Perspective.</span>
              </h2>
              <div className="h-px w-full bg-white/10 mb-12"></div>
              <p className="text-xl text-gray-400 max-w-md leading-tight">
                Join a league of innovators who are redefining the Indian startup landscape.
              </p>
            </div>
            
            <div className="space-y-16">
              {[
                { name: "Lucky Tiwari", role: "InternAdda", quote: "UpForge isn't just a directory; it's a mark of credibility for the modern founder." },
                { name: "Sumit Pandey", role: "Branded Base", quote: "The networking potential and visibility we gained here was a complete game changer." }
              ].map((t, idx) => (
                <div key={idx} className="relative pl-12">
                  <Quote className="absolute left-0 top-0 h-8 w-8 text-gray-800" />
                  <p className="text-3xl font-display leading-tight mb-8">"{t.quote}"</p>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest">{t.name}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA: FINAL FORGE ================= */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-5xl md:text-[100px] leading-[0.9] font-display font-bold tracking-tighter mb-12">
            Want to be <br /> <span className="text-gray-300">Listed?</span>
          </h3>
          <Link href="/apply">
            <Button className="rounded-full px-20 h-24 bg-black text-white text-sm font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform">
              Join the Network
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-black/5 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-20">UpForge · 2026</p>
      </footer>
    </div>
  )
}
