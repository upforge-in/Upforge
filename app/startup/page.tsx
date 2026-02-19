"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { StartupCard } from "@/components/startup-card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, ArrowLeft, Sparkles, ShieldCheck, Award } from "lucide-react"
import Link from "next/link"

export default function DirectoryPage() {
  const [startups, setStartups] = useState([])
  const [search, setSearch] = useState("")
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      let query = supabase.from("startups").select("*")
      if (search) query = query.ilike("name", `%${search}%`)
      const { data } = await query.order("name", { ascending: true })
      setStartups(data || [])
    }
    fetchData()
  }, [search])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* subtle background pattern */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
      
      <Navbar />
      
      <main className="flex-1">
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          {/* decorative background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/20 via-transparent to-transparent" />
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-3xl" />
          
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-16 transition-all duration-300"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span className="relative">
              BACK TO HOME
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>

          <div className="mb-16">
            <div className="flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <div className="h-px w-8 bg-blue-200" />
              <ShieldCheck className="h-4 w-4" />
              <span>Institutional Database</span>
              <div className="h-px w-8 bg-blue-200" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 mb-6">
              The Directory
            </h1>
            <p className="text-slate-600 text-xl font-medium max-w-2xl leading-relaxed">
              Access our complete institutional database of verified Indian startups.
              <span className="block text-sm text-slate-400 mt-2">Every profile is manually reviewed and authenticated.</span>
            </p>
          </div>

          <div className="relative mb-20 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
            <Input 
              placeholder="Search by startup name or industry..." 
              className="h-20 pl-16 pr-8 rounded-[2rem] border-slate-100 bg-white/80 backdrop-blur-sm text-xl font-medium focus-visible:ring-4 focus-visible:ring-blue-50 focus-visible:border-blue-200 transition-all shadow-lg hover:shadow-xl focus:shadow-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* subtle glow on focus */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-[2rem] opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
            {startups.map((startup) => (
              <div key={startup.id} className="group relative">
                {/* glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                <div className="relative">
                  <StartupCard startup={startup} />
                </div>
              </div>
            ))}
          </div>
          
          {startups.length === 0 && (
            <div className="text-center py-32 rounded-[3rem] bg-slate-50/80 border border-dashed border-slate-200 backdrop-blur-sm">
              <p className="text-slate-400 font-bold text-lg mb-2">No institutional records found.</p>
              <p className="text-slate-300 text-sm">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>

        {/* trust indicators */}
        <div className="border-t border-slate-100 bg-white/50 backdrop-blur-sm py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>{startups.length} verified startups in our database</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Updated weekly</span>
              </div>
              <div className="flex gap-4 opacity-70">
                <span className="font-mono text-xs font-bold text-slate-500">SEQUOIA</span>
                <span className="font-mono text-xs font-bold text-slate-500">ACCEL</span>
                <span className="font-mono text-xs font-bold text-slate-500">BLUME</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
