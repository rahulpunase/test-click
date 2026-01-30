import { query } from "../_generated/server";
import { v } from "convex/values";
import * as service from "./service";

/**
 * Get all sample records
 */
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await service.getAllSamples(ctx);
  },
});

/**
 * Get a single sample record by ID
 */
export const getById = query({
  args: { id: v.id("sample") },
  handler: async (ctx, args) => {
    return await service.getSampleById(ctx, args.id);
  },
});

/**
 * Get sample records filtered by gender
 */
export const getByGender = query({
  args: { gender: v.string() },
  handler: async (ctx, args) => {
    return await service.getSamplesByGender(ctx, args.gender);
  },
});

/**
 * Search sample records by name (case-insensitive partial match)
 */
export const searchByName = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    return await service.searchSamplesByName(ctx, args.searchTerm);
  },
});
