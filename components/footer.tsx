"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Award } from "lucide-react";
import { Linkedin, Instagram } from "lucide-react";

// Custom CSS animations (shared with homepage)
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; filter: blur(20px); }
    50% { opacity: 1; filter: blur(25px); }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
`;

export function Footer() {
  const currentYear = new Date().getFullYear();

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
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Trust & Safety", href: "/trust" },
    ],
  };

  return (
    <>
      <style>{style}</style>
      <footer className="relative bg-[#0a0c0e] text-white pt-28 pb-12 overflow-hidden">
        {/* Dynamic gradient orbs in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#c6a43f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1e3a5f]/30 to-[#c6a43f]/30 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Subtle grid overlay */}
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/%3E%3C/svg%3E')] pointer-events-none`}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            {/* BRAND COLUMN */}
            <div className="lg:col-span-4 space-y-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-[#c6a43f]/50 transition-all group-hover:scale-105">
                  <Image
                    src="/logo.jpg"
                    alt="UpForge"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black tracking-tighter uppercase text-white">
                    UPFORGE
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-[#c6a43f] font-bold mt-1">
                    Founder Registry
                  </span>
                </div>
              </Link>

              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                The definitive ecosystem for India's most ambitious independent builders.
                Documenting verified founders and high-growth companies with institutional-grade transparency.
              </p>

              {/* Trust badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#c6a43f]" />
                  <span className="text-xs text-gray-300">Verified Registry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#c6a43f]" />
                  <span className="text-xs text-gray-300">Premium Network</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="lg:col-span-8">
              <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-r from-[#c6a43f]/30 via-[#c6a43f]/20 to-transparent">
                <div className="bg-black/40 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
                  <div className="space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a43f]/10 text-[#c6a43f] text-[10px] font-bold uppercase tracking-widest border border-[#c6a43f]/20">
                      <Sparkles className="h-3 w-3" /> Growth Opportunity
                    </div>

                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                      Scale with UpForge Intelligence.
                    </h3>

                    <p className="text-gray-400 text-sm max-w-md">
                      Get featured in the Top 10 and reach 50,000+ investors, founders, and decision-makers monthly.
                    </p>
                  </div>

                  <Link href="/sponsor">
                    <Button className="group relative h-14 px-8 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-black font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c6a43f]/20 overflow-hidden">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      Sponsor Your Startup
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-20 pb-20">
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
                        className="text-sm text-gray-400 hover:text-white transition-colors font-medium inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CONNECT SECTION */}
            <div className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#c6a43f] font-black">
                Connect
              </h4>

              <ul className="space-y-5">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-400 hover:text-white transition-colors font-medium inline-flex items-center gap-1 group"
                  >
                    Contact
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                  </Link>
                </li>

                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-gray-400 hover:text-white transition-colors font-medium inline-flex items-center gap-1 group"
                  >
                    FAQ
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                  </Link>
                </li>

                <li className="flex gap-4 pt-2">
                  <a
                    href="https://www.linkedin.com/company/upforge-india/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                  >
                    <Linkedin className="h-4 w-4 text-white group-hover:text-black" />
                  </a>

                  <a
                    href="#"
                    className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-black">X</span>
                  </a>

                  <a
                    href="#"
                    className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                  >
                    <Instagram className="h-4 w-4 text-white group-hover:text-black" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold text-center md:text-left">
              © {currentYear} UpForge Registry Intelligence Group. All Rights Reserved.
            </p>

            <div className="flex items-center gap-4">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-black">
                Network Status: Institutional Grade
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
