import { QueryCtx } from "../_generated/server";

/**
 * Service layer for sample-related operations
 * Contains reusable functions that can be used across queries and mutations
 */

/**
 * Get all sample records from the database
 */
export const getAllSamples = async (ctx: QueryCtx) => {
  return await ctx.db.query("sample").collect();
};

/**
 * Get a sample record by ID
 */
export const getSampleById = async (ctx: QueryCtx, id: string) => {
  return await ctx.db.get(id as any);
};

/**
 * Filter sample records by gender
 */
export const getSamplesByGender = async (ctx: QueryCtx, gender: string) => {
  return await ctx.db
    .query("sample")
    .filter((q) => q.eq(q.field("gender"), gender))
    .collect();
};

/**
 * Search samples by name (case-insensitive)
 */
export const searchSamplesByName = async (
  ctx: QueryCtx,
  searchTerm: string,
) => {
  const allSamples = await getAllSamples(ctx);
  return allSamples.filter((sample) =>
    sample.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

/**
 * Validate sample data before insertion/update
 */
export const validateSampleData = (data: {
  name: string;
  dob: string;
  gender: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push("Name is required");
  }

  if (!data.dob || data.dob.trim().length === 0) {
    errors.push("Date of birth is required");
  }

  if (!data.gender || data.gender.trim().length === 0) {
    errors.push("Gender is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Format sample data for display
 */
export const formatSampleData = (sample: {
  name: string;
  dob: string;
  gender: string;
}) => {
  return {
    ...sample,
    name: sample.name.trim(),
    gender: sample.gender.toLowerCase(),
    dob: sample.dob,
  };
};
