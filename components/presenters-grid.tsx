"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Id } from "@/convex/_generated/dataModel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PresentersGridProps {
  eventId: Id<"events">
}

export function PresentersGrid({ eventId }: PresentersGridProps) {
  const presenters = useQuery(api.presenters.getByEvent, { eventId })

  if (!presenters) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-16 w-16 bg-muted rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-3 w-24 bg-muted rounded" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (presenters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No presenters listed for this event yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {presenters.map((presenter) => (
        <Card key={presenter._id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  presenter.photo || `/placeholder.svg?height=64&width=64&query=professional headshot ${presenter.name}`
                }
                alt={presenter.name}
              />
              <AvatarFallback className="text-lg">
                {presenter.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-lg">{presenter.name}</CardTitle>
              <CardDescription>
                {presenter.title}
                <br />
                {presenter.organization}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-1">{presenter.country}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">{presenter.bio}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
