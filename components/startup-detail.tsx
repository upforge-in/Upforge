"use client"

import React, { useRef, useState } from "react"
import { Startup } from "@/types/startup"
import {
  Share2,
  ArrowLeft,
  Download,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
  Globe,
  MapPin,
  Calendar,
  Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from "html-to-image"
import saveAs from "file-saver"
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  /* ---------------- SAFE WEBSITE URL HANDLER ---------------- */
  // Fixed: Using 'startup.website' to match your Startup type
  const getCleanUrl = (url?: string | null) => {
    if (!url) return null

    let formatted = url.trim()

    if (!/^https?:\/\//i.test(formatted)) {
      formatted = `https://${formatted}`
    }

    try {
      new URL(formatted)
      return formatted
    } catch {
      return null
    }
  }

  /* ---------------- ULTRA-PREMIUM POSTER GENERATOR ---------------- */
  const handleAction = async (type: "share" | "download") => {
    if (!posterRef.current) return
    setIsGenerating(true)

    try {
      const blob = await toBlob(posterRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff", // Premium White Background
        pixelRatio: 3, // High Resolution for Social Media
      })

      if (!blob) return

      if (type === "download") {
        saveAs(blob, `${startup.name}-Official-Recognition.png`)
      } else {
        const file = new File([blob], `${startup.name}-UpForge-Feature.png`, {
          type: "image/png",
        })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Official Recognition: ${startup.name}`,
            text: `${startup.name} is a verified member of the UpForge network.`,
          })
        } else {
          saveAs(blob, `${startup.name}-UpForge-Feature.png`)
        }
      }
    } catch (err) {
      console.error("Poster generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const websiteUrl = getCleanUrl(startup.website) // Fixed field mapping

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-blue-100">
      
      {/* ---------------- HIDDEN PREMIUM POSTER TEMPLATE ---------------- */}
      {/* Designed for maximum trust so startups repost to LinkedIn/Instagram */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={posterRef}
          className="w-[1080px] h-[1080px] bg-white p-24 flex flex-col justify-between relative overflow-hidden text-slate-900"
        >
          {/* Top Branding Bar */}
          <div className="absolute top-0 left-0 w-full h-4 bg-slate-900" />
          
          {/* Subtle Institutional Background Pattern */}
          <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-3xl opacity-50" />

          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                <img src="/logo.jpg" className="h-10 w-10 object-contain brightness-0 invert" alt="UpForge" />
              </div>
              <div>
                <span className="text-3xl font-black tracking-tighter block text-slate-900">UPFORGE</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Institutional Network</span>
              </div>
            </div>
            <div className="px-6 py-3 border-2 border-slate-900 rounded-xl text-sm font-black uppercase tracking-widest text-slate-900">
              Official Recognition
            </div>
          </div>

          <div className="text-center space-y-12 z-10">
            <div className="relative inline-block">
              <div className="h-56 w-56 mx-auto rounded-[3rem] bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-8 flex items-center justify-center border border-slate-100">
                {startup.logo_url ? (
                  <img src={startup.logo_url} className="object-contain h-full w-full" alt="" />
                ) : (
                  <span className="text-8xl font-black text-slate-900">
                    {startup.name?.[0]}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-xl">
                <ShieldCheck className="h-10 w-10" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-7xl font-black tracking-tight text-slate-900 leading-none">
                {startup.name}
              </h1>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                {startup.description}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end z-10 border-t-2 border-slate-50 pt-16">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification Status</p>
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <CheckCircle2 className="h-5 w-5" />
                <span>VERIFIED ACTIVE MEMBER</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Network Node</p>
              <p className="text-xl font-bold text-slate-900">www.upforge.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- NAVIGATION ---------------- */}
      <nav className="border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/startup"
            className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            STARTUP DIRECTORY
          </Link>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction("download")}
              disabled={isGenerating}
              className="font-bold text-slate-600 hover:text-slate-900"
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? "Processing..." : "Export Recognition"}
            </Button>

            <Button
              size="sm"
              onClick={() => handleAction("share")}
              disabled={isGenerating}
              className="bg-slate-900 hover:bg-blue-600 text-white font-bold px-6 shadow-lg shadow-slate-200"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
          </div>
        </div>
      </nav>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE: Identity & Narrative */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              
              <div className="inline-flex items-center gap-2 text-blue-700 bg-blue-50/80 border border-blue-100 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-8">
                <ShieldCheck className="h-3.5 w-3.5" />
                Institutional Network Member
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                <div className="h-28 w-28 rounded-3xl bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0">
                  {startup.logo_url ? (
                    <img
                      src={startup.logo_url}
                      className="object-contain h-full w-full p-6"
                      alt={startup.name}
                    />
                  ) : (
                    <span className="text-4xl font-black text-slate-900">
                      {startup.name?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight mb-2">
                    {startup.name}
                  </h1>
                  <p className="text-lg font-bold text-slate-400 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Headquartered in India
                  </p>
                </div>
              </div>

              <div className="prose prose-slate prose-lg max-w-none mb-12">
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                  {startup.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {websiteUrl ? (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 hover:-translate-y-1"
                  >
                    <Globe className="h-5 w-5" />
                    Visit Official Portal
                    <ExternalLink className="h-4 w-4 opacity-50" />
                  </a>
                ) : (
                  <div className="px-8 py-4 bg-slate-100 text-slate-400 rounded-2xl text-base font-bold border border-slate-200">
                    Direct Website Pending
                  </div>
                )}
              </div>
            </motion.div>

            {/* TRUST INDICATOR */}
            <div className="pt-16 mt-16 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-200" />
                ))}
                <div className="h-12 w-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  +1k
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Verified by UpForge Institutional Council
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  ID: UPF-{startup.id?.toString().substring(0, 12).toUpperCase() || "PENDING"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Technical Data */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] space-y-8">
              <div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                  Verification Data
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Sector</p>
                      <p className="font-bold text-slate-900">{startup.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Institutional Cohort</p>
                      <p className="font-bold text-slate-900">{startup.founded_year || "2026"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                      <p className="font-bold text-green-600">Active Network Member</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <Link href="/contact" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-50 text-slate-900 text-sm font-bold hover:bg-slate-100 transition-colors">
                  Report Information Error
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
