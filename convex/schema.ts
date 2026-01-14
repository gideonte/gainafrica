import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  events: defineTable({
    year: v.number(),
    theme: v.string(),
    description: v.string(),
    location: v.string(),
    country: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    heroImage: v.optional(v.string()),
    isActive: v.boolean(),
    registrationOpen: v.boolean(),
  }).index("by_year", ["year"]),

  presenters: defineTable({
    eventId: v.id("events"),
    name: v.string(),
    title: v.string(),
    organization: v.string(),
    bio: v.string(),
    photo: v.optional(v.string()),
    country: v.string(),
  }).index("by_event", ["eventId"]),

  presentations: defineTable({
    eventId: v.id("events"),
    presenterId: v.id("presenters"),
    title: v.string(),
    description: v.string(),
    videoUrl: v.optional(v.string()),
    slidesUrl: v.optional(v.string()),
    duration: v.optional(v.string()),
  }).index("by_event", ["eventId"]),

  resources: defineTable({
    eventId: v.id("events"),
    title: v.string(),
    description: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    fileSize: v.optional(v.string()),
    category: v.string(),
  }).index("by_event", ["eventId"]),

  registrations: defineTable({
    eventId: v.id("events"),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.string(),
    country: v.string(),
    role: v.string(),
    dietaryRequirements: v.optional(v.string()),
    registeredAt: v.string(),
    status: v.string(),
  })
    .index("by_event", ["eventId"])
    .index("by_email", ["email"]),
})
