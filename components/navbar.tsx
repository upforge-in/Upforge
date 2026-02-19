"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BusinessForm } from "./business-form"
import { ShieldCheck } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { name: "Directory", href: "/startup" },
    { name: "Our Protocol", href: "/about" },
  ]

  return (
    <header className="fixed top-0 z-[100] w-full border-b border-white/10 bg-white/70 backdrop-blur-2xl transition-all duration-300">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* BRANDING: HIGH-TRUST IDENTITY */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-11 w-11 overflow-hidden rounded-2xl border-2 border-indigo-50 bg-white shadow-2xl shadow-indigo-100 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
            <Image 
              src="/logo.jpg" 
              alt="UpForge Logo" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-display font-black tracking-tighter uppercase italic">
              <span className="text-slate-900">UP</span>
              <span className="text-indigo-600">FORGE</span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="h-2 w-2 text-emerald-500" /> Verified Network
            </span>
          </div>
        </Link>

        {/* DESKTOP: PREMIUM NAVIGATION */}
        <div className="hidden md:flex md:items-center md:gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 relative group/link ${
                    isActive 
                      ? "text-indigo-600" 
                      : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-indigo-600 transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 group-hover/link:w-full"
                  }`} />
                </Link>
              )
            })}
          </div>
          
          <div className="h-6 w-[1px] bg-slate-100" />
          
          {/* CTA: AUTHENTIC ACTION */}
          <div className="flex items-center">
            <div className="relative group/btn">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-20 group-hover/btn:opacity-40 transition duration-1000"></div>
              <BusinessForm />
            </div>
          </div>
        </div>

        {/* MOBILE: CLEAN COMPACT UI */}
        <div className="flex md:hidden items-center">
          <BusinessForm isMobile={true} />
        </div>
      </nav>
    </header>
  )
}
