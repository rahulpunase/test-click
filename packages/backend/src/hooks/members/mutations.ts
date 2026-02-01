import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useUpdateMemberProfile = (): UseMutationResult<any, any, any> => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.members.mutations.updateMemberProfile),
  });
  return mutation;
};
