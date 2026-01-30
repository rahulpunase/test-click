import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

/**
 * Hook to create a new sample record
 * @returns TanStack Mutation result for creating a sample
 */
export const useCreateSample = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.sample.mutations.create),
  });
  return { mutate, isPending, error };
};

/**
 * Hook to update an existing sample record
 * @returns TanStack Mutation result for updating a sample
 */
export const useUpdateSample = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.sample.mutations.update),
  });
  return { mutate, isPending, error };
};

/**
 * Hook to delete a sample record
 * @returns TanStack Mutation result for removing a sample
 */
export const useRemoveSample = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.sample.mutations.remove),
  });
  return { mutate, isPending, error };
};

/**
 * Hook to batch create multiple sample records
 * @returns TanStack Mutation result for batch creating samples
 */
export const useBatchCreateSamples = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.sample.mutations.batchCreate),
  });
  return { mutate, isPending, error };
};
