"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShieldCheck } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Scroll glass effect
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Lock scroll when menu open
  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Registry", href: "/startup" },
    { name: "Sponsorship", href: "/sponsor" },
    { name: "The Network", href: "/about" },
    { name: "Docs", href: "/docs" },
  ]

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 z-[60] w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.08)]"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-[#1e3a5f]/10 bg-white p-1 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="UpForge"
                fill
                className="object-cover p-1.5"
                priority
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-[#1e3a5f] uppercase">
                UPFORGE
              </span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-2.5 w-2.5 text-[#c6a43f]" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                  Verified Registry
                </span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[11px] uppercase tracking-[0.18em] font-bold transition-all duration-300 ${
                      isActive ? "text-[#1e3a5f]" : "text-gray-400 hover:text-[#1e3a5f]"
                    }`}
                  >
                    {link.name}

                    {/* Animated underline */}
                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] bg-[#c6a43f] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            <Link href="/apply">
              <Button className="h-11 px-8 bg-[#1e3a5f] hover:bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-[#1e3a5f]/20 transition-all hover:-translate-y-0.5">
                Join Registry
              </Button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#1e3a5f] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in slide-in-from-bottom-5 duration-500">

          {/* Mobile Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#1e3a5f] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">UF</span>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase">
                Navigation
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-50 text-[#1e3a5f] active:scale-90 transition-transform"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col justify-center h-[70vh] px-10">
            <div className="space-y-10">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block group"
                >
                  <span
                    className="text-[10px] text-[#c6a43f] font-bold tracking-[0.4em] uppercase mb-2 block"
                  >
                    0{i + 1}
                  </span>

                  <span className="text-4xl font-serif italic text-[#1e3a5f] group-hover:pl-4 transition-all duration-300">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-20 pt-10 border-t border-gray-50">
              <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full h-16 bg-[#1e3a5f] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black">
                  Apply for Listing
                </Button>
              </Link>

              <p className="text-center mt-6 text-[10px] text-gray-400 tracking-[0.3em] uppercase">
                UpForge · Founder First · 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
