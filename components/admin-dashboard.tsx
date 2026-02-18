"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { Startup } from "@/types/startup"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Plus, Pencil, Trash2, LogOut, Award, X } from "lucide-react"

interface AdminDashboardProps {
  startups: Startup[]
  userEmail: string
}

interface StartupForm {
  name: string
  slug: string
  description: string
  website: string
  logo_url: string
  founders: string
  founded_year: string
  category: string
  is_featured: boolean
}

const emptyForm: StartupForm = {
  name: "",
  slug: "",
  description: "",
  website: "",
  logo_url: "",
  founders: "",
  founded_year: "",
  category: "",
  is_featured: false,
}

export function AdminDashboard({ startups, userEmail }: AdminDashboardProps) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<StartupForm>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const handleAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const handleEdit = (startup: Startup) => {
    setEditingId(startup.id)
    setForm({
      name: startup.name,
      slug: startup.slug,
      description: startup.description,
      website: startup.website || "",
      logo_url: startup.logo_url || "",
      founders: Array.isArray(startup.founders) ? startup.founders.join(", ") : startup.founders || "",
      founded_year: startup.founded_year?.toString() || "",
      category: startup.category,
      is_featured: startup.is_featured,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    const supabase = createClient()
    await supabase.from("startups").delete().eq("id", id)
    router.refresh()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const supabase = createClient()

    const payload = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      description: form.description,
      website: form.website || null,
      logo_url: form.logo_url || null,
      founders: form.founders,
      founded_year: form.founded_year ? parseInt(form.founded_year) : null,
      category: form.category,
      is_featured: form.is_featured,
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = editingId 
        ? await supabase.from("startups").update(payload).eq("id", editingId)
        : await supabase.from("startups").insert([payload])

      if (error) throw error
      
      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
      router.refresh()
    } catch (err: any) {
      alert("Error saving: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">UPFORGE Admin</h1>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut}><LogOut className="mr-2 h-4 w-4" />Sign Out</Button>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Startups ({startups.length})</h2>
          <Button onClick={handleAdd} size="sm"><Plus className="mr-2 h-4 w-4" />Add Startup</Button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-lg border bg-card p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-muted-foreground"><X className="h-4 w-4" /></button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5"><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value, slug: editingId ? form.slug : generateSlug(e.target.value)})} /></div>
                <div className="flex flex-col gap-1.5"><Label>Slug</Label><Input required value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} /></div>
              </div>
              <div className="flex flex-col gap-1.5"><Label>Description</Label><Textarea required rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5"><Label>Logo URL</Label><Input placeholder="https://..." value={form.logo_url} onChange={(e) => setForm({...form, logo_url: e.target.value})} /></div>
                <div className="flex flex-col gap-1.5"><Label>Category</Label><Input required value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5"><Label>Founders</Label><Input required value={form.founders} onChange={(e) => setForm({...form, founders: e.target.value})} /></div>
                <div className="flex flex-col gap-1.5"><Label>Website</Label><Input type="url" value={form.website} onChange={(e) => setForm({...form, website: e.target.value})} /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5"><Label>Founded Year</Label><Input type="number" value={form.founded_year} onChange={(e) => setForm({...form, founded_year: e.target.value})} /></div>
                <div className="flex items-center gap-3 pt-6"><Switch checked={form.is_featured} onCheckedChange={(c) => setForm({...form, is_featured: c})} /><Label>Featured</Label></div>
              </div>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : editingId ? "Update" : "Add"}</Button>
            </form>
          </div>
        )}

        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold">Startup</th>
                <th className="px-4 py-3 text-xs font-semibold">Category</th>
                <th className="px-4 py-3 text-right text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {startups.map((s) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 flex items-center gap-3">
                    {s.logo_url && <img src={s.logo_url} className="h-8 w-8 rounded object-contain" alt="" />}
                    <div><p className="text-sm font-medium">{s.name}</p></div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{s.category}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(s)} className="p-1.5 hover:bg-secondary rounded mr-2"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 hover:bg-destructive/10 text-destructive rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
