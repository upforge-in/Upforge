"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Registry", href: "/startup" },
    { name: "Sponsor", href: "/sponsor" },
    { name: "Verification", href: "/docs" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-4"
          : "py-6"
      }`}
    >
      <nav className={`max-w-5xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl py-2 px-4 rounded-full border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
          : ""
      }`}>
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-black p-1.5 transition-transform duration-500 group-hover:rotate-[10deg]">
            <Image
              src="/logo.jpg"
              alt="UpForge"
              fill
              className="object-contain invert"
              priority
            />
          </div>
          <span className="text-lg font-display font-bold tracking-tighter text-black">
            UpForge
          </span>
        </Link>

        {/* Desktop Navigation - Minimalist style */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-1 h-1 bg-black rounded-full mx-auto right-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button - "Less is More" Design */}
        <div className="hidden md:block">
          <Link href="/apply">
            <Button variant="outline" className="premium-button rounded-full px-6 h-9 border-black text-black bg-transparent hover:bg-black hover:text-white text-[12px] font-bold uppercase tracking-tighter transition-all duration-300">
              Join Registry
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-black hover:opacity-70 transition-opacity"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile Drawer - High-End Aesthetic */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-300 flex flex-col">
          <div className="flex justify-between items-center p-8">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
              Navigation
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-black"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col px-10 pt-10 space-y-6">
            {links.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-5xl font-display font-bold tracking-tighter text-black hover:translate-x-2 transition-transform duration-300"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto p-10">
            <Link href="/apply" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full h-16 bg-black text-white text-lg font-bold">
                Apply for Registry
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
