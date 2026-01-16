import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { EventsGrid } from "@/components/events-grid";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Past & Upcoming Events
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our annual gatherings across Africa, bringing together
                media professionals to share knowledge and build partnerships.
              </p>
            </div>

            <EventsGrid />
          </div>
        </section>

        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  About GAiN Africa
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Global Adventist Internet Network (GAiN) Africa is an annual
                  conference that brings together media and communications
                  professionals from across the African continent. Our mission
                  is to equip, connect, and inspire those using media to advance
                  the gospel.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      1
                    </span>
                    <span className="text-muted-foreground">
                      Network with media professionals across Africa
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      2
                    </span>
                    <span className="text-muted-foreground">
                      Learn from expert presenters and workshops
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      3
                    </span>
                    <span className="text-muted-foreground">
                      Access resources and presentations year-round
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/african-conference-networking-professional-gatheri.jpg"
                  alt="GAiN Africa Conference"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
