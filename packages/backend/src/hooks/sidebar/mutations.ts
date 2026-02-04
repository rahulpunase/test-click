import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useUpdateNavigation = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.sidebar.mutation.updateNavigation),
  });
  return { mutate, isPending, error };
};

export const useUpdateHome = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.sidebar.mutation.updateHome),
  });
  return { mutate, isPending, error };
};

export const useUpdateSections = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.sidebar.mutation.updateSections),
  });
  return { mutate, isPending, error };
};
