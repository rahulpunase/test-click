import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useFetchUserMemberships = () => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.organizations.queries.fetchUserMemberships, {}),
  );

  return { data, isPending, error };
};
