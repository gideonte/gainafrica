import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

export const getByYear = query({
  args: { year: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_year", (q) => q.eq("year", args.year))
      .first();
  },
});

export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    return events.find((e) => e.isActive) || events[0];
  },
});

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("events"),
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
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});
