"use client"

import React, { useRef } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Globe, Linkedin, ArrowLeft, ShieldCheck, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toPng } from 'html-to-image'
import saveAs from 'file-saver'
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)

  const handleDownloadPoster = async () => {
    if (posterRef.current === null) return
    const dataUrl = await toPng(posterRef.current, { 
      cacheBust: true,
      backgroundColor: '#000' 
    })
    saveAs(dataUrl, `${startup.name}-UPFORGE-CERTIFIED.png`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hidden Poster Template */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={posterRef} className="w-[1080px] h-[1350px] bg-black p-24 flex flex-col justify-between border-[24px] border-primary/10 text-white">
            <div className="flex justify-between items-start">
                <div>
                    <div className="bg-primary/20 text-primary px-4 py-1 rounded text-xl font-black mb-6 w-fit uppercase tracking-widest">Official Listing</div>
                    <h1 className="text-9xl font-black tracking-tighter leading-none mb-4">{startup.name}</h1>
                    <p className="text-4xl text-slate-400 font-bold">{startup.category} • Est. {startup.founded_year}</p>
                </div>
                <img src="/logo.jpg" className="h-32 w-32 rounded-3xl" />
            </div>
            <p className="text-5xl leading-tight font-medium text-slate-200 pr-20">{startup.description}</p>
            <div className="flex justify-between items-end border-t border-white/10 pt-16">
                <div>
                    <p className="text-xl text-slate-500 uppercase tracking-[0.3em] mb-2">Verified Ecosystem Member</p>
                    <p className="text-5xl font-black uppercase">UPFORGE NETWORK</p>
                </div>
                <img src="/seal.jpg" className="h-48 w-auto object-contain" />
            </div>
        </div>
      </div>

      {/* Detail Page UI */}
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link href="/#startups" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> BACK TO NETWORK
          </Link>
          <Button onClick={handleDownloadPoster} className="gap-2 rounded-full font-bold shadow-xl shadow-primary/20">
            <Share2 className="h-4 w-4" /> SHARE POSTER
          </Button>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row gap-10 items-start mb-20">
            <div className="h-40 w-40 rounded-[2.5rem] border border-white/10 bg-secondary flex items-center justify-center overflow-hidden shadow-2xl">
                {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-6" /> : <span className="text-6xl font-black">{startup.name[0]}</span>}
            </div>
            <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <ShieldCheck className="h-6 w-6" />
                    <span className="text-sm font-black uppercase tracking-[0.2em]">Institutional Grade Listing</span>
                </div>
                <h1 className="text-7xl font-black tracking-tighter mb-6">{startup.name}</h1>
                <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" className="rounded-full gap-2 px-6 font-bold"><Globe className="h-4 w-4"/> Website</Button>
                    <Button variant="secondary" className="rounded-full gap-2 px-6 font-bold"><Linkedin className="h-4 w-4"/> LinkedIn</Button>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2">
                <div className="mb-12">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/50 mb-6">Executive Summary</h3>
                    <p className="text-2xl leading-relaxed font-medium text-foreground/90">{startup.description}</p>
                </div>
                
                {/* SEAL ALIGNMENT */}
                <div className="flex flex-col gap-6 pt-12 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Verified Branding</p>
                    <img src="/seal.jpg" alt="Official Seal" className="h-32 w-fit grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-3xl border border-white/5 bg-secondary/20 p-8">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-8">Metadata</h4>
                    <div className="space-y-8">
                        <div>
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Sector</p>
                            <p className="text-xl font-bold">{startup.category}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Incorporated</p>
                            <p className="text-xl font-bold">{startup.founded_year}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Headquarters</p>
                            <p className="text-xl font-bold">India</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
