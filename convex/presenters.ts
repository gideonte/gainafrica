import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("presenters")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();
  },
});

export const create = mutation({
  args: {
    eventId: v.id("events"),
    name: v.string(),
    title: v.string(),
    organization: v.string(),
    bio: v.string(),
    photo: v.optional(v.string()),
    country: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("presenters", args);
  },
});

export const remove = mutation({
  args: { id: v.id("presenters") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("presenters").collect();
  },
});
