// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Award, Users, TrendingUp, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UpForge – India's Founder Registry",
  description: "A premium directory for verified Indian startups. Get discovered, build authority, and connect.",
};

export default async function Home() {
  const supabase = await createClient();

  // Fetch sponsor of the week (latest sponsored startup)
  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1);

  // Fetch top 8 sponsored startups
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(8);

  // Fetch top 8 featured startups (non-sponsored, but featured)
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8);

  // Basic counts for stats
  const { count: totalStartups } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true });

  const { count: verifiedCount } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true })
    .eq("is_verified", true);

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display font-light tracking-tight text-primary">
            India’s Founder Registry
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated directory for verified startups. Gain visibility, build authority, and connect with serious builders.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/apply">
              <Button className="rounded-full px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-md">
                List Your Startup <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/startup">
              <Button variant="outline" className="rounded-full px-8 h-12 border-primary/30 text-primary hover:bg-primary/5 text-sm font-medium">
                Browse Directory
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-secondary" />
              <span>{totalStartups?.toLocaleString() || "3,200+"} startups</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-4 w-4 text-secondary" />
              <span>{verifiedCount?.toLocaleString() || "2,800+"} verified</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span>10k+ monthly visitors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor of the Week */}
      {sponsorOfWeek && sponsorOfWeek.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-5 w-5 text-secondary" />
            <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Sponsor of the Week</h2>
          </div>

          <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="block group">
            <div className="relative bg-card border border-secondary/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 card-hover">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/10 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-50 transition" />
              
              <div className="relative flex items-center gap-6 w-full md:w-auto">
                <img
                  src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                  className="h-20 w-20 object-contain rounded-xl bg-white p-3 shadow-sm"
                  alt={sponsorOfWeek[0].name}
                />
                <div>
                  <h3 className="text-2xl font-display font-light text-primary">{sponsorOfWeek[0].name}</h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 max-w-xl">
                    {sponsorOfWeek[0].short_description || "Featured premium visibility startup."}
                  </p>
                  <span className="inline-block mt-3 text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">Premium Sponsor</span>
                </div>
              </div>
              
              <div className="relative ml-auto">
                <span className="text-sm font-medium text-secondary flex items-center gap-1">
                  View Startup <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Top Sponsored Startups */}
      {sponsored && sponsored.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground mb-8 flex items-center gap-2">
            <Award className="h-4 w-4 text-secondary" /> Top Sponsored
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsored.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                <div className="bg-card border border-border rounded-xl p-6 card-hover h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={startup.logo_url || "/placeholder-logo.svg"}
                      className="h-12 w-12 object-contain rounded-lg bg-white p-2"
                      alt={startup.name}
                    />
                    <h3 className="font-display font-medium text-primary group-hover:text-secondary transition-colors line-clamp-1">
                      {startup.name}
                    </h3>
                  </div>
                  {startup.short_description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{startup.short_description}</p>
                  )}
                  <div className="mt-auto pt-4 text-xs text-secondary">Sponsored</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Startups */}
      {featured && featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground mb-8 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-secondary" /> Editor's Picks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                <div className="bg-card border border-border rounded-xl p-6 card-hover h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={startup.logo_url || "/placeholder-logo.svg"}
                      className="h-12 w-12 object-contain rounded-lg bg-white p-2"
                      alt={startup.name}
                    />
                    <h3 className="font-display font-medium text-primary group-hover:text-secondary transition-colors line-clamp-1">
                      {startup.name}
                    </h3>
                  </div>
                  {startup.short_description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{startup.short_description}</p>
                  )}
                  <div className="mt-auto pt-4 text-xs text-secondary">Featured</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 text-center bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-display font-light mb-4">Ready to be discovered?</h3>
          <p className="text-primary-foreground/70 mb-8 text-lg">Join India's most trusted founder registry.</p>
          <Link href="/sponsor">
            <Button className="rounded-full px-10 h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm uppercase tracking-wider font-semibold border-0 shadow-lg">
              Sponsor Your Startup
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
