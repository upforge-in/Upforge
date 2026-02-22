// components/navbar.tsx
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded border border-primary/10 bg-white p-1.5">
            <Image src="/logo.jpg" alt="UpForge" fill className="object-contain" priority />
          </div>
          <span className="text-lg font-display font-semibold tracking-tight text-primary">UpForge</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Link href="/apply">
            <Button className="rounded-full px-5 h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium">
              Apply for Registry
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(true)} className="md:hidden p-2 text-primary">
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in">
          <div className="flex justify-between items-center p-6 border-b border-border">
            <span className="text-xs font-medium tracking-widest text-muted-foreground">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X className="h-6 w-6 text-primary" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-[70vh] space-y-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-light text-primary hover:underline underline-offset-8"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
