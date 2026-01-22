"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export function HeroSection() {
  const activeEvent = useQuery(api.events.getActive);

  return (
    <section className="relative min-h-screen bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[url('/african-conference-gathering-professional.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">
            Annual Conference
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">
            {activeEvent?.theme || "Empowering Media for Africa's Future"}
          </h1>

          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
            {activeEvent?.description ||
              "Join Adventist media and communications professionals from across Africa for networking, learning, and collaboration at GAiN Africa."}
          </p>

          {activeEvent && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <MapPin className="h-5 w-5" />
                <span>
                  {activeEvent.location}, {activeEvent.country}
                </span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(activeEvent.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(activeEvent.endDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {activeEvent?.registrationOpen && (
              <Button
                size="lg"
                asChild
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link href="/register">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/events">View Past Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
