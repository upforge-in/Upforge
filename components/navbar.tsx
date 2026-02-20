"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BusinessForm } from "./business-form"

export function Navbar() {
  const pathname = usePathname()

  // Updated links as per your requirement
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/startup" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <header className="fixed top-0 z-[100] w-full border-b border-zinc-200 bg-[#F8F8F6]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* BRAND */}
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <Image
              src="/logo.jpg"
              alt="Upforge Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-xl font-semibold tracking-tight">
              UPFORGE
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mt-1">
              Founder Registry
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV - Shows Home, Directory, About Us */}
        <div className="hidden md:flex items-center gap-14">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.25em] transition-colors duration-200 font-medium ${
                    isActive
                      ? "text-black border-b border-black pb-1"
                      : "text-zinc-500 hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="h-5 w-px bg-zinc-200" />

          {/* CTA */}
          <BusinessForm />
        </div>

        {/* MOBILE - Remains same as requested */}
        <div className="md:hidden">
          <BusinessForm isMobile={true} />
        </div>

      </nav>
    </header>
  )
}
