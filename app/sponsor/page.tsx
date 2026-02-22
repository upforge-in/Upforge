import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Crown,
  Sparkles,
  TrendingUp,
  Users,
  Instagram,
  Twitter,
  Linkedin,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Your Startup | UpForge",
  description:
    "Increase your startup's visibility with UpForge sponsorship. Get featured in our Top 10, daily social media posts, and more.",
};

// Custom CSS animations (shared with homepage)
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; filter: blur(20px); }
    50% { opacity: 1; filter: blur(25px); }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
  .shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.1) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export default async function SponsorPage() {
  const supabase = await createClient();

  // Fetch featured startups to showcase
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

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
      features: [
        "Featured in Top 10 for 7 days",
        "Daily social media posts",
        "Premium analytics",
        "Dedicated support",
      ],
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
  ];

  return (
    <>
      <style>{style}</style>
      <div className="relative bg-[#0a0c0e] min-h-screen text-white antialiased overflow-hidden">
        {/* Dynamic gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#c6a43f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1e3a5f]/30 to-[#c6a43f]/30 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Subtle grid overlay */}
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/%3E%3C/svg%3E')] pointer-events-none`}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40 z-10">
          {/* ================= HERO ================= */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 shadow-xl">
              <Crown className="h-4 w-4 text-[#c6a43f]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Sponsor Your Startup
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#c6a43f]">
                Get the
              </span>
              <br />
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c6a43f] via-[#1e3a5f] to-[#c6a43f] [text-shadow:_0_0_30px_rgba(198,164,63,0.5)]">
                  Visibility
                </span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f]/30 to-[#1e3a5f]/30 blur-2xl -z-10"></span>
              </span>
              <span className="block text-white">You Deserve.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join the Top 10 sponsored startups and reach thousands of investors, founders, and
              decision-makers daily. We amplify your story across our social channels.
            </p>
          </div>

          {/* ================= BENEFITS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              {
                icon: TrendingUp,
                title: "Top 10 Placement",
                desc: "Your startup gets prime placement in our sponsored section, seen by every visitor.",
              },
              {
                icon: Users,
                title: "Daily Social Posts",
                desc: "We feature your startup daily on our Instagram, Twitter, and LinkedIn — reaching 50K+ followers.",
              },
              {
                icon: Zap,
                title: "Amplified Growth",
                desc: "Investors and partners actively browse sponsored startups — get in front of the right people.",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-[#c6a43f]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c6a43f]/10"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none"></div>
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-8 w-8 text-[#c6a43f]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ================= PRICING ================= */}
          <div className="mb-32">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-16">
              Simple,{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c6a43f] to-[#e5c87b]">
                Transparent
              </span>{" "}
              Pricing.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 ${
                    plan.highlighted
                      ? "border-[#c6a43f] shadow-2xl shadow-[#c6a43f]/20 scale-105 md:scale-110 z-10"
                      : "border-white/10 hover:border-[#c6a43f]/40"
                  } transition-all duration-300`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a43f] text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                      <span className="text-gray-400 text-sm mb-1">/{plan.duration.toLowerCase()}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#c6a43f] shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/apply">
                    <Button
                      className={`w-full h-12 rounded-full ${
                        plan.highlighted
                          ? "bg-[#c6a43f] hover:bg-[#b08c2e] text-black"
                          : "bg-white/5 border border-white/20 text-white hover:bg-white/10"
                      } text-xs font-bold uppercase tracking-wider transition-all`}
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
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#c6a43f]/30 to-[#c6a43f]/5 border border-[#c6a43f]/30">
                <Crown className="h-6 w-6 text-[#c6a43f]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light">
                Previously{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c6a43f] to-[#e5c87b]">
                  Featured
                </span>
              </h2>
            </div>

            {featured && featured.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {featured.map((startup) => (
                  <div
                    key={startup.id}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-[#c6a43f]/40 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none"></div>
                    <div className="relative">
                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={startup.name}
                          className="h-12 w-12 object-contain rounded-lg bg-white/10 p-1 border border-white/20 mx-auto mb-3"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-3 border border-white/10">
                          <span className="text-xl font-semibold text-white/50">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h4 className="font-medium text-sm text-white mb-1 line-clamp-1">
                        {startup.name}
                      </h4>
                      {startup.is_sponsored && (
                        <Crown className="h-3 w-3 text-[#c6a43f] mx-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p className="text-gray-400 text-sm">No featured startups yet. Be the first!</p>
              </div>
            )}
          </div>

          {/* ================= SOCIAL PROOF ================= */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c6a43f]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-center gap-8 mb-8">
                <Instagram className="h-8 w-8 text-[#c6a43f]" />
                <Twitter className="h-8 w-8 text-[#c6a43f]" />
                <Linkedin className="h-8 w-8 text-[#c6a43f]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                We post about you daily on social media.
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Your startup reaches our entire network — investors, journalists, and fellow founders.
              </p>
              <Link href="/apply">
                <Button className="group relative h-14 px-12 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-black text-xs uppercase tracking-[0.2em] font-bold shadow-lg overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  Sponsor Your Startup
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">
              UpForge · Independent Founder Registry
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
