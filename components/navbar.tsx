"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/startup" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0f1e2f]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6" aria-label="Main navigation">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-transform group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="Upforge"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              UPFORGE
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c6a43f] font-bold">
              Founder Registry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-wider font-medium transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c6a43f] rounded-full" />
                  )}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c6a43f] rounded-full scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link>
              )
            })}
          </div>

          <div className="h-5 w-px bg-white/10" />

          <Link href="/apply">
            <Button className="h-10 px-6 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] rounded-full text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c6a43f]/20">
              Join the Ecosystem
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-20 z-40 bg-[#0f1e2f]/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col items-center gap-8 py-12 px-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xl uppercase tracking-wider font-medium transition-colors ${
                      isActive ? "text-[#c6a43f]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <div className="h-px w-16 bg-white/20" />
              <Link href="/apply" className="w-full max-w-xs">
                <Button className="w-full h-12 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] rounded-full text-sm font-semibold uppercase tracking-wider">
                  Join the Ecosystem
                </Button>
              </Link>
              {/* Original mobile link preserved with updated colors */}
              <Link
                href="/apply"
                className="text-xs uppercase tracking-[0.2em] text-[#c6a43f] border-b border-[#c6a43f] pb-0.5"
              >
                Connect then Grow
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
