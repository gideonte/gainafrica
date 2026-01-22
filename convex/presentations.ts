import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("presentations")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();
  },
});

export const create = mutation({
  args: {
    eventId: v.id("events"),
    presenterId: v.id("presenters"),
    title: v.string(),
    description: v.string(),
    videoUrl: v.optional(v.string()),
    slidesUrl: v.optional(v.string()),
    duration: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("presentations", args);
  },
});

export const remove = mutation({
  args: { id: v.id("presentations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("presentations").collect();
  },
});
