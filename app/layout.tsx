import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"),
  title: {
    default: "UpForge | India’s Independent Founder Registry",
    template: "%s | UpForge",
  },
  description:
    "UpForge is a structured public registry of verified founders and startups in India, built for long-term credibility and signal transparency.",
  applicationName: "UpForge",
  authors: [{ name: "UpForge" }],
  creator: "UpForge",
  publisher: "UpForge",
  alternates: {
    canonical: "https://upforge.in",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://upforge.in",
    siteName: "UpForge",
    title: "UpForge | India’s Independent Founder Registry",
    description:
      "A structured public registry of verified founders and startups in India.",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "UpForge – India’s Independent Founder Registry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge | India’s Independent Founder Registry",
    description:
      "A structured public registry of verified founders and startups in India.",
    images: ["/og-main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased font-sans bg-[#0B1420] text-[#EAEAEA]`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "UpForge",
              url: "https://upforge.in",
              logo: "https://upforge.in/og-main.jpg",
              foundingDate: "2025",
              foundingLocation: {
                "@type": "Country",
                name: "India",
              },
              description:
                "India’s Independent Founder Registry. A structured public registry of verified founders and startups.",
            }),
          }}
        />
      </body>
    </html>
  )
}
