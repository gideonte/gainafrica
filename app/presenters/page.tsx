"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PresentersGrid } from "@/components/presenters-grid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function PresentersPage() {
  const events = useQuery(api.events.getAll)
  const [selectedYear, setSelectedYear] = useState<string>("")

  const selectedEvent = events?.find((e) => e.year.toString() === selectedYear)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 pt-20">
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Presenters</h1>
            <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl">
              Meet the experts and thought leaders who have shared their knowledge at GAiN Africa conferences over the
              years.
            </p>
          </div>
        </section>

        <section className="py-8 border-b bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Filter by year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {events?.map((event) => (
                    <SelectItem key={event._id} value={event.year.toString()}>
                      {event.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {selectedEvent ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Presenters from GAiN Africa {selectedEvent.year}</h2>
                <PresentersGrid eventId={selectedEvent._id} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Please select a year to view presenters.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
