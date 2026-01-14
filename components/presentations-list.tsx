"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Id } from "@/convex/_generated/dataModel"
import { Clock, FileText, PlayCircle } from "lucide-react"

interface PresentationsListProps {
  eventId: Id<"events">
}

export function PresentationsList({ eventId }: PresentationsListProps) {
  const presentations = useQuery(api.presentations.getByEvent, { eventId })
  const presenters = useQuery(api.presenters.getByEvent, { eventId })

  if (!presentations || !presenters) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-3/4 bg-muted rounded" />
              <div className="h-4 w-1/2 bg-muted rounded mt-2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (presentations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No presentations available for this event yet.</p>
      </div>
    )
  }

  const getPresenter = (presenterId: Id<"presenters">) => presenters.find((p) => p._id === presenterId)

  return (
    <div className="space-y-4">
      {presentations.map((presentation) => {
        const presenter = getPresenter(presentation.presenterId)
        return (
          <Card key={presentation._id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl">{presentation.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {presenter && <span className="font-medium text-foreground">{presenter.name}</span>}{" "}
                    {presenter && `• ${presenter.organization}`}
                  </CardDescription>
                </div>
                {presentation.duration && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{presentation.duration}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{presentation.description}</p>
              <div className="flex flex-wrap gap-2">
                {presentation.videoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={presentation.videoUrl} target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Watch Video
                    </a>
                  </Button>
                )}
                {presentation.slidesUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={presentation.slidesUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      View Slides
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
