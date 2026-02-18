"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Award, Calendar, Globe, Users, ArrowLeft } from "lucide-react"
import type { Startup } from "@/types/startup"
import Link from "next/link"

interface StartupDetailProps {
  startup: Startup
}

export function StartupDetail({ startup }: StartupDetailProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link href="/" className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-6">
            {/* Main Detailed Logo */}
            {startup.logo_url ? (
              <img 
                src={startup.logo_url} 
                alt={startup.name} 
                className="h-24 w-24 rounded-2xl border bg-white object-contain p-2 shadow-sm"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
                {startup.name[0]}
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {startup.name}
                </h1>
                {startup.is_featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Award className="mr-1 h-3 w-3" />
                    Top Choice
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-lg text-muted-foreground">{startup.category}</p>
            </div>
          </div>

          {startup.website && (
            <Button asChild size="lg">
              <a href={startup.website} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
              </a>
            </Button>
          )}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {startup.description}
            </p>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Startup Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Founders</p>
                  <p className="text-muted-foreground">
                    {Array.isArray(startup.founders) ? startup.founders.join(", ") : startup.founders}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Founded</p>
                  <p className="text-muted-foreground">{startup.founded_year || 'Information not available'}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
