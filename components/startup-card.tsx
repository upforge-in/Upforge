"use client"

import Link from "next/link"
import { Award, ArrowUpRight, Sparkles } from "lucide-react"
import type { Startup } from "@/types/startup"
import { motion } from "framer-motion"

interface StartupCardProps {
  startup: Startup
  featured?: boolean
}

export function StartupCard({ startup, featured = false }: StartupCardProps) {
  const getDisplayFounder = () => {
    if (!startup.founders) return { name: "View details", hasMore: false }
    if (typeof startup.founders === 'string') {
      const parts = startup.founders.split(",")
      return { name: parts[0], hasMore: parts.length > 1 }
    }
    if (Array.isArray(startup.founders)) {
      return { name: startup.founders[0], hasMore: startup.founders.length > 1 }
    }
    return { name: "View details", hasMore: false }
  }

  const founderInfo = getDisplayFounder()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/startup/${startup.slug || ""}`} className="group block h-full">
        <article
          className={`relative flex h-full flex-col rounded-2xl border transition-all duration-300 ${
            featured
              ? "border-primary/30 bg-gradient-to-br from-primary/5 via-card to-background p-7 shadow-lg shadow-primary/5 hover:border-primary/60"
              : "border-border bg-card p-6 hover:border-primary/20 hover:shadow-md"
          }`}
        >
          {featured && (
            <div className="absolute -top-3 left-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 shadow-lg shadow-primary/20">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-foreground">
                  Elite Member
                </span>
              </div>
            </div>
          )}

          <div className="mb-5 flex items-start justify-between">
            <div className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border ${
              featured ? "border-primary/20 bg-white" : "border-border bg-secondary"
            }`}>
              {startup.logo_url ? (
                <img src={startup.logo_url} alt="logo" className="h-full w-full object-contain p-2" />
              ) : (
                <span className={`text-xl font-black ${featured ? "text-primary" : "text-secondary-foreground"}`}>
                  {startup.name?.charAt(0) || "?"}
                </span>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {startup.name}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              featured ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
            }`}>
              {startup.category}
            </span>
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
            {startup.description}
          </p>

          {/* Institutional Branding Seal */}
          <div className="mt-4 flex items-center justify-start opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
            <img src="/seal.jpg" alt="Official Seal" className="h-10 w-auto object-contain" />
            <div className="ml-2 h-[1px] flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className={`mt-6 flex items-center justify-between border-t pt-4 ${
            featured ? "border-primary/10" : "border-border"
          }`}>
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full ${featured ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`} />
              <p className="text-xs font-semibold text-muted-foreground">{founderInfo.name}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
