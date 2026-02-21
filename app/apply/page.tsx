"use client"

import React from 'react'
import { BusinessForm } from "@/components/business-form"
import { ShieldCheck, Lock } from "lucide-react"
import { motion } from "framer-motion"

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen bg-[#0F172A] flex items-center justify-center overflow-hidden">
      {/* 1. Background elements to match the Hero/Ecosystem vibe */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. The Shared Component (Shared Logic & UI) */}
      {/* This component has the useEffect that detects "/apply" and opens the popup automatically */}
      <BusinessForm />

      {/* 3. Aesthetic "Loading/Entry" State while the popup handles the work */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-0 text-center space-y-6 px-6"
      >
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <Lock className="h-8 w-8 text-indigo-400 opacity-50" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase opacity-40">
            UPFORGE <span className="text-indigo-500">Secure</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-indigo-300/30">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Establishing Encrypted Connection
            </span>
          </div>
        </div>

        {/* Subtle Hint */}
        <p className="text-slate-500 text-xs font-medium max-w-xs mx-auto leading-relaxed">
          The application portal is opening. If the popup does not appear, please ensure your browser allows overlays.
        </p>
      </motion.div>

      {/* Security footer decoration */}
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/10">
          Institutional Grade Verification Ledger
        </span>
      </div>
    </div>
  )
}
