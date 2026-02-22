// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap' 
});

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"], 
  variable: "--font-display",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Slite – Where remote teams share knowledge and make decisions",
  description: "Say goodbye to endless meetings and Slack threads.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}
