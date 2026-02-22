"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsResourcesOpen(false)
  }, [pathname])

  // Scroll lock
  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
  }, [isMobileMenuOpen])

  // Close dropdown outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/startup" },
    { name: "Sponsor", href: "/sponsor" },
    { name: "About Us", href: "/about" },
  ]

  const resourceLinks = [
    { name: "Reports", href: "/reports" },
    { name: "FAQ", href: "/faq" },
    { name: "API Docs", href: "/docs" },
    { name: "Trust & Safety", href: "/trust" },
  ]

  return (
    <>
      {/* HEADER (hide when mobile menu open) */}
      {!isMobileMenuOpen && (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0f1e2f]/80 backdrop-blur-2xl">
          <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
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

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs uppercase tracking-wider font-medium transition-colors ${
                      isActive ? "text-white" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}

              <Link href="/apply">
                <Button className="h-10 px-6 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] rounded-full text-xs font-semibold uppercase tracking-wider">
                  Join the Ecosystem
                </Button>
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-white bg-white/10 border border-white/10 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
          </nav>
        </header>
      )}

      {/* FULLSCREEN MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#07111c] via-[#0c1622] to-[#07111c] animate-in fade-in duration-300">

          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              <X className="h-6 w-6 text-[#c6a43f]" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col items-center justify-center gap-10 px-6">

            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-3xl uppercase tracking-[0.25em] font-black transition-colors ${
                    isActive ? "text-[#c6a43f]" : "text-white hover:text-[#c6a43f]"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}

            <div className="mt-10 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#c6a43f] mb-6">
                Resources
              </p>
              <div className="flex flex-col gap-5">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg text-white/70 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/apply" className="w-full max-w-xs mt-12">
              <Button className="w-full h-14 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#c6a43f]/20">
                Join the Ecosystem
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
