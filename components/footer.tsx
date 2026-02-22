"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ShieldCheck, Award, Globe, Fingerprint } from "lucide-react"
import { Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Registry: [
      { name: "Live Directory", href: "/startup" },
      { name: "Verification Standards", href: "/verification" },
      { name: "Elite Founder Criteria", href: "/about" },
    ],
    Intelligence: [
      { name: "Market Reports", href: "/reports" },
      { name: "Sponsorship Deck", href: "/sponsor" },
      { name: "API Access", href: "/docs" },
    ],
    Compliance: [
      { name: "Privacy Protocol", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Trust & Safety", href: "/trust" },
    ],
  }

  return (
    <footer className="bg-[#0a0a0b] text-white pt-32 pb-12 overflow-hidden relative border-t border-white/5">
      
      {/* ARCHITECTURAL BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#1e3a5f15,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* THE "LEGACY INVITATION" CTA */}
        <div className="mb-28">
          <div className="relative group overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative bg-[#0a0a0b] rounded-[2.9rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/5">
              <div className="max-w-2xl text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-[0.3em] border border-gold/20">
                  <Sparkles className="h-3.5 w-3.5" /> Institutional Access
                </div>

                <h3 className="text-4xl md:text-5xl font-serif italic tracking-tight leading-tight">
                  Secure your place in <br />
                  <span className="text-white not-italic font-sans font-bold uppercase">The Founder Ledger.</span>
                </h3>

                <p className="text-zinc-500 text-lg font-light leading-relaxed">
                  Join 3,000+ verified startups. Gain the authority that comes with being forged in India's premier registry.
                </p>
              </div>
              
              <Link href="/sponsor" className="flex-shrink-0">
                <Button className="h-20 px-12 rounded-full bg-white text-black hover:bg-gold hover:text-black transition-all duration-500 text-xs font-bold uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95">
                  Request Feature
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 border-b border-white/5 pb-24">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white p-2 group-hover:scale-110 transition-transform">
                <Image
                  src="/logo.jpg"
                  alt="UpForge"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-bold tracking-tighter uppercase">UPFORGE</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold mt-1.5">Official Registry</span>
              </div>
            </Link>

            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              UpForge is the definitive system of record for the Indian startup ecosystem. We provide institutional-grade visibility for independent builders.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Verification</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs text-zinc-300 font-medium">L3 Secured</span>
                </div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Network</span>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gold" />
                  <span className="text-xs text-zinc-300 font-medium">Tier-1 Founders</span>
                </div>
              </div>
            </div>
          </div>

          {/* LINKS SITEMAP */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                  {section}
                </h4>
                <ul className="space-y-5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 hover:text-white hover:pl-2 transition-all duration-300 font-medium inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL REGISTRY BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">
              © {currentYear} UpForge Registry Intelligence Group · India
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-[9px] text-zinc-700 tracking-widest font-mono">
              <span>REF: 2026-UF-HQ</span>
              <span>LOC: 28.6139° N, 77.2090° E</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border border-white/10 rounded-full px-6 py-3 bg-white/[0.02]">
            <Fingerprint className="h-4 w-4 text-gold opacity-50" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-black">
              Digital Signature Verified
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors text-xs font-bold pt-1">
              𝕏
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
