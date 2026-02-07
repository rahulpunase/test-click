import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useCreateFolder = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.createFolder),
  });
  return { mutate, isPending, error };
};
