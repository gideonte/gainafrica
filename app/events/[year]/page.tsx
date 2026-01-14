"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { YearSelector } from "@/components/year-selector"
import { PresentersGrid } from "@/components/presenters-grid"
import { PresentationsList } from "@/components/presentations-list"
import { ResourcesList } from "@/components/resources-list"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function EventYearPage() {
  const params = useParams()
  const year = Number(params.year)
  const event = useQuery(api.events.getByYear, { year })

  if (event === undefined) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading event...</div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pt-20">
          <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold">Event Not Found</h1>
              <p className="mt-4 text-muted-foreground">No event found for year {year}.</p>
              <Button asChild className="mt-8">
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 pt-20">
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-bold">{event.year}</span>
                  {event.isActive && (
                    <span className="px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full">
                      Current Event
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{event.theme}</h1>
                <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl">{event.description}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-primary-foreground/70">
                    <MapPin className="h-5 w-5" />
                    <span>
                      {event.location}, {event.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-foreground/70">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(event.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {event.registrationOpen && (
                <Button size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link href="/register">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="py-8 border-b bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Browse by year:</span>
              <YearSelector />
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Tabs defaultValue="presenters" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="presenters">Presenters</TabsTrigger>
                <TabsTrigger value="presentations">Presentations</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="presenters">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Presenters</h2>
                  <p className="text-muted-foreground mt-1">
                    Meet the speakers who shared their expertise at GAiN Africa {event.year}
                  </p>
                </div>
                <PresentersGrid eventId={event._id} />
              </TabsContent>

              <TabsContent value="presentations">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Presentations</h2>
                  <p className="text-muted-foreground mt-1">Watch videos and view slides from the sessions</p>
                </div>
                <PresentationsList eventId={event._id} />
              </TabsContent>

              <TabsContent value="resources">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Resources</h2>
                  <p className="text-muted-foreground mt-1">
                    Download materials, documents, and other resources from this event
                  </p>
                </div>
                <ResourcesList eventId={event._id} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
