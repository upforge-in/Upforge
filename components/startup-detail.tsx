"use client"

import React, { useRef, useState } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Globe, ArrowLeft, Download, CheckCircle2, ExternalLink, ShieldCheck, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from 'html-to-image'
import saveAs from 'file-saver'
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Website Fix: Direct function to handle external navigation
  const handleVisitWebsite = () => {
    if (!startup.website_url) return;
    const url = startup.website_url.startsWith('http') 
      ? startup.website_url 
      : `https://${startup.website_url}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const handleAction = async (type: 'share' | 'download') => {
    if (!posterRef.current) return
    setIsGenerating(true)
    try {
      const blob = await toBlob(posterRef.current, { 
        cacheBust: true,
        backgroundColor: '#0f172a',
        pixelRatio: 2
      })
      if (!blob) return
      
      if (type === 'download') {
        saveAs(blob, `${startup.name}-Certificate.png`)
      } else {
        const file = new File([blob], `${startup.name}-Featured.png`, { type: 'image/png' })
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ 
            files: [file], 
            title: startup.name, 
            text: `Check out ${startup.name} on UpForge!` 
          })
        } else {
          saveAs(blob, `${startup.name}-Featured.png`)
        }
      }
    } catch (err) {
      console.error("Action failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900">
      
      {/* --- HIDDEN POSTER TEMPLATE (1:1 Ratio for Social Media) --- */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={posterRef} className="w-[800px] h-[800px] bg-[#0f172a] p-12 flex flex-col justify-between relative text-white">
          <div className="z-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/logo.jpg" className="h-8 w-8 rounded" alt="UpForge" />
              <span className="text-xl font-bold tracking-tighter uppercase">UpForge</span>
            </div>
            <div className="px-4 py-1 border border-blue-500/30 bg-blue-500/10 rounded-full text-[10px] font-bold tracking-widest text-blue-400">
              OFFICIAL LISTING
            </div>
          </div>

          <div className="z-10 text-center space-y-6">
            <div className="h-32 w-32 mx-auto rounded-3xl bg-white p-4 shadow-2xl flex items-center justify-center overflow-hidden">
              {startup.logo_url ? <img src={startup.logo_url} className="w-full h-full object-contain" /> : <span className="text-4xl font-black text-slate-900">{startup.name?.[0]}</span>}
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tight uppercase">{startup.name}</h1>
              <p className="text-lg text-slate-400 max-w-md mx-auto line-clamp-2">{startup.description}</p>
            </div>
          </div>

          <div className="z-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 items-center">
            <div>
              <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Category</p>
              <p className="text-lg font-bold">{startup.category || 'Startup'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Status</p>
              <p className="text-lg font-bold">Verified Member</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- UI NAVIGATION --- */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <Link href="/#startups" className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 hover:text-blue-600 transition-all">
            <ArrowLeft className="h-3 w-3" /> BACK
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleAction('download')} disabled={isGenerating} className="text-[10px] font-bold h-8 px-3">
              <Download className="mr-1.5 h-3 w-3" /> {isGenerating ? "..." : "POSTER"}
            </Button>
            <Button size="sm" onClick={() => handleAction('share')} disabled={isGenerating} className="h-8 px-4 text-[10px] font-bold bg-blue-600 hover:bg-blue-700">
              <Share2 className="mr-1.5 h-3 w-3" /> SHARE
            </Button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT (Organized & Compact) --- */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden mb-6 shadow-sm">
                {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-3" alt={startup.name} /> : <span className="text-2xl font-black text-blue-600">{startup.name?.[0]}</span>}
              </div>
              
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Verified Institutional Listing</span>
              </div>

              {/* Fixed Heading Sizes: Reduced from 8xl to 4xl/5xl */}
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase leading-none mb-6">
                {startup.name}
              </h1>

              <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium mb-8">
                {startup.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleVisitWebsite}
                  className="rounded-xl px-8 py-6 bg-slate-900 hover:bg-blue-600 text-xs font-bold tracking-widest gap-2 shadow-lg shadow-slate-200"
                >
                  VISIT WEBSITE <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </div>
            </motion.div>

            <div className="pt-12 mt-12 border-t border-slate-100 flex items-center gap-6">
                <img src="/seal.jpg" alt="Seal" className="h-20 w-auto opacity-50" />
                <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300">Authentication Reference</p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase">UpForge Network Member • 2026-VET</p>
                </div>
            </div>
          </div>

          {/* Right Sidebar: Metadata */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50/50 border border-slate-100 p-8 rounded-[2rem] space-y-6">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-200/50 pb-3">Information</h3>
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { label: "Sector", value: startup.category },
                        { label: "Batch", value: startup.founded_year || '2026' },
                        { label: "Region", value: "India" },
                        { label: "Status", value: "Active" }
                    ].map((item, i) => (
                        <div key={i}>
                            <p className="text-[9px] font-bold uppercase text-blue-600 tracking-tighter mb-1">{item.label}</p>
                            <p className="text-sm font-bold text-slate-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-4 p-6 rounded-[2rem] border border-dashed border-slate-200 flex items-center gap-4 bg-white/50">
                <ShieldCheck className="h-5 w-5 text-slate-300 flex-shrink-0" />
                <p className="text-[9px] font-bold text-slate-400 uppercase leading-snug">
                  Secured & verified profile via UpForge Board.
                </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
