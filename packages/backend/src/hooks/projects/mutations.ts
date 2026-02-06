import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useCreateProject = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.projects.mutations.createProject),
  });
  return { mutate, isPending, error };
};
