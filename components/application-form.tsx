"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2, ShieldCheck, Globe, Building2, Calendar, Layout } from "lucide-react"

export function ApplicationForm({ userEmail, userId }: { userEmail: string, userId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const inputStyles = "h-14 rounded-xl border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all text-base shadow-sm"
  const labelStyles = "text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 ml-1 flex items-center gap-2"

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
      toast.success("Application submitted! Your startup has been logged in the verification ledger.")
      router.push("/startup")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className={labelStyles}>
            <Building2 className="h-3 w-3" /> Startup Name
          </label>
          <Input name="name" placeholder="Acme Corp" required className={inputStyles} />
        </div>
        <div className="space-y-3">
          <label className={labelStyles}>
            <Layout className="h-3 w-3" /> Industry
          </label>
          <Input name="category" placeholder="Fintech / AI / SaaS" required className={inputStyles} />
        </div>
      </div>

      <div className="space-y-3">
        <label className={labelStyles}>
          <ShieldCheck className="h-3 w-3" /> One-line Pitch
        </label>
        <Textarea 
          name="description" 
          placeholder="What are you building? Explain the core value proposition..." 
          required 
          className="min-h-[120px] rounded-xl border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all text-base shadow-sm resize-none p-4" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className={labelStyles}>
            <Globe className="h-3 w-3" /> Official Website
          </label>
          <Input name="website_url" type="url" placeholder="https://..." required className={inputStyles} />
        </div>
        <div className="space-y-3">
          <label className={labelStyles}>
            <Calendar className="h-3 w-3" /> Year Founded
          </label>
          <Input name="founded_year" type="number" placeholder="2025" required className={inputStyles} />
        </div>
      </div>

      <div className="space-y-3">
        <label className={labelStyles}>
          <ShieldCheck className="h-3 w-3" /> Brand Logo URL
        </label>
        <Input name="logo_url" type="url" placeholder="https://..." className={inputStyles} />
        <p className="text-[10px] text-zinc-400 italic px-1">Institutional verification requires a high-resolution transparent logo.</p>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl uppercase text-xs font-black tracking-[0.25em] transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Processing Registry...</span>
            </div>
          ) : (
            "Submit for Institutional Review"
          )}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-zinc-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span className="text-[9px] uppercase font-bold tracking-widest">Secured by Upforge Verification Protocol</span>
      </div>
    </form>
  )
}
