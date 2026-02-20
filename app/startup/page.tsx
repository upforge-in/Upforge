import { createClient } from "@/lib/supabase/server"
import StartupCard from "@/components/startup-card"

export default async function StartupPage() {
  const supabase = createClient()

  const { data: startups, error } = await supabase
    .from("startups")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching startups:", error)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Startups</h1>

      {startups && startups.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No startups found.</p>
      )}
    </div>
  )
}
