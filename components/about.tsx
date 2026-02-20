"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Flame, Globe2, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-28 px-6">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 mb-4">
            Our Identity
          </p>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Forging India’s <span className="text-indigo-600">Next Generation</span> of Builders
          </h2>

          <p className="mt-6 text-slate-600 text-lg leading-relaxed">
            UpForge is not a media company. Not a listing website.  
            It is a verified ecosystem where independent founders, operators,
            and emerging startups build visibility, trust, and momentum.
          </p>
        </div>

        {/* CORE PILLARS */}
        <div className="grid md:grid-cols-2 gap-12">

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <Flame className="h-8 w-8 text-indigo-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Built for Builders
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Every startup listed here is independently driven.
              We prioritize clarity, founder transparency,
              and real-world execution over hype.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <ShieldCheck className="h-8 w-8 text-emerald-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Verified Network
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Profiles are structured for authenticity —
              helping founders build digital credibility
              and long-term brand equity.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <Users className="h-8 w-8 text-purple-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Independent First
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We spotlight founders before they become headlines —
              empowering early-stage teams with discoverability
              and organic distribution.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <Globe2 className="h-8 w-8 text-indigo-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Long-Term Vision
            </h3>
            <p className="text-slate-600 leading-relaxed">
              UpForge aims to become India’s most trusted
              independent founder network —
              not through noise, but through quality.
            </p>
          </div>

        </div>

        {/* BOTTOM STATEMENT */}
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            This is not a directory.  
            It is a signal.
          </h3>

          <p className="text-slate-600 leading-relaxed text-lg">
            A signal that serious founders are building.  
            A signal that India’s startup ecosystem is evolving.  
            A signal that credibility matters.
          </p>
        </div>

      </div>
    </section>
  )
}
