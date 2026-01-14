"use client"

import type React from "react"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Id } from "@/convex/_generated/dataModel"
import { Download, FileArchive, FileImage, FileText, FileVideo } from "lucide-react"

interface ResourcesListProps {
  eventId: Id<"events">
}

const fileTypeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="h-8 w-8 text-red-500" />,
  doc: <FileText className="h-8 w-8 text-blue-500" />,
  docx: <FileText className="h-8 w-8 text-blue-500" />,
  ppt: <FileText className="h-8 w-8 text-orange-500" />,
  pptx: <FileText className="h-8 w-8 text-orange-500" />,
  zip: <FileArchive className="h-8 w-8 text-yellow-600" />,
  mp4: <FileVideo className="h-8 w-8 text-purple-500" />,
  jpg: <FileImage className="h-8 w-8 text-green-500" />,
  png: <FileImage className="h-8 w-8 text-green-500" />,
}

export function ResourcesList({ eventId }: ResourcesListProps) {
  const resources = useQuery(api.resources.getByEvent, { eventId })

  if (!resources) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-12 w-12 bg-muted rounded" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-1/2 bg-muted rounded" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No resources available for this event yet.</p>
      </div>
    )
  }

  const groupedResources = resources.reduce(
    (acc, resource) => {
      const category = resource.category
      if (!acc[category]) acc[category] = []
      acc[category].push(resource)
      return acc
    },
    {} as Record<string, typeof resources>,
  )

  return (
    <div className="space-y-8">
      {Object.entries(groupedResources).map(([category, categoryResources]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {categoryResources.map((resource) => (
              <Card key={resource._id}>
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="flex-shrink-0">
                    {fileTypeIcons[resource.fileType.toLowerCase()] || (
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">{resource.description}</CardDescription>
                    {resource.fileSize && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {resource.fileType.toUpperCase()} • {resource.fileSize}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href={resource.fileUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
