import Link from "next/link"
import { Award, ArrowUpRight } from "lucide-react"
import type { Startup } from "@/types/startup"

interface StartupCardProps {
  startup: Startup
  featured?: boolean
}

export function StartupCard({ startup, featured = false }: StartupCardProps) {
  return (
    <Link href={`/startup/${startup.slug}`} className="group block">
      <article
        className={`relative flex h-full flex-col rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-md ${
          featured
            ? "border-primary/20 shadow-sm"
            : "border-border hover:border-primary/10"
        }`}
      >
        {startup.is_featured && (
          <div className="absolute right-4 top-4">
            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1">
              <Award className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Featured
              </span>
            </div>
          </div>
        )}

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-secondary">
          <span className="text-lg font-bold text-secondary-foreground">
            {startup.name.charAt(0)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary">
          {startup.name}
        </h3>

        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {startup.category}
          </span>
          {startup.founded_year && (
            <span className="text-xs text-muted-foreground">
              Est. {startup.founded_year}
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {startup.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            {/* Added optional chaining and fallback for safety */}
            {startup.founders?.split(",")[0] || "Founders not listed"}
            {startup.founders?.includes(",") && " & others"}
          </p>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
      </article>
    </Link>
  )
}
