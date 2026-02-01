import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useCreateTemporaryWorkspace = () => {
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: useConvexMutation(
      api.workspaces.mutations.createTemporaryWorkspace,
    ),
  });
  return { mutate, mutateAsync, isPending, error };
};

export const useUpdateName = () => {
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.workspaces.mutations.updateName),
  });
  return { mutate, mutateAsync, isPending, error };
};
