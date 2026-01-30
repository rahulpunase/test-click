import { mutation } from "../_generated/server";
import { v } from "convex/values";
import * as service from "./service";

/**
 * Create a new sample record
 */
export const create = mutation({
  args: {
    name: v.string(),
    dob: v.string(),
    gender: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate the data
    const validation = service.validateSampleData(args);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    // Format and insert the data
    const formattedData = service.formatSampleData(args);
    const id = await ctx.db.insert("sample", formattedData);

    return id;
  },
});

/**
 * Update an existing sample record
 */
export const update = mutation({
  args: {
    id: v.id("sample"),
    name: v.optional(v.string()),
    dob: v.optional(v.string()),
    gender: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // Get the existing record
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Sample record not found");
    }

    // Merge with existing data for validation
    const updatedData = {
      name: updates.name ?? existing.name,
      dob: updates.dob ?? existing.dob,
      gender: updates.gender ?? existing.gender,
    };

    // Validate the merged data
    const validation = service.validateSampleData(updatedData);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    // Format and update
    const formattedData = service.formatSampleData(updatedData);
    await ctx.db.patch(id, formattedData);

    return id;
  },
});

/**
 * Delete a sample record
 */
export const remove = mutation({
  args: {
    id: v.id("sample"),
  },
  handler: async (ctx, args) => {
    // Check if the record exists
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Sample record not found");
    }

    await ctx.db.delete(args.id);

    return { success: true, id: args.id };
  },
});

/**
 * Batch create multiple sample records
 */
export const batchCreate = mutation({
  args: {
    samples: v.array(
      v.object({
        name: v.string(),
        dob: v.string(),
        gender: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const ids = [];

    for (const sample of args.samples) {
      // Validate each record
      const validation = service.validateSampleData(sample);
      if (!validation.valid) {
        throw new Error(
          `Validation failed for ${sample.name}: ${validation.errors.join(", ")}`,
        );
      }

      // Format and insert
      const formattedData = service.formatSampleData(sample);
      const id = await ctx.db.insert("sample", formattedData);
      ids.push(id);
    }

    return ids;
  },
});
