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

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Registry", href: "/startup" },
    { name: "Sponsor", href: "/sponsor" },
    { name: "Reports", href: "/reports" },
    { name: "About", href: "/about" },
  ]

  return (
    <>
      {!isMobileMenuOpen && (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0b1622]/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#0b1622]/70">
          <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image
                  src="/logo.jpg"
                  alt="UpForge Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-white uppercase">
                  UPFORGE
                </span>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#c6a43f] font-bold">
                  Verified Founder Network
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">

              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}

              <Link href="/apply">
                <Button className="h-10 px-6 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0b1622] rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#c6a43f]/20">
                  Request Listing
                </Button>
              </Link>

            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-white bg-white/10 border border-white/10 rounded-lg"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </button>

          </nav>
        </header>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#050c14] via-[#0b1622] to-[#050c14] animate-in fade-in duration-300">

          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6 text-[#c6a43f]" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-10 px-6 text-center">

            <Link
              href="/"
              className={`text-3xl uppercase tracking-[0.25em] font-black transition ${
                pathname === "/" ? "text-[#c6a43f]" : "text-white hover:text-[#c6a43f]"
              }`}
            >
              Home
            </Link>

            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-3xl uppercase tracking-[0.25em] font-black transition ${
                    isActive
                      ? "text-[#c6a43f]"
                      : "text-white hover:text-[#c6a43f]"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}

            <Link href="/apply" className="w-full max-w-xs mt-12">
              <Button className="w-full h-14 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0b1622] rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#c6a43f]/20">
                Request Listing
              </Button>
            </Link>

            <div className="mt-16 text-[10px] uppercase tracking-[0.4em] text-white/40">
              Public · Verified · Founder First
            </div>

          </div>
        </div>
      )}
    </>
  )
}
