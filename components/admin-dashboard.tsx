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
      // Handles both array and string formats for founders
      founders: Array.isArray(startup.founders) 
        ? startup.founders.join(", ") 
        : startup.founders || "",
      founded_year: startup.founded_year?.toString() || "",
      category: startup.category,
      is_featured: startup.is_featured,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this startup?")) return
    const supabase = createClient()
    const { error } = await supabase.from("startups").delete().eq("id", id)
    
    if (error) {
      alert("Error deleting record: " + error.message)
    } else {
      router.refresh()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const supabase = createClient()

    // payload keys match columns in official schema (founded_year, logo_url, etc)
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
      let error
      if (editingId) {
        ({ error } = await supabase.from("startups").update(payload).eq("id", editingId))
      } else {
        ({ error } = await supabase.from("startups").insert([payload]))
      }

      if (error) throw error

      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
      
      // Forces Next.js to re-fetch data for all components
      router.refresh() 
    } catch (error: any) {
      alert("Error saving to database: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">UPFORGE Admin</h1>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-1.5 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Startups</h2>
            <p className="text-sm text-muted-foreground">
              {startups.length} startup{startups.length !== 1 ? "s" : ""} listed
            </p>
          </div>
          <Button onClick={handleAdd} size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Startup
          </Button>
        </div>

        {showForm && (
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-card-foreground">
                {editingId ? "Edit Startup" : "Add Startup"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false)
                  setForm(emptyForm)
                  setEditingId(null)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value
                      setForm((f) => ({
                        ...f,
                        name,
                        slug: editingId ? f.slug : generateSlug(name),
                      }))
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    required
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    placeholder="https://example.com/logo.png"
                    value={form.logo_url}
                    onChange={(e) => setForm((f) => ({ ...f, logo_url: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    required
                    placeholder="e.g., Fintech, SaaS"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="founders">Founders</Label>
                  <Input
                    id="founders"
                    required
                    placeholder="Comma-separated names"
                    value={form.founders}
                    onChange={(e) => setForm((f) => ({ ...f, founders: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://..."
                    value={form.website}
                    onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="founded_year">Founded Year</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    placeholder="2024"
                    value={form.founded_year}
                    onChange={(e) => setForm((f) => ({ ...f, founded_year: e.target.value }))}
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch
                    id="is_featured"
                    checked={form.is_featured}
                    onCheckedChange={(checked) =>
                      setForm((f) => ({ ...f, is_featured: checked }))
                    }
                  />
                  <Label htmlFor="is_featured">Mark as Top Startup</Label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : editingId ? "Update" : "Add Startup"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false)
                    setForm(emptyForm)
                    setEditingId(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-6 rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Startup</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {startups.map((startup) => (
                  <tr key={startup.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {startup.logo_url && (
                          <img src={startup.logo_url} alt="" className="h-8 w-8 rounded object-contain" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{startup.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {Array.isArray(startup.founders) 
                              ? startup.founders[0] 
                              : startup.founders?.split(",")[0]}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                        {startup.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {startup.is_featured ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                          <Award className="h-3 w-3" /> Featured
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Listed</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => handleEdit(startup)} className="p-1.5 hover:bg-secondary rounded">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDelete(startup.id)} className="p-1.5 hover:bg-destructive/10 text-destructive rounded">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
