import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useAddFavourite = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.favourites.mutations.addFavourite),
  });
  return { mutate, isPending, error };
};

export const useRemoveFavourite = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.favourites.mutations.removeFavourite),
  });
  return { mutate, isPending, error };
};
