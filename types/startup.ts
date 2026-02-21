export interface Startup {
  id: string
  name: string
  slug: string
  logo_url: string
  description: string
  short_description?: string // Added to support the directory view
  website: string

  // allow both single string and array
  founders: string | string[]

  founded_year: number
  category?: string
  location?: string
  is_sponsored?: boolean
  is_featured?: boolean
  created_at?: string
}

export interface StartupDirectoryItem {
  id: string
  name: string
  slug: string
  logo_url: string
  short_description?: string // Added to fix the "Property does not exist" error
  is_sponsored?: boolean
  is_featured?: boolean
}
