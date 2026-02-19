"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { Startup } from "@/types/startup"
import {
  Share2,
  ArrowLeft,
  Download,
  CheckCircle2,
  ExternalLink,
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

  const handleAction = async (type: "share" | "download") => {
    if (!posterRef.current) return
    setIsGenerating(true)

    try {
      const blob = await toBlob(posterRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      })

      if (!blob) return

      if (type === "download") {
        saveAs(blob, `${startup.name}-UpForge-Recognition.png`)
      } else {
        const file = new File([blob], `${startup.name}-UpForge.png`, {
          type: "image/png",
        })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Featured on UpForge`,
            text: `${startup.name} has been featured by UpForge.`,
          })
        } else {
          saveAs(blob, `${startup.name}-UpForge.png`)
        }
      }
    } catch (err) {
      console.error("Poster generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const websiteUrl = getCleanUrl(startup.website)

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================= HIDDEN DOWNLOAD POSTER ================= */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={posterRef}
          className="w-[1080px] h-[1080px] bg-white p-20 flex flex-col justify-between text-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                <span>UP</span>
                <span className="text-slate-400">FORGE</span>
              </span>
            </div>

            <img
              src="/seal.jpg"
              alt="Seal"
              className="h-16 w-16 object-contain"
            />
          </div>

          {/* Center */}
          <div className="text-center space-y-8">

            <div className="h-32 w-32 mx-auto rounded-xl border flex items-center justify-center bg-white">
              {startup.logo_url ? (
                <img
                  src={startup.logo_url}
                  className="object-contain h-full w-full p-4"
                  alt={startup.name}
                />
              ) : (
                <span className="text-3xl font-semibold">
                  {startup.name?.[0]}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              {startup.name}
            </h1>

            <p className="text-base text-slate-600 max-w-xl mx-auto">
              Recognized as a Promising Startup within the UpForge Institutional Network.
            </p>

            <p className="text-sm text-slate-500 italic">
              This recognition reflects the leadership vision and innovation commitment behind {startup.name}.
            </p>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 text-sm text-slate-500 flex justify-between items-center">
            <span>Featured on www.upforge.in</span>
            <span>Verification ID: UPF-{startup.id}</span>
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/startup"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Startup Directory
          </Link>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction("download")}
              disabled={isGenerating}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>

            <Button
              size="sm"
              onClick={() => handleAction("share")}
              disabled={isGenerating}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </nav>

      {/* ================= MAIN PAGE ================= */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-12 gap-12"
        >

          {/* LEFT SIDE */}
          <div className="lg:col-span-8 space-y-8">

            <div className="h-24 w-24 rounded-xl border bg-white flex items-center justify-center">
              {startup.logo_url ? (
                <img
                  src={startup.logo_url}
                  className="object-contain h-full w-full p-4"
                  alt={startup.name}
                />
              ) : (
                <span className="text-2xl font-semibold">
                  {startup.name?.[0]}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {startup.name}
              </h1>

              <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                India
              </p>
            </div>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              {startup.description}
            </p>

            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline"
              >
                <Globe className="h-4 w-4" />
                Visit Official Website
                <ExternalLink className="h-4 w-4 opacity-50" />
              </a>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-4">
            <div className="border rounded-xl p-6 space-y-6 bg-white">

              <div className="flex items-center gap-3">
                <img src="/seal.jpg" alt="Seal" className="h-10 w-10 object-contain" />
                <div>
                  <p className="text-sm font-medium">Verified Member</p>
                  <p className="text-xs text-slate-500">
                    UpForge Institutional Network
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4 text-sm">

                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-slate-500" />
                  <span>{startup.category}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>{startup.founded_year || "2026"}</span>
                </div>

                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Active Status</span>
                </div>

              </div>

              <Link
                href="/contact"
                className="block text-center text-xs text-slate-500 hover:underline pt-4 border-t"
              >
                Report Information
              </Link>

            </div>
          </div>

        </motion.div>
      </main>
    </div>
  )
}
