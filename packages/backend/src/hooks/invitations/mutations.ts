import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

/**
 * Hook to create a new invitation for a workspace.
 */
export const useCreateInvitation = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.invitations.mutations.createInvitation),
  });
  return { mutate, isPending, error };
};

/**
 * Hook to cancel an existing invitation.
 */
export const useCancelInvitation = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.invitations.mutations.cancelInvitation),
  });
  return { mutate, isPending, error };
};

/**
 * Hook to resend an invitation (resets expiration).
 */
export const useResendInvitation = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.invitations.mutations.resendInvitation),
  });
  return { mutate, isPending, error };
};

/**
 * Hook to accept an invitation.
 */
export const useAcceptInvitation = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.invitations.mutations.acceptInvitation),
  });
  return { mutate, isPending, error };
};
