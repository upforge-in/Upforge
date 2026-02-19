

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BusinessForm } from "./business-form"

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Startups", href: "/startup" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm transition-transform group-hover:scale-105">
            <Image 
              src="/logo.jpg" 
              alt="UpForge Logo" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-slate-900">UP</span>
            <span className="text-indigo-600">FORGE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-bold tracking-tight transition-all duration-300 relative group/link ${
                    isActive 
                      ? "text-indigo-600" 
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                  {/* Premium Active/Hover Indicator */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover/link:w-full"
                  }`} />
                </Link>
              )
            })}
          </div>
          
          <div className="h-4 w-[1px] bg-slate-200" />
          
          {/* CTA Component */}
          <div className="flex items-center">
            <BusinessForm />
          </div>
        </div>

        {/* Mobile Navigation (Animated Connect Button) */}
        <div className="flex md:hidden items-center">
          <BusinessForm isMobile={true} />
        </div>
      </nav>
    </header>
  )
}
