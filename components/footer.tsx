// components/footer.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Fingerprint, Lock } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: "Navigation",
      links: [
        { name: "The Registry", href: "/startup" },
        { name: "Founder Network", href: "/about" },
        { name: "Reports", href: "/reports" },
      ],
    },
    {
      title: "Legals",
      links: [
        { name: "Privacy Protocol", href: "/privacy" },
        { name: "Terms of Entry", href: "/terms" },
        { name: "Trust & Safety", href: "/trust" },
      ],
    },
    {
      title: "Intelligence",
      links: [
        { name: "Sponsorship Deck", href: "/sponsor" },
        { name: "API Registry", href: "/docs" },
        { name: "Status", href: "/verification" },
      ],
    },
  ]

  return (
    <footer className="bg-[#0F172A] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Animated line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A43F] to-transparent animate-slide" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Top CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#C6A43F]/30 bg-[#C6A43F]/5">
              <Lock className="h-3 w-3 text-[#C6A43F]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C6A43F]">
                Institutional Membership
              </span>
            </div>
            <h3 className="text-5xl md:text-6xl font-display font-light leading-tight">
              Establishing the <br />
              <span className="italic font-serif text-[#C6A43F]">Legacy of Builders.</span>
            </h3>
          </div>
          <div className="lg:pl-20">
            <p className="text-white/40 text-lg font-light leading-relaxed mb-10">
              Join 3,000+ verified entities. UpForge is the definitive system of record
              for the most ambitious startups in the Indian sub-continent.
            </p>
            <Link href="/sponsor">
              <Button className="h-16 px-12 bg-white text-[#0F172A] hover:bg-[#C6A43F] hover:text-white transition-all rounded-none text-[10px] font-bold uppercase tracking-[0.3em]">
                Request Feature Access <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32 pt-20 border-t border-white/5">
          <div className="col-span-2 md:col-span-1 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-white p-1">
                <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="grayscale" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">UPFORGE</span>
            </div>
            <p className="text-[11px] text-white/30 uppercase tracking-widest leading-loose">
              India's Independent Founder Registry. <br />
              Secure. Verified. Permanent.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#C6A43F] font-bold">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs text-white/40 hover:text-[#C6A43F] transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 pt-12 border-t border-white/5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border border-white/10 px-4 py-2 bg-white/5">
              <Fingerprint className="h-3 w-3 text-[#C6A43F]" />
              <span className="text-[9px] font-mono text-white/40">AUTH_SIG: VERIFIED_2026</span>
            </div>
            <div className="hidden md:flex items-center gap-3 border border-white/10 px-4 py-2 bg-white/5">
              <ShieldCheck className="h-3 w-3 text-[#C6A43F]" />
              <span className="text-[9px] font-mono text-white/40">ENCRYPTION: AES-256</span>
            </div>
          </div>

          <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold">
            © {currentYear} UPFORGE REGISTRY INTELLIGENCE · ALL RIGHTS RESERVED
          </p>

          <div className="flex gap-8 text-[10px] font-bold tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-white transition-colors">TWITTER / X</a>
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
