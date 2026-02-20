"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function ApplicationForm({ userEmail, userId }: { userEmail: string, userId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")

    const { error } = await supabase.from("startups").insert({
      name,
      slug,
      description: formData.get("description"),
      category: formData.get("category"),
      website_url: formData.get("website_url"),
      logo_url: formData.get("logo_url"),
      founded_year: parseInt(formData.get("founded_year") as string),
      user_id: userId,
      is_featured: false,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Application submitted! We will review it shortly.")
      router.push("/startup")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Startup Name</label>
          <Input name="name" placeholder="Acme Corp" required className="h-12 rounded-xl border-zinc-200 bg-zinc-50" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Industry</label>
          <Input name="category" placeholder="Fintech / AI / SaaS" required className="h-12 rounded-xl border-zinc-200 bg-zinc-50" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">One-line Pitch</label>
        <Textarea name="description" placeholder="What are you building?" required className="min-h-[100px] rounded-xl border-zinc-200 bg-zinc-50 resize-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Website</label>
          <Input name="website_url" type="url" placeholder="https://..." required className="h-12 rounded-xl border-zinc-200 bg-zinc-50" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Year Founded</label>
          <Input name="founded_year" type="number" placeholder="2025" required className="h-12 rounded-xl border-zinc-200 bg-zinc-50" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Logo URL</label>
        <Input name="logo_url" type="url" placeholder="https://..." className="h-12 rounded-xl border-zinc-200 bg-zinc-50" />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full uppercase text-xs tracking-[0.2em] transition-all"
      >
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Submit for Verification"}
      </Button>
    </form>
  )
}
