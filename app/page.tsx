import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, Crown, Sparkles, Users, TrendingUp, Award, Star, 
  Zap, Globe, Rocket, Shield, ChevronRight 
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "Discover India’s rising startups. Sponsor your startup. Get visibility in the premium founder registry.",
}

// Custom CSS animations for advanced effects (adds floating, pulse, gradient shift)
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; filter: blur(20px); }
    50% { opacity: 1; filter: blur(25px); }
  }
  @keyframes borderRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
  .shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.2) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .rotating-border {
    position: relative;
    border-radius: 1.5rem;
    overflow: hidden;
  }
  .rotating-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: conic-gradient(from 0deg, #c6a43f, #1e3a5f, #c6a43f, #1e3a5f, #c6a43f);
    animation: borderRotate 4s linear infinite;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    padding: 2px;
  }
`

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
    <>
      <style>{style}</style>
      <div className="relative min-h-screen bg-[#0a0c0e] text-white overflow-x-hidden">
        {/* Dynamic gradient orbs in background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c6a43f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1e3a5f]/30 to-[#c6a43f]/30 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Subtle grid overlay - FIXED using template literal */}
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/%3E%3C/svg%3E')] pointer-events-none`}></div>

        <div className="relative z-10">
          {/* ================= HERO ================= */}
          <section className="relative min-h-screen flex items-center justify-center px-6 py-32">
            <div className="max-w-6xl mx-auto text-center">
              {/* Floating badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 shadow-xl">
                <Zap className="h-4 w-4 text-[#c6a43f] fill-[#c6a43f]" />
                <span className="text-xs font-medium tracking-wider text-white/80">
                  INDIA'S VERIFIED FOUNDER REGISTRY
                </span>
              </div>

              {/* Main headline with gradient and 3D effect */}
              <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#c6a43f]">
                  Discover India’s
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c6a43f] via-[#1e3a5f] to-[#c6a43f] [text-shadow:_0_0_30px_rgba(198,164,63,0.5)]">
                    Rising Startups.
                  </span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f]/30 to-[#1e3a5f]/30 blur-2xl -z-10"></span>
                </span>
              </h1>

              <p className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                A premier directory where serious founders gain visibility, build authority, 
                and connect with India’s most ambitious builders.
              </p>

              {/* CTA Buttons with glow */}
              <div className="mt-12 flex justify-center gap-6 flex-wrap">
                <Link href="/apply">
                  <Button className="group relative rounded-full px-10 h-14 bg-gradient-to-r from-[#1e3a5f] to-[#14304a] text-white hover:from-[#14304a] hover:to-[#0f2538] transition-all text-base font-semibold shadow-2xl shadow-[#1e3a5f]/40 border-0 overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    List Your Startup
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/startup">
                  <Button
                    variant="outline"
                    className="rounded-full px-10 h-14 border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all text-base font-semibold"
                  >
                    Browse Directory
                  </Button>
                </Link>
              </div>

              {/* Stats with modern design */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-12 text-gray-300">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                  <Users className="h-5 w-5 text-[#c6a43f]" />
                  <span className="font-medium">3,000+ Startups</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                  <TrendingUp className="h-5 w-5 text-[#c6a43f]" />
                  <span className="font-medium">10,000+ Monthly Visitors</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                  <Star className="h-5 w-5 text-[#c6a43f] fill-[#c6a43f]" />
                  <span className="font-medium">500+ Sponsored</span>
                </div>
              </div>

              {/* As featured in with logo cards */}
              <div className="mt-24 pt-12 border-t border-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">As featured in</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {["TECHCRUNCH", "FORBES", "YOURSTORY", "INC42"].map((brand) => (
                    <div key={brand} className="group relative px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#c6a43f]/30 transition-all">
                      <span className="text-lg font-bold text-white/40 group-hover:text-[#c6a43f] transition-colors">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= SPONSOR OF THE WEEK ================= */}
          {sponsorOfWeek && sponsorOfWeek.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 pb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#c6a43f]/30 to-[#c6a43f]/5 border border-[#c6a43f]/30">
                  <Crown className="h-6 w-6 text-[#c6a43f]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light">
                  <span className="font-bold text-[#c6a43f]">Sponsor</span> of the Week
                </h2>
              </div>

              <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="block group">
                <div className="rotating-border relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1">
                  <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 hover:scale-[1.01] transition-transform duration-500">
                    {/* Glowing background effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f]/50 to-[#1e3a5f]/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative flex items-center gap-6 w-full md:w-auto">
                      <div className="relative">
                        <img
                          src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                          className="h-28 w-28 object-contain rounded-2xl bg-white/10 backdrop-blur-sm p-3 border border-white/20 shadow-2xl"
                          alt={sponsorOfWeek[0].name}
                        />
                        <div className="absolute -top-2 -right-2 p-2 bg-[#c6a43f] rounded-full">
                          <Crown className="h-4 w-4 text-black" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-4xl md:text-5xl font-bold text-white">
                          {sponsorOfWeek[0].name}
                        </h3>
                        <p className="text-gray-300 mt-4 text-lg max-w-xl">
                          {sponsorOfWeek[0].short_description || "Featured premium visibility startup making waves in the ecosystem."}
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          <span className="px-4 py-1.5 bg-[#c6a43f]/20 text-[#c6a43f] rounded-full text-sm font-medium border border-[#c6a43f]/30">Premium Sponsor</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative ml-auto">
                      <span className="text-lg font-medium text-[#c6a43f] flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Startup <ChevronRight className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* ================= TOP 10 SPONSORED ================= */}
          {sponsored && sponsored.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 pb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#c6a43f]/30 to-[#c6a43f]/5 border border-[#c6a43f]/30">
                  <Crown className="h-6 w-6 text-[#c6a43f]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light">
                  <span className="font-bold text-[#c6a43f]">Sponsored</span> Startups
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sponsored.map((startup, idx) => (
                  <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                    <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#c6a43f]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c6a43f]/20 h-full flex flex-col">
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none"></div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={startup.logo_url || "/placeholder-logo.svg"}
                          className="h-14 w-14 object-contain rounded-xl bg-white/10 p-2 border border-white/20"
                          alt={startup.name}
                        />
                        <h3 className="font-bold text-white text-lg group-hover:text-[#c6a43f] transition-colors line-clamp-1">
                          {startup.name}
                        </h3>
                      </div>
                      {startup.short_description && (
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                          {startup.short_description}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center gap-2">
                        <span className="text-xs px-3 py-1 bg-[#c6a43f]/10 text-[#c6a43f] rounded-full border border-[#c6a43f]/20">Sponsored</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#c6a43f] group-hover:translate-x-1 transition-all ml-auto" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ================= TOP 10 FEATURED ================= */}
          {featured && featured.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 pb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1e3a5f]/30 to-[#1e3a5f]/5 border border-[#1e3a5f]/30">
                  <Sparkles className="h-6 w-6 text-[#1e3a5f]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-light">
                  <span className="font-bold text-[#1e3a5f]">Editorial</span> Picks
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {featured.map((startup) => (
                  <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                    <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#1e3a5f]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#1e3a5f]/20 h-full flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={startup.logo_url || "/placeholder-logo.svg"}
                          className="h-14 w-14 object-contain rounded-xl bg-white/10 p-2 border border-white/20"
                          alt={startup.name}
                        />
                        <h3 className="font-bold text-white text-lg group-hover:text-[#1e3a5f] transition-colors line-clamp-1">
                          {startup.name}
                        </h3>
                      </div>
                      {startup.short_description && (
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                          {startup.short_description}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center gap-2">
                        <span className="text-xs px-3 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full border border-[#1e3a5f]/20">Featured</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#1e3a5f] group-hover:translate-x-1 transition-all ml-auto" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ================= WHY UPFORGE ================= */}
          <section className="max-w-7xl mx-auto px-6 pb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light">
                Why <span className="font-bold text-[#c6a43f]">UpForge</span>
              </h2>
              <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                Built for founders who mean business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Users, title: "Founder First", desc: "Join a network of serious builders, not just a listing.", color: "#1e3a5f" },
                { icon: TrendingUp, title: "Amplified Visibility", desc: "Sponsored startups get social media promotion and prime placement.", color: "#c6a43f" },
                { icon: Award, title: "Trust & Credibility", desc: "Every founder is verified, ensuring a premium directory.", color: "#1e3a5f" },
              ].map((item, idx) => (
                <div key={idx} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className={`h-8 w-8`} style={{ color: item.color }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section className="relative py-40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] via-[#14304a] to-[#c6a43f] opacity-30 blur-3xl"></div>
            {/* Grid overlay - FIXED using template literal */}
            <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/%3E%3C/svg%3E')]`}></div>
            
            <div className="relative max-w-4xl mx-auto text-center px-6">
              <h3 className="text-5xl md:text-6xl font-black mb-6">
                Get Featured on
                <span className="block text-[#c6a43f]">UpForge</span>
              </h3>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Increase visibility, build trust, and reach serious builders across India.
              </p>

              <Link href="/sponsor">
                <Button className="group relative rounded-full px-14 h-16 bg-gradient-to-r from-[#c6a43f] to-[#b08c2e] text-black hover:from-[#b08c2e] hover:to-[#9e7a29] text-base uppercase tracking-widest font-bold shadow-2xl shadow-[#c6a43f]/40 border-0 overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  Sponsor Your Startup
                  <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <div className="relative py-8 text-center text-xs tracking-[0.4em] uppercase text-gray-500 border-t border-white/10">
            UpForge · Founder First · 2026
          </div>
        </div>
      </div>
    </>
  )
}
