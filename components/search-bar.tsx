"use client"

interface SearchBarProps {
  query: string
  setQuery: (value: string) => void
}

export function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search startups..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition"
      />
    </div>
  )
}
