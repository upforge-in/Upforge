// officialnewbharat-art/upforge-next/upforge-next-7b82ebbdc8bb9b76587d7c750b36e9b3eafb2119/components/sponsored-card.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ShieldCheck, Sparkles, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import type { Startup } from "@/types/startup"

interface StartupCardProps {
  startup: Startup
}

export function StartupCard({ startup }: StartupCardProps) {
  const isFeatured = startup.is_featured

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link 
        href={`/startup/${startup.slug}`}
        className="group relative flex flex-col h-full bg-white rounded-2xl border border-zinc-200 p-6 transition-all duration-300 hover:border-zinc-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
      >
        {/* DESIGN FOR FEATURED STARTUPS */}
        {isFeatured && (
          <>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl -z-10 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4">
              <div className="bg-amber-400 rounded-full p-1.5 shadow-lg border-2 border-white">
                <Sparkles className="h-3 w-3 text-white fill-current" />
              </div>
            </div>
          </>
        )}

        {/* LOGO & LINK ICON */}
        <div className="flex justify-between items-start mb-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm flex items-center justify-center p-2">
            {startup.logo_url ? (
              <Image
                src={startup.logo_url}
                alt={startup.name}
                fill
                className="object-contain p-2"
              />
            ) : (
              <span className="text-2xl font-black text-zinc-300">
                {startup.name?.charAt(0)}
              </span>
            )}
          </div>
          <div className="h-9 w-9 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-indigo-600 transition-colors">
              {startup.name}
            </h3>
            {isFeatured && (
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
              isFeatured 
                ? "bg-indigo-50 text-indigo-600 border border-indigo-100" 
                : "bg-zinc-100 text-zinc-600"
            }`}>
              {startup.category}
            </span>
            {startup.founded_year && (
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                • {startup.founded_year}
              </span>
            )}
          </div>

          <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed font-medium">
            {startup.description}
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-black transition-colors">
            View Details
          </span>
          {isFeatured && (
            <div className="flex items-center gap-1 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
              <span>Verified</span>
              <ExternalLink className="h-3 w-3" />
            </div>
          )}
        </div>

        {/* HOVER ANIMATION LINE */}
        <div className="absolute bottom-0 left-0 h-1 bg-indigo-600 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
      </Link>
    </motion.div>
  )
}
