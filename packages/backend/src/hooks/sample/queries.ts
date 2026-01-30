import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

/**
 * Hook to get all sample records with live updates
 * @returns TanStack Query result with samples data
 */
export const useGetAllSamples = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.sample.queries.getAll, {}),
  );
  return { data, isPending, error };
};

/**
 * Hook to get a single sample record by ID with live updates
 * @param id - The sample record ID
 * @returns TanStack Query result with sample data
 */
export const useGetSampleById = (id: Id<"sample">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.sample.queries.getById, { id }),
  );
  return { data, isPending, error };
};

/**
 * Hook to get sample records filtered by gender with live updates
 * @param gender - The gender to filter by
 * @returns TanStack Query result with filtered samples
 */
export const useGetSamplesByGender = (gender: string) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.sample.queries.getByGender, { gender }),
  );
  return { data, isPending, error };
};

/**
 * Hook to search sample records by name with live updates
 * @param searchTerm - The search term to match against names
 * @returns TanStack Query result with matching samples
 */
export const useSearchSamplesByName = (searchTerm: string) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.sample.queries.searchByName, { searchTerm }),
  );
  return { data, isPending, error };
};
