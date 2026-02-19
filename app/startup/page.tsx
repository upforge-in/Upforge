"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { StartupCard } from "@/components/startup-card"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft } from "lucide-react"
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
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 mb-12 transition-colors">
          <ArrowLeft className="h-3 w-3" /> BACK TO HOME
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">The Directory</h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl">Access our complete institutional database of verified Indian startups.</p>
        </div>

        <div className="relative mb-20 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input 
            placeholder="Search by startup name or industry..." 
            className="h-20 pl-16 pr-8 rounded-[2rem] border-slate-100 bg-slate-50/50 text-xl font-medium focus-visible:ring-4 focus-visible:ring-blue-50 focus-visible:border-blue-200 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {startups.map(s => <StartupCard key={s.id} startup={s} />)}
        </div>
        
        {startups.length === 0 && (
          <div className="text-center py-32 rounded-[3rem] bg-slate-50 border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-lg">No institutional records found.</p>
          </div>
        )}
      </div>
    </main>
  )
}
