import Link from "next/link"
import { ArrowLeft, Award, ExternalLink, Calendar, Users, Tag } from "lucide-react"
import type { Startup } from "@/types/startup"

interface StartupDetailProps {
  startup: Startup
}

export function StartupDetail({ startup }: StartupDetailProps) {
  return (
    <div className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all startups
        </Link>

        <div className="mt-8">
          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <span className="text-2xl font-bold text-secondary-foreground">
                {startup.name.charAt(0)}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {startup.name}
                </h1>
                {startup.is_featured && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                    <Award className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" />
                  {startup.category}
                </div>
                {startup.founded_year && (
                  <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    Founded {startup.founded_year}
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {Array.isArray(startup.founders)
                  ? startup.founders.join(", ")
                  : startup.founders || "Founders not listed"}

                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground">
              {startup.description}
            </p>
          </div>

          {startup.website && (
            <div className="mt-10">
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Visit Website
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
