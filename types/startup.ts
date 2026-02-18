export interface Startup {
  id: string
  name: string
  slug: string
  description: string
  logo_url: string | null
  website: string | null
  founders: string | string[] | null
  founded_year: number | null
  category: string
  is_featured: boolean
  created_at: string
  updated_at: string
}
