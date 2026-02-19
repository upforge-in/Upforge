"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { BusinessForm } from "./business-form"

export function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Startups", href: "/#startups" },
    { name: "About Us", href: "/#about" },
  ]

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-primary/20 bg-white shadow-inner">
            <Image src="/logo.jpg" alt="Logo" fill className="object-cover transition-transform group-hover:scale-110" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-foreground">UP</span>
            <span className="bg-gradient-to-r from-muted-foreground/60 to-muted-foreground/30 bg-clip-text text-transparent">FORGE</span>
          </span>
        </Link>

        {/* Desktop Navigation - Same Sections */}
        <div className="hidden md:flex md:items-center md:gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-muted-foreground transition-all hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-border/60" />
          <BusinessForm />
        </div>

        {/* Mobile View - Hamburger Removed, Only Connect Icon remains */}
        <div className="flex md:hidden items-center">
          <BusinessForm isMobile={true} />
        </div>
      </nav>
    </header>
  )
}
