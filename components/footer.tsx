"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Award } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    registry: [
      { name: "Live Directory", href: "/startup" },
      { name: "Verification Standards", href: "/verification" },
      { name: "Elite Founder Criteria", href: "/about" },
    ],
    intelligence: [
      { name: "Market Reports", href: "/reports" },
      { name: "Sponsorship Deck", href: "/sponsor" },
      { name: "API Access", href: "/docs" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Trust & Safety", href: "/trust" },
    ],
  }

  return (
    <footer className="bg-[#0f1e2f] text-white pt-28 pb-12 overflow-hidden relative">
      {/* Subtle diagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 8px)`,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* TOP GRID: BRAND & CALL TO ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5 group-hover:border-[#c6a43f]/50 transition-all group-hover:scale-105">
                <Image
                  src="/logo.jpg"
                  alt="UpForge"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-white uppercase">
                  UPFORGE
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#c6a43f] font-bold mt-1">
                  Founder Registry
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              The definitive ecosystem for India's most ambitious independent builders. 
              Documenting verified founders and high-growth companies with institutional-grade transparency.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#c6a43f]" />
                <span className="text-xs text-zinc-300">Verified Registry</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#c6a43f]" />
                <span className="text-xs text-zinc-300">Premium Network</span>
              </div>
            </div>
          </div>

          {/* SPONSORSHIP CTA */}
          <div className="lg:col-span-8">
            <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-r from-[#c6a43f]/30 via-[#c6a43f]/20 to-transparent">
              <div className="bg-[#0a1726] rounded-[2.4rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
                <div className="space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a43f]/10 text-[#c6a43f] text-[10px] font-bold uppercase tracking-widest border border-[#c6a43f]/20">
                    <Sparkles className="h-3 w-3" /> Growth Opportunity
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                    Scale with UpForge Intelligence.
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md">
                    Get featured in the "Top 10" and reach 50,000+ investors, founders, and decision-makers monthly.
                  </p>
                </div>
                
                <Link href="/sponsor">
                  <Button className="h-14 px-8 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c6a43f]/20">
                    Sponsor Your Startup
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE GRID: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-20 pb-20">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#c6a43f] font-black">
                {section}
              </h4>
              <ul className="space-y-5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT/SOCIAL */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#c6a43f] font-black">
              Connect
            </h4>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-medium">General Inquiries:</p>
              <a 
                href="mailto:connect@upforge.in" 
                className="text-sm text-white hover:text-[#c6a43f] transition-colors font-medium border-b border-white/10 hover:border-[#c6a43f]/50 pb-0.5"
              >
                connect@upforge.in
              </a>
            </div>
            <div className="flex gap-4 pt-2">
              {/* Social Icons */}
              <a 
                href="#" 
                className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                aria-label="X (Twitter)"
              >
                <span className="text-[10px] font-black text-white group-hover:text-[#0f1e2f]">X</span>
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                aria-label="LinkedIn"
              >
                <span className="text-[10px] font-black text-white group-hover:text-[#0f1e2f]">in</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold text-center md:text-left">
            © {currentYear} UpForge Registry Intelligence Group. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-black">
              Network Status: Institutional Grade
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
