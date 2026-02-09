import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useUpdateMemberProfile = (): UseMutationResult<any, any, any> => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.members.mutations.updateMemberProfile),
  });
  return mutation;
};

export const useRemoveMember = (): UseMutationResult<any, any, any> => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.members.mutations.removeMember),
  });
  return mutation;
};

export const useChangeMemberRole = (): UseMutationResult<any, any, any> => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.members.mutations.changeMemberRole),
  });
  return mutation;
};

export const useSetMemberStatus = (): UseMutationResult<any, any, any> => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.members.mutations.setMemberStatus),
  });
  return mutation;
};

export const useClearMemberStatus = (): UseMutationResult<any, any, any> => {
  const mutation = useMutation({
    mutationFn: useConvexMutation(api.members.mutations.clearMemberStatus),
  });
  return mutation;
};
