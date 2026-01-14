import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const getByEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resources")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect()
  },
})

export const create = mutation({
  args: {
    eventId: v.id("events"),
    title: v.string(),
    description: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    fileSize: v.optional(v.string()),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("resources", args)
  },
})
