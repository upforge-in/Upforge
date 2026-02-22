"use client";

import { Shield, Users, TrendingUp, Award, BookOpen } from "lucide-react";
import Link from "next/link";

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

export default function AboutPage() {
  return (
    <>
      <style>{style}</style>
      <section className="relative min-h-screen bg-[#0a0c0e] text-white overflow-hidden py-40 px-6">
        {/* Dynamic gradient orbs in background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c6a43f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1e3a5f]/30 to-[#c6a43f]/30 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Subtle grid overlay */}
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/%3E%3C/svg%3E')] pointer-events-none`}></div>

        <div className="relative max-w-7xl mx-auto z-10">
          {/* HEADER */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 shadow-xl">
              <BookOpen className="h-4 w-4 text-[#c6a43f]" />
              <span className="text-xs font-medium tracking-wider text-white/80">
                UPFORGE REGISTRY
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#c6a43f]">
                About
              </span>
              <span className="block mt-2 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c6a43f] via-[#1e3a5f] to-[#c6a43f] [text-shadow:_0_0_30px_rgba(198,164,63,0.5)]">
                  Upforge.
                </span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f]/30 to-[#1e3a5f]/30 blur-2xl -z-10"></span>
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Upforge is an independent founder registry built to document,
              structure, and elevate emerging Indian startups.
              It is not a media platform. It is not a marketplace.
              It is a public record of serious builders.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-12">
              <div className="h-px w-12 bg-[#c6a43f]/30" />
              <div className="h-1 w-1 rounded-full bg-[#c6a43f]" />
              <div className="h-px w-12 bg-[#c6a43f]/30" />
            </div>
          </div>

          {/* STATS BANNER - Trust signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 max-w-4xl mx-auto">
            {[
              { value: "3,000+", label: "Verified Startups" },
              { value: "500+", label: "Sponsored" },
              { value: "10,000+", label: "Monthly Visitors" },
              { value: "2025", label: "Founded" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white group-hover:text-[#c6a43f] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CORE PRINCIPLES */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                icon: Users,
                title: "Built for Builders",
                desc: "Every listed startup represents independent execution. We prioritize clarity, structured documentation, and long-term visibility over short-term hype.",
              },
              {
                icon: Shield,
                title: "Structured Credibility",
                desc: "Profiles are designed as institutional records — ensuring founders build digital credibility that compounds over time.",
              },
              {
                icon: TrendingUp,
                title: "Independent First",
                desc: "We spotlight founders before headlines do. Discoverability is structured around substance, not social noise.",
              },
              {
                icon: Award,
                title: "Long-Term Vision",
                desc: "Upforge aims to become India’s most trusted independent founder network — defined by quality, structure, and permanence.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-[#c6a43f]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c6a43f]/10"
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none"></div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 group-hover:scale-110 transition-transform">
                      <item.icon className="h-7 w-7 text-[#c6a43f]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CLOSING STATEMENT */}
          <div className="mt-32 max-w-4xl mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-[#c6a43f]/5 rounded-3xl blur-2xl" />
              <h3 className="relative text-4xl md:text-5xl font-black text-white mb-6">
                This is not a directory.
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg max-w-2xl mx-auto">
              It is a signal that serious founders are building.
              A structured record of India’s emerging companies.
              A quiet infrastructure layer beneath the ecosystem.
            </p>

            {/* Decorative element */}
            <div className="mt-12 flex justify-center">
              <div className="h-1 w-20 bg-[#c6a43f]/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* FOOTER STRIP - matches homepage footer style */}
        <div className="relative border-t border-white/10 py-16 text-center text-xs uppercase tracking-[0.35em] text-gray-500 mt-40">
          Upforge · Independent Founder Registry · India
        </div>
      </section>
    </>
  );
}
