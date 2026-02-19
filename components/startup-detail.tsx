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
  const getCleanUrl = (url?: string) => {
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

  /* ---------------- POSTER GENERATOR ---------------- */
  const handleAction = async (type: "share" | "download") => {
    if (!posterRef.current) return
    setIsGenerating(true)

    try {
      const blob = await toBlob(posterRef.current, {
        cacheBust: true,
        backgroundColor: "#0f172a",
        pixelRatio: 3,
      })

      if (!blob) return

      if (type === "download") {
        saveAs(blob, `${startup.name}-Recognition.png`)
      } else {
        const file = new File([blob], `${startup.name}-Featured.png`, {
          type: "image/png",
        })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Featured: ${startup.name}`,
            text: `${startup.name} is officially featured on UpForge.`,
          })
        } else {
          saveAs(blob, `${startup.name}-Featured.png`)
        }
      }
    } catch (err) {
      console.error("Poster generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const websiteUrl = getCleanUrl(startup.website_url)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      
      {/* ---------------- HIDDEN POSTER TEMPLATE ---------------- */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={posterRef}
          className="w-[1000px] h-[1000px] bg-[#0f172a] p-20 flex flex-col justify-between relative overflow-hidden text-white"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />

          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" className="h-10 w-10" alt="UpForge" />
              <span className="text-xl font-bold">UpForge</span>
            </div>
            <div className="text-xs tracking-wide text-blue-400 font-semibold">
              OFFICIAL FEATURE
            </div>
          </div>

          <div className="text-center space-y-6 z-10">
            <div className="h-36 w-36 mx-auto rounded-3xl bg-white p-4 flex items-center justify-center">
              {startup.logo_url ? (
                <img src={startup.logo_url} className="object-contain h-full w-full" />
              ) : (
                <span className="text-5xl font-bold text-slate-900">
                  {startup.name?.[0]}
                </span>
              )}
            </div>

            <h1 className="text-5xl font-bold">{startup.name}</h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto">
              {startup.description}
            </p>
          </div>

          <div className="text-center text-xs text-white/40 tracking-wider">
            Verified at www.upforge.in
          </div>
        </div>
      </div>

      {/* ---------------- NAVIGATION ---------------- */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/#startups"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction("download")}
              disabled={isGenerating}
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Download"}
            </Button>

            <Button
              size="sm"
              onClick={() => handleAction("share")}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </nav>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              
              <div className="h-20 w-20 rounded-2xl bg-white border shadow flex items-center justify-center mb-6">
                {startup.logo_url ? (
                  <img
                    src={startup.logo_url}
                    className="object-contain h-full w-full p-3"
                  />
                ) : (
                  <span className="text-3xl font-bold text-blue-600">
                    {startup.name?.[0]}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <CheckCircle2 className="h-4 w-4" />
                Verified Institutional Listing
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                {startup.name}
              </h1>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
                {startup.description}
              </p>

              {websiteUrl ? (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition shadow"
                >
                  Visit Official Website
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              ) : (
                <span className="text-sm text-slate-400 font-medium">
                  Website not available
                </span>
              )}
            </motion.div>

            {/* TRUST SECTION */}
            <div className="pt-12 mt-12 border-t border-slate-200 flex items-center gap-6">
              <ShieldCheck className="h-10 w-10 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Official Network Verification
                </p>
                <p className="text-xs text-slate-500">
                  Reference: UPF-
                  {startup.id?.toString().substring(0, 8).toUpperCase() || "2026"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-sm font-semibold text-slate-500 border-b pb-3">
                Startup Metadata
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-400">Industry</p>
                  <p className="font-semibold text-slate-800">
                    {startup.category || "Startup"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Founded</p>
                  <p className="font-semibold text-slate-800">
                    {startup.founded_year || "2026"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Status</p>
                  <p className="font-semibold text-green-600">
                    Verified Active
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Origin</p>
                  <p className="font-semibold text-slate-800">
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
