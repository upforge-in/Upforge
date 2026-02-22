// components/navbar.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b border-gray-100 bg-white">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo + Est. badge */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.jpg"
              alt="UpForge"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-medium text-gray-900 tracking-tight">
              UpForge
            </span>
            <span className="text-[10px] uppercase text-gray-400 tracking-wider">
              Est. 2025
            </span>
          </div>
        </Link>

        {/* Desktop navigation - max 3 links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/startup"
            className={`text-sm ${
              pathname === "/startup"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            } transition-colors`}
          >
            Registry
          </Link>
          <Link
            href="/reports"
            className={`text-sm ${
              pathname === "/reports"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            } transition-colors`}
          >
            Reports
          </Link>
          <Link
            href="/about"
            className={`text-sm ${
              pathname === "/about"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            } transition-colors`}
          >
            About
          </Link>
        </div>

        {/* CTA */}
        <Link href="/apply">
          <Button className="h-9 px-5 bg-gray-900 text-white hover:bg-gray-800 text-sm font-medium">
            Apply for Verification
          </Button>
        </Link>
      </nav>

      {/* Mobile navigation is intentionally omitted for brevity; you can add a simple hamburger if needed, but the design philosophy favours minimalism. */}
    </header>
  )
}
