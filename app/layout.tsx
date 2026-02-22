// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"),
  title: {
    default: "UpForge – India's Founder Registry",
    template: "%s | UpForge",
  },
  description: "A premium directory for verified Indian startups. Get discovered, build authority, and connect with serious builders.",
  keywords: ["Startup Directory India", "Verified Founders", "Premium Startup Network", "UpForge"],
  authors: [{ name: "UpForge Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://upforge.in",
    siteName: "UpForge",
    title: "UpForge – India's Founder Registry",
    description: "Where ambitious founders gain the visibility they deserve.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${bricolage.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="flex min-h-screen flex-col relative">
            {/* Subtle noise texture */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4xIiAvPjwvc3ZnPg==')] bg-repeat" />
            
            <Navbar />
            <main className="flex-1 animate-fade-in">{children}</main>
            <Footer />
            <Chatbot />
            <Toaster />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
