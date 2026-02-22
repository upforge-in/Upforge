// app/reports/page.tsx
import { Button } from "@/components/ui/button"
import { Mail, Phone, FileText, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Market Reports | UpForge Intelligence",
  description: "Request on‑demand market reports, founder trends, and ecosystem data from UpForge. Tailored insights for serious builders and investors.",
}

export default function ReportsPage() {
  return (
    <div className="relative bg-[#fbf9f6] min-h-screen text-[#1e1b1b] antialiased">
      {/* Subtle diagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        {/* ================= HERO ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1e3a5f]/10 mb-6">
            <TrendingUp className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">
              Market Intelligence
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Insights <span className="font-semibold text-[#1e3a5f]">on Demand.</span>
          </h1>
          <p className="text-lg text-[#4a4a4a] leading-relaxed">
            Get access to exclusive market reports, founder trends, and ecosystem data tailored to your needs. 
            Our team prepares detailed reports on emerging sectors, investor activity, and startup landscapes.
          </p>
        </div>

        {/* ===== FEATURED REPORT CARD (optional visual) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all group">
            <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 transition-colors">
              <FileText className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sector Deep Dives</h3>
            <p className="text-[#4a4a4a] text-sm">Comprehensive analysis of emerging sectors like ClimateTech, SaaS, D2C, and more.</p>
          </div>
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all group">
            <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 transition-colors">
              <TrendingUp className="h-6 w-6 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Founder Trends</h3>
            <p className="text-[#4a4a4a] text-sm">Data‑driven insights on fundraising, team building, and growth patterns.</p>
          </div>
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 hover:border-[#c6a43f]/30 transition-all group">
            <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 transition-colors">
              <svg className="h-6 w-6 text-[#c6a43f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Investor Activity</h3>
            <p className="text-[#4a4a4a] text-sm">Track who is investing where, deal flow, and emerging funds.</p>
          </div>
        </div>

        {/* ================= CONTACT SECTION ================= */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-[#1e3a5f]/10 rounded-3xl p-12 md:p-16 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
              Request a <span className="font-semibold text-[#1e3a5f]">Custom Report</span>
            </h2>
            <p className="text-center text-[#4a4a4a] mb-12 max-w-2xl mx-auto">
              Our reports are prepared on demand. Reach out to our intelligence team, and we’ll get back to you within 24 hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone Card */}
              <div className="bg-[#fbf9f6] border border-[#1e3a5f]/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/30 transition-all group">
                <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                  <Phone className="h-8 w-8 text-[#c6a43f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call or WhatsApp</h3>
                <p className="text-[#4a4a4a] mb-4">Speak directly with our team.</p>
                <a
                  href="tel:+919217713161"
                  className="inline-block text-2xl font-bold text-[#1e3a5f] hover:text-[#c6a43f] transition-colors"
                >
                  +91 92177 13161
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-[#fbf9f6] border border-[#1e3a5f]/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/30 transition-all group">
                <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c6a43f]/10 transition-colors">
                  <Mail className="h-8 w-8 text-[#c6a43f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-[#4a4a4a] mb-4">Send your requirements.</p>
                <div className="space-y-2">
                  <a
                    href="mailto:info@upforge.in"
                    className="block text-lg font-medium text-[#1e3a5f] hover:text-[#c6a43f] transition-colors"
                  >
                    info@upforge.in
                  </a>
                
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-[#4a4a4a] mb-6">
                Typical turnaround: 3–5 business days for custom reports.
              </p>
              <Link href="/contact">
                <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] shadow-lg">
                  Contact Intelligence Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#4a4a4a]">
            UpForge · Independent Founder Registry
          </p>
        </div>
      </div>
    </div>
  )
}
