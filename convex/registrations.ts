import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("registrations")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();
  },
});

export const checkExisting = query({
  args: { email: v.string(), eventId: v.id("events") },
  handler: async (ctx, args) => {
    const registrations = await ctx.db
      .query("registrations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
    return registrations.find((r) => r.eventId === args.eventId);
  },
});

export const create = mutation({
  args: {
    eventId: v.id("events"),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.string(),
    country: v.string(),
    role: v.string(),
    dietaryRequirements: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("registrations", {
      ...args,
      registeredAt: new Date().toISOString(),
      status: "confirmed",
    });
  },
});

export const remove = mutation({
  args: { id: v.id("registrations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("registrations").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("registrations"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
