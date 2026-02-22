"use client"

import { Shield, Users, TrendingUp, Award, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <section className="relative min-h-screen bg-[#fbf9f6] text-[#1e1b1b] py-40 px-6">
      {/* Subtle diagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 mb-8">
            <BookOpen className="h-4 w-4 text-[#1e3a5f]" />
            <span className="text-xs font-medium text-[#1e3a5f] tracking-wide">
              UPFORGE REGISTRY
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-light tracking-tight text-[#1e1b1b]">
            About
            <span className="block font-semibold text-[#1e3a5f]">
              Upforge.
            </span>
          </h1>

          <p className="mt-8 text-lg text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto">
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

        {/* STATS BANNER - Optional trust signal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-[#1e3a5f]">3,000+</div>
            <div className="text-xs uppercase tracking-wider text-[#4a4a4a] mt-2">Verified Startups</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-[#1e3a5f]">500+</div>
            <div className="text-xs uppercase tracking-wider text-[#4a4a4a] mt-2">Sponsored</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-[#1e3a5f]">10,000+</div>
            <div className="text-xs uppercase tracking-wider text-[#4a4a4a] mt-2">Monthly Visitors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light text-[#1e3a5f]">2025</div>
            <div className="text-xs uppercase tracking-wider text-[#4a4a4a] mt-2">Founded</div>
          </div>
        </div>

        {/* CORE PRINCIPLES */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="group p-8 rounded-2xl bg-white border border-[#1e3a5f]/5 hover:border-[#c6a43f]/30 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[#1e3a5f]/5 group-hover:bg-[#c6a43f]/10 transition-colors">
                <Users className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f] transition-colors" />
              </div>
              <h3 className="text-2xl font-light text-[#1e1b1b]">Built for Builders</h3>
            </div>
            <p className="text-[#4a4a4a] leading-relaxed">
              Every listed startup represents independent execution.
              We prioritize clarity, structured documentation,
              and long-term visibility over short-term hype.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-[#1e3a5f]/5 hover:border-[#c6a43f]/30 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[#1e3a5f]/5 group-hover:bg-[#c6a43f]/10 transition-colors">
                <Shield className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f] transition-colors" />
              </div>
              <h3 className="text-2xl font-light text-[#1e1b1b]">Structured Credibility</h3>
            </div>
            <p className="text-[#4a4a4a] leading-relaxed">
              Profiles are designed as institutional records —
              ensuring founders build digital credibility
              that compounds over time.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-[#1e3a5f]/5 hover:border-[#c6a43f]/30 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[#1e3a5f]/5 group-hover:bg-[#c6a43f]/10 transition-colors">
                <TrendingUp className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f] transition-colors" />
              </div>
              <h3 className="text-2xl font-light text-[#1e1b1b]">Independent First</h3>
            </div>
            <p className="text-[#4a4a4a] leading-relaxed">
              We spotlight founders before headlines do.
              Discoverability is structured around substance,
              not social noise.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white border border-[#1e3a5f]/5 hover:border-[#c6a43f]/30 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[#1e3a5f]/5 group-hover:bg-[#c6a43f]/10 transition-colors">
                <Award className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f] transition-colors" />
              </div>
              <h3 className="text-2xl font-light text-[#1e1b1b]">Long-Term Vision</h3>
            </div>
            <p className="text-[#4a4a4a] leading-relaxed">
              Upforge aims to become India’s most trusted
              independent founder network —
              defined by quality, structure, and permanence.
            </p>
          </div>
        </div>

        {/* CLOSING STATEMENT */}
        <div className="mt-32 max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-[#c6a43f]/5 rounded-3xl blur-2xl" />
            <h3 className="relative text-3xl md:text-4xl font-light text-[#1e1b1b] mb-6">
              This is not a directory.
            </h3>
          </div>

          <p className="text-[#4a4a4a] leading-relaxed text-lg max-w-2xl mx-auto">
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

      {/* FOOTER STRIP */}
      <div className="border-t border-[#1e3a5f]/10 py-16 text-center text-xs uppercase tracking-[0.35em] text-[#4a4a4a] mt-40">
        Upforge · Independent Founder Registry · India
      </div>
    </section>
  )
}
