import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

/**
 * Hook to fetch the current user's information (nullable)
 * Returns object with identity/user as null if not authenticated
 */
export const useFetchCurrentUser = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.user.queries.fetchCurrentUser, {}),
  );
  return { data, isPending, error };
};

/**
 * Hook to get the current user's information
 * Should be used when authentication is expected
 */
export const useGetCurrentUser = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.user.queries.getCurrentUser, {}),
  );
  return { data, isPending, error };
};
