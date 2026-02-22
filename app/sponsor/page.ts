import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Crown, Sparkles, TrendingUp, Users, Instagram, Twitter, Linkedin, Zap } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sponsor Your Startup | UpForge",
  description: "Increase your startup's visibility with UpForge sponsorship. Get featured in our Top 10, daily social media posts, and more.",
}

export default async function SponsorPage() {
  const supabase = await createClient()

  // Fetch featured startups to showcase
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6)

  const pricingPlans = [
    {
      name: "Trial",
      duration: "1 Day",
      price: "49",
      description: "Perfect for testing the waters.",
      features: ["Featured in Top 10 for 24 hours", "1 social media post", "Basic analytics"],
      highlighted: false,
      cta: "Start Trial",
    },
    {
      name: "Weekly",
      duration: "1 Week",
      price: "199",
      description: "Maximum impact for a week.",
      features: ["Featured in Top 10 for 7 days", "Daily social media posts", "Premium analytics", "Dedicated support"],
      highlighted: true,
      cta: "Sponsor Now",
    },
    {
      name: "Monthly",
      duration: "1 Month",
      price: "499",
      description: "Sustained visibility and growth.",
      features: [
        "Featured in Top 10 for 30 days",
        "Daily social media posts",
        "Premium analytics",
        "Dedicated support",
        "Exclusive newsletter feature",
      ],
      highlighted: false,
      cta: "Sponsor Now",
    },
  ]

  return (
    <div className="relative bg-[#fbf9f6] min-h-screen text-[#1e1b1b] antialiased">
      {/* Subtle diagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        {/* ================= HERO ================= */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1e3a5f]/10 mb-6">
            <Crown className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">
              Sponsor Your Startup
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Get the <span className="font-semibold text-[#1e3a5f]">Visibility</span>
            <br />
            You Deserve.
          </h1>
          <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto leading-relaxed">
            Join the Top 10 sponsored startups and reach thousands of investors, founders, and
            decision-makers daily. We amplify your story across our social channels.
          </p>
        </div>

        {/* ================= BENEFITS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/30 transition-all">
            <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Top 10 Placement</h3>
            <p className="text-[#4a4a4a]">
              Your startup gets prime placement in our sponsored section, seen by every visitor.
            </p>
          </div>
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/30 transition-all">
            <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Daily Social Posts</h3>
            <p className="text-[#4a4a4a]">
              We feature your startup daily on our Instagram, Twitter, and LinkedIn — reaching 50K+ followers.
            </p>
          </div>
          <div className="bg-white border border-[#1e3a5f]/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/30 transition-all">
            <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-[#c6a43f]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Amplified Growth</h3>
            <p className="text-[#4a4a4a]">
              Investors and partners actively browse sponsored startups — get in front of the right people.
            </p>
          </div>
        </div>

        {/* ================= PRICING ================= */}
        <div className="mb-32">
          <h2 className="text-4xl font-light text-center mb-16">
            Simple, <span className="font-semibold text-[#1e3a5f]">Transparent</span> Pricing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white border rounded-3xl p-8 ${
                  plan.highlighted
                    ? "border-[#c6a43f] shadow-xl scale-105 md:scale-110 z-10"
                    : "border-[#1e3a5f]/10 hover:border-[#c6a43f]/30"
                } transition-all`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a43f] text-[#0f1e2f] text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-[#4a4a4a] text-sm mb-4">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-[#4a4a4a] text-sm mb-1">/{plan.duration.toLowerCase()}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-[#c6a43f] shrink-0 mt-0.5" />
                      <span className="text-[#4a4a4a]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/apply">
                  <Button
                    className={`w-full h-12 rounded-full ${
                      plan.highlighted
                        ? "bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f]"
                        : "bg-white border border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/5"
                    } text-xs font-bold uppercase tracking-wider`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SHOWCASE: EDITORIAL PICKS ================= */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 rounded-full bg-[#1e3a5f]/10">
              <Crown className="h-5 w-5 text-[#c6a43f]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light">
              Previously <span className="font-semibold text-[#1e3a5f]">Featured</span>
            </h2>
          </div>

          {featured && featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featured.map((startup) => (
                <div
                  key={startup.id}
                  className="bg-white border border-[#1e3a5f]/10 rounded-xl p-4 text-center hover:border-[#c6a43f]/30 transition-all group"
                >
                  {startup.logo_url ? (
                    <img
                      src={startup.logo_url}
                      alt={startup.name}
                      className="h-12 w-12 object-contain rounded-lg mx-auto mb-3"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-semibold text-[#1e3a5f]">
                        {startup.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h4 className="font-medium text-sm mb-1 line-clamp-1">{startup.name}</h4>
                  {startup.is_sponsored && (
                    <Crown className="h-3 w-3 text-[#c6a43f] mx-auto" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white border border-[#1e3a5f]/10 rounded-2xl">
              <p className="text-[#4a4a4a] text-sm">No featured startups yet. Be the first!</p>
            </div>
          )}
        </div>

        {/* ================= SOCIAL PROOF ================= */}
        <div className="bg-white border border-[#1e3a5f]/10 rounded-3xl p-12 text-center">
          <div className="flex justify-center gap-8 mb-8">
            <Instagram className="h-8 w-8 text-[#c6a43f]" />
            <Twitter className="h-8 w-8 text-[#c6a43f]" />
            <Linkedin className="h-8 w-8 text-[#c6a43f]" />
          </div>
          <h3 className="text-2xl font-light mb-4">
            We post about you daily on social media.
          </h3>
          <p className="text-[#4a4a4a] max-w-2xl mx-auto mb-8">
            Your startup reaches our entire network — investors, journalists, and fellow founders.
          </p>
          <Link href="/apply">
            <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] shadow-lg">
              Sponsor Your Startup
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#4a4a4a]">
            UpForge · Independent Founder Registry
          </p>
        </div>
      </div>
    </div>
  )
}
