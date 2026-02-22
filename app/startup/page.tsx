"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Crown, Search, Sparkles } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";

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

export default function StartupsPage() {
  const supabase = createClient();

  const [startups, setStartups] = useState<StartupDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data) {
        setStartups(data);
      }

      setLoading(false);
    };

    fetchStartups();
  }, []);

  const filteredStartups = useMemo(() => {
    if (!query) return startups;
    return startups.filter((startup) =>
      startup.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, startups]);

  const total = startups.length;

  return (
    <>
      <style>{style}</style>
      <div className="relative min-h-screen bg-[#0a0c0e] text-white overflow-hidden">
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

        <div className="relative z-10 py-32 px-6">
          <div className="max-w-6xl mx-auto">
            {/* HEADER */}
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 shadow-xl">
                <Sparkles className="h-4 w-4 text-[#c6a43f]" />
                <span className="text-xs font-medium tracking-wider text-white/80">
                  UPFORGE · FOUNDER DIRECTORY
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#c6a43f]">
                  Startup
                </span>
                <span className="block mt-2 relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c6a43f] via-[#1e3a5f] to-[#c6a43f] [text-shadow:_0_0_30px_rgba(198,164,63,0.5)]">
                    Registry.
                  </span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f]/30 to-[#1e3a5f]/30 blur-2xl -z-10"></span>
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                Search and discover verified Indian startups—curated for serious founders and investors.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-[#c6a43f]/30" />
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
                  {total} {total === 1 ? "Startup" : "Startups"} Listed
                </p>
                <div className="h-px w-8 bg-[#c6a43f]/30" />
              </div>
            </div>

            {/* SEARCH */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl mb-16">
              <div className="relative">
                <SearchBar query={query} setQuery={setQuery} />
              </div>
            </div>

            {/* DIRECTORY GRID */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 text-gray-400">
                  <div className="h-4 w-4 rounded-full border-2 border-[#c6a43f] border-t-transparent animate-spin" />
                  <span className="text-sm uppercase tracking-wider">Loading directory...</span>
                </div>
              </div>
            ) : filteredStartups.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStartups.map((startup) => (
                  <Link
                    key={startup.id}
                    href={`/startup/${startup.slug}`}
                    className="group"
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-[#c6a43f]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c6a43f]/10 h-full flex flex-col items-center text-center">
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none"></div>

                      {startup.is_sponsored && (
                        <div className="absolute top-3 right-3">
                          <Crown className="h-4 w-4 text-[#c6a43f]" />
                        </div>
                      )}

                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={`${startup.name} logo`}
                          className="h-16 w-16 object-contain rounded-xl bg-white/10 p-2 border border-white/20 mb-3"
                        />
                      ) : (
                        <div className="h-16 w-16 flex items-center justify-center bg-white/5 rounded-xl mb-3 border border-white/10">
                          <span className="text-2xl font-semibold text-white/50">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-white group-hover:text-[#c6a43f] transition-colors line-clamp-1">
                        {startup.name}
                      </h3>

                      {startup.short_description && (
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                          {startup.short_description}
                        </p>
                      )}

                      {startup.is_sponsored && (
                        <span className="mt-2 text-[10px] uppercase tracking-wider text-[#c6a43f] font-medium">
                          Sponsored
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 mb-4">
                  <Search className="h-6 w-6 text-white/20" />
                </div>
                <p className="text-gray-400 uppercase tracking-widest text-xs">
                  No startups found
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
