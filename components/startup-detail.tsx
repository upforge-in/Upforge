"use client"

import React, { useRef, useState } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Globe, ArrowLeft, Award, Download, CheckCircle2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from 'html-to-image'
import saveAs from 'file-saver'
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Website URL Fix: Agar http nahi hai toh add karein
  const getCleanUrl = (url: string | undefined) => {
    if (!url) return "#"
    return url.startsWith('http') ? url : `https://${url}`
  }

  const handleShare = async () => {
    if (!posterRef.current) return
    setIsGenerating(true)
    try {
      const blob = await toBlob(posterRef.current, { 
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2 
      })
      if (!blob) return
      const file = new File([blob], `${startup.name}-Certificate.png`, { type: 'image/png' })
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Verified: ${startup.name}`,
          text: `Proudly listed on the UpForge Founder Network!`,
        })
      } else {
        saveAs(blob, `${startup.name}-UpForge-Member.png`)
      }
    } catch (err) {
      console.error("Share failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* --- REFINED POSTER TEMPLATE (Optimized for Social Media) --- */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={posterRef} className="w-[1080px] h-[1080px] bg-white p-16 flex flex-col justify-between border-[16px] border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
            
            <div className="flex justify-between items-start relative z-10">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded text-primary font-bold text-xs uppercase tracking-[0.3em]">
                        Certified Member
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-none uppercase">{startup.name}</h1>
                    <p className="text-xl text-slate-500 font-semibold tracking-wide uppercase">{startup.category} • Est. {startup.founded_year}</p>
                </div>
                <img src="/logo.jpg" className="h-20 w-20 rounded-xl shadow-md border border-slate-100" />
            </div>

            <div className="relative z-10 bg-slate-50/50 p-10 rounded-3xl border border-slate-100">
                <p className="text-2xl leading-relaxed font-medium text-slate-700">
                   This confirms that <span className="font-bold text-slate-900">{startup.name}</span> is an officially recognized member of the <span className="text-primary font-bold">UpForge Founder Network</span>, vetted for excellence and innovation.
                </p>
            </div>

            <div className="flex justify-between items-end pt-8 relative z-10">
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Verify at</p>
                    <p className="text-2xl font-black tracking-tight text-primary">UPFORGE.IN</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/seal.jpg" className="h-40 w-auto object-contain" />
                  <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-2">Official Seal</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link href="/#startups" className="group flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-500 hover:text-primary transition-all">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> BACK
          </Link>
          <Button size="sm" onClick={handleShare} disabled={isGenerating} className="rounded-full px-5 text-[10px] font-black tracking-widest shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
            <Share2 className="mr-2 h-3.5 w-3.5" /> {isGenerating ? "PREPARING..." : "SHARE POSTER"}
          </Button>
        </div>
      </nav>

      {/* --- CONTENT --- */}
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Logo Section */}
          <div className="mx-auto mb-8 h-24 w-24 rounded-[2rem] bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
              {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-4" /> : <span className="text-4xl font-black text-primary">{startup.name?.[0]}</span>}
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 mb-6">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Verified Member</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-slate-900 uppercase">
            {startup.name}
          </h1>

          <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-sm mb-10 uppercase tracking-widest">
            <span>{startup.category}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>EST. {startup.founded_year}</span>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              {startup.description}
            </p>
          </div>

          {/* Website Link Fix */}
          <div className="mb-20">
            <a 
              href={getCleanUrl(startup.website_url)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-black tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-slate-200"
            >
              VISIT WEBSITE <ExternalLink className="h-3.5 w-3.5 opacity-50" />
            </a>
          </div>

          {/* SEAL - ORGANIZED & COLORFUL */}
          <div className="flex flex-col items-center gap-4 py-10 border-t border-slate-100">
            <img src="/seal.jpg" alt="Official Seal" className="h-32 w-auto drop-shadow-sm" />
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Institutional Validation</p>
              <p className="text-[8px] font-bold text-primary uppercase">UpForge Founder Network • 2026</p>
            </div>
          </div>

          {/* COMPACT INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Industry", value: startup.category },
              { label: "Batch", value: startup.founded_year },
              { label: "Region", value: "India" },
              { label: "Type", value: "Verified" }
            ].map((item, i) => (
              <div key={i} className="py-4 px-2 rounded-2xl border border-slate-200/50 bg-white shadow-sm">
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                <p className="text-xs font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>

        </motion.div>
      </main>
    </div>
  )
}
