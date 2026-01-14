import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EventsGrid } from "@/components/events-grid"

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 pt-20">
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">All Events</h1>
            <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl">
              Browse through our annual conferences. Each year brings a unique theme, new presenters, and different
              locations across Africa.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <EventsGrid />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
