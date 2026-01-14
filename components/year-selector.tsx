"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"

export function YearSelector() {
  const events = useQuery(api.events.getAll)
  const params = useParams()
  const currentYear = params.year ? Number(params.year) : null

  if (!events) return null

  const years = [...new Set(events.map((e) => e.year))].sort((a, b) => b - a)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {years.map((year) => (
        <Link
          key={year}
          href={`/events/${year}`}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            currentYear === year
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
        >
          {year}
        </Link>
      ))}
    </div>
  )
}
