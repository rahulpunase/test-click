import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useCreateSpace = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.spaces.mutations.createSpace),
  });
  return { mutate, isPending, error };
};
