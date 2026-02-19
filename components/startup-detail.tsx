"use client"

import React, { useRef } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Download, Award, Globe, Linkedin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toPng } from 'html-to-image'
import saveAs from 'file-saver'
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)

  const handleDownloadPoster = async () => {
    if (posterRef.current === null) return
    const dataUrl = await toPng(posterRef.current, { cacheBust: true })
    saveAs(dataUrl, `${startup.name}-UpForge-Recognition.png`)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hidden Poster Template for Export */}
      <div className="fixed left-[-9999px]">
        <div ref={posterRef} className="w-[1080px] h-[1350px] bg-black p-20 flex flex-col justify-between text-white border-[20px] border-primary/20">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-primary text-2xl font-black uppercase tracking-[0.4em] mb-4">Official Recognition</h4>
                    <h1 className="text-8xl font-black tracking-tighter leading-none">{startup.name}</h1>
                    <p className="text-3xl text-muted-foreground mt-4 uppercase tracking-widest">{startup.category} • EST {startup.founded_year}</p>
                </div>
                <img src="/logo.jpg" className="h-32 w-32 rounded-3xl" />
            </div>
            
            <div className="flex-1 flex items-center">
                <p className="text-5xl leading-tight font-medium text-slate-200">{startup.description}</p>
            </div>

            <div className="flex justify-between items-end border-t border-white/20 pt-12">
                <div>
                    <p className="text-xl text-muted-foreground uppercase tracking-widest mb-2">Verified Founder</p>
                    <p className="text-4xl font-bold">{Array.isArray(startup.founders) ? startup.founders[0] : startup.founders}</p>
                </div>
                <img src="/seal.jpg" className="h-40 w-auto" />
            </div>
        </div>
      </div>

      {/* Main UI */}
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/#startups" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Network
          </Link>
          <div className="flex gap-4">
             <Button variant="outline" size="sm" onClick={handleDownloadPoster} className="gap-2 rounded-full border-primary/20">
                <Share2 className="h-4 w-4" /> Share Poster
             </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="h-32 w-32 rounded-3xl border border-white/10 bg-secondary flex items-center justify-center overflow-hidden">
                    {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-4" /> : <span className="text-5xl font-black">{startup.name[0]}</span>}
                </div>
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 mb-4">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Verified Listing</span>
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4">{startup.name}</h1>
                    <div className="flex gap-4">
                        <Button variant="secondary" size="sm" className="rounded-full gap-2"><Globe className="h-4 w-4"/> Website</Button>
                        <Button variant="secondary" size="sm" className="rounded-full gap-2"><Linkedin className="h-4 w-4"/> LinkedIn</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Executive Summary</h3>
                    <p className="text-xl leading-relaxed text-foreground/90 mb-8">{startup.description}</p>
                    <img src="/seal.jpg" className="h-24 w-auto opacity-80" />
                </div>
                <div className="space-y-8">
                    <div className="rounded-2xl border border-white/5 bg-secondary/30 p-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Foundation</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] uppercase text-muted-foreground/60">Category</p>
                                <p className="font-bold">{startup.category}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-muted-foreground/60">Founded</p>
                                <p className="font-bold">{startup.founded_year}</p>
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
