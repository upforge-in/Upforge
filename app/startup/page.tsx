"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { StartupCard } from "@/components/startup-card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar } from "lucide-react"

export default function DirectoryPage() {
  const [startups, setStartups] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      let query = supabase.from("startups").select("*")
      
      if (search) query = query.ilike("name", `%${search}%`)
      if (category !== "All") query = query.eq("category", category)
      
      const { data } = await query.order("name", { ascending: true })
      setStartups(data || [])
    }
    fetchData()
  }, [search, category])

  return (
    <main className="min-h-screen bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tight mb-4">Startup Directory</h1>
          <p className="text-slate-500 text-lg font-medium">Discover and connect with verified Indian startups.</p>
        </div>

        {/* Search & Filter Bar - Premium Look */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by name..." 
              className="pl-12 h-14 rounded-2xl border-none bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-900"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            onChange={(e) => setCategory(e.target.value)}
            className="h-14 px-6 rounded-2xl bg-slate-50 border-none font-bold text-slate-600 focus:ring-2 focus:ring-slate-900 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="SaaS">SaaS</option>
            <option value="EdTech">EdTech</option>
            <option value="FinTech">FinTech</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {startups.map(s => <StartupCard key={s.id} startup={s} />)}
        </div>
        
        {startups.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold">No startups found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  )
}
