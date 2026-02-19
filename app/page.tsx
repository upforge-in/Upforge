import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhyUpforge } from "@/components/why-upforge"
import { Footer } from "@/components/footer"
import { StartupCard } from "@/components/startup-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, ArrowRight, ShieldCheck, Award, CheckCircle } from "lucide-react"

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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* subtle background pattern */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
      
      <Navbar />
      
      <main className="flex-1">
        <Hero />

        {/* ELITE STARTUPS SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 w-full overflow-hidden">
          {/* decorative background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/20 via-transparent to-transparent" />
          <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl" />
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
                <div className="h-px w-8 bg-blue-200" />
                <ShieldCheck className="h-4 w-4" />
                <span>Institutional Grade</span>
                <div className="h-px w-8 bg-blue-200" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 leading-none">
                The Elite Network
              </h2>
              <p className="text-slate-600 font-medium text-lg max-w-xl leading-relaxed">
                The most influential independent founders currently verified within the UpForge ecosystem. 
                <span className="block text-sm text-slate-400 mt-2">Each startup is rigorously vetted for quality and impact.</span>
              </p>
            </div>
            <Link 
              href="/startup" 
              className="group flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all duration-300"
            >
              <span className="relative">
                View Full Directory
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300 shadow-sm group-hover:shadow group-hover:shadow-blue-100">
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {featured?.map((startup) => (
              <div key={startup.id} className="group relative">
                {/* glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                <div className="relative">
                  <StartupCard startup={startup} featured />
                </div>
              </div>
            ))}
          </div>

          {/* trust badge */}
          <div className="flex justify-center mt-16 gap-8 text-slate-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Verified by UpForge team</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Top 1% of applicants</span>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-b from-slate-50 to-white border-y border-slate-100">
          <WhyUpforge />
        </div>

        {/* RECENTLY VERIFIED SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          {/* subtle top border */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          
          <div className="flex items-center gap-4 mb-12">
            <div className="h-8 w-1 bg-blue-600 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Recently Verified
            </h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regular?.map((startup) => (
              <div key={startup.id} className="group">
                <StartupCard startup={startup} />
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <Link href="/startup">
              <Button 
                variant="outline" 
                className="group relative h-16 px-12 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl hover:shadow-slate-300 overflow-hidden"
              >
                <span className="relative z-10">Explore All Startups</span>
                <span className="absolute inset-0 -z-10 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-slate-400">Join 500+ founders building the future of India</p>
          </div>
        </section>

        {/* subtle callout */}
        <div className="border-t border-slate-100 bg-white/50 backdrop-blur-sm py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>New startups verified weekly</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-slate-400">Trusted by investors from</span>
              <div className="flex gap-4 opacity-70">
                <span className="font-mono text-xs font-bold text-slate-500">SEQUOIA</span>
                <span className="font-mono text-xs font-bold text-slate-500">ACCEL</span>
                <span className="font-mono text-xs font-bold text-slate-500">BLUME</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
