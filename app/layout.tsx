import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google"; // Premium typography pairing
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// Professional UI Font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// High-end Display Font for a "Founder" aesthetic
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  themeColor: "#4f46e5", // Indigo-600
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "UpForge | The Definitive Indian Startup Registry",
    template: "%s | UpForge India"
  },
  description: "The most authentic, verified source for Indian startups and independent founders. Connect with the next wave of innovation through our high-trust network.",
  metadataBase: new URL("https://upforge.in"),
  generator: "Next.js",
  keywords: [
    "Verified Startups India", 
    "Founder Network India", 
    "Startup Directory", 
    "Venture Capital India", 
    "UpForge Registry",
    "Independent Founders"
  ],
  authors: [{ name: "UpForge Intelligence Team" }],
  creator: "UpForge",
  publisher: "UpForge India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "UpForge | The Definitive Indian Startup Registry",
    description: "Access verified data on India's emerging startups and independent founders.",
    url: "https://upforge.in",
    siteName: "UpForge India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Ensure you have a premium OG image
        width: 1200,
        height: 630,
        alt: "UpForge - India's Independent Founder Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge | India's Startup Registry",
    description: "Verified data and networking for India's independent founders.",
    creator: "@upforge_in",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body 
        className={`${inter.variable} ${bricolage.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
        >
          <div className="flex min-h-screen flex-col selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />
            
            {/* Premium Page Transition Wrapper */}
            <main className="flex-1 page-transition-wrapper">
              {children}
            </main>
            
            <Footer />
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
