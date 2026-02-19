import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhyUpforge } from "@/components/why-upforge"
import { Footer } from "@/components/footer"
import { StartupCard } from "@/components/startup-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .limit(3)
    .order("created_at", { ascending: false })

  const { data: regular } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", false)
    .limit(6)
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* ELITE STARTUPS SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
                <ShieldCheck className="h-4 w-4" />
                Institutional Grade
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">
                The Elite Network
              </h2>
              <p className="text-slate-500 font-medium text-lg max-w-xl">
                The most influential independent founders currently verified within the UpForge ecosystem.
              </p>
            </div>
            <Link 
              href="/startup" 
              className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all"
            >
              View Full Directory 
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {featured?.map((startup) => (
              <StartupCard key={startup.id} startup={startup} featured />
            ))}
          </div>
        </section>

        <div className="bg-slate-50/50 border-y border-slate-100">
          <WhyUpforge />
        </div>

        {/* RECENTLY VERIFIED SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
              Recently Verified
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regular?.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <Link href="/startup">
              <Button variant="outline" className="h-16 px-12 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-sm font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-slate-200">
                Explore All Startups
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
