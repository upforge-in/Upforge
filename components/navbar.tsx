"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  // Desktop navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/startup" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <header className="fixed top-0 z-[100] w-full border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* BRAND */}
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <Image
              src="/logo.jpg"
              alt="Upforge Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              UPFORGE
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-indigo-400 font-bold mt-1">
              Founder Registry
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-14">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 font-bold ${
                    isActive
                      ? "text-indigo-400 border-b border-indigo-400 pb-1"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="h-5 w-px bg-white/10" />

          {/* Direct Link to Premium Apply Page */}
          <Link href="/apply">
            <Button className="h-11 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              Join the Ecosystem
            </Button>
          </Link>
        </div>

        {/* MOBILE - Redirect logic */}
        <div className="md:hidden flex items-center">
          <Link href="/apply" className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-400 border-b-2 border-indigo-400 pb-0.5">
            Connect then Grow
          </Link>
        </div>

      </nav>
    </header>
  )
}
