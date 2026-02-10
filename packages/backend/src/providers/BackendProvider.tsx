import { ConvexReactClient } from "convex/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import React, { useMemo } from "react";
import { AuthProvider } from "./AuthProvider";

/** Callback type for query errors */
export type QueryErrorCallback = (error: Error) => void;

/** Callback type for mutation errors */
export type MutationErrorCallback = (
  error: Error,
  variables: unknown,
  context: unknown,
) => void;

export interface BackendProviderProps {
  children: React.ReactNode;
  /** Called when any query fails */
  onQueryError?: QueryErrorCallback;
  /** Called when any mutation fails */
  onMutationError?: MutationErrorCallback;
}

export const BackendProvider = ({
  children,
  onQueryError,
  onMutationError,
}: BackendProviderProps) => {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;

  if (!convexUrl) {
    throw new Error(
      "Missing VITE_CONVEX_URL environment variable. " +
        "Please create apps/web/.env.local with VITE_CONVEX_URL set to your Convex deployment URL.",
    );
  }

  // Create Convex client and TanStack Query clients
  // Using useMemo to ensure they're only created once per provider instance
  const { convex, queryClient } = useMemo(() => {
    const convexClient = new ConvexReactClient(convexUrl as string);
    const convexQueryClient = new ConvexQueryClient(convexClient);

    // Create caches with global error handlers
    const queryCache = new QueryCache({
      onError: (error) => {
        onQueryError?.(error);
      },
    });

    const mutationCache = new MutationCache({
      onError: (error, variables, context) => {
        onMutationError?.(error, variables, context);
      },
    });

    const tanstackQueryClient = new QueryClient({
      queryCache,
      mutationCache,
      defaultOptions: {
        queries: {
          queryKeyHashFn: convexQueryClient.hashFn(),
          queryFn: convexQueryClient.queryFn(),
        },
      },
    });

    // Connect ConvexQueryClient to TanStack Query
    convexQueryClient.connect(tanstackQueryClient);

    return {
      convex: convexClient,
      queryClient: tanstackQueryClient,
    };
  }, [convexUrl, onQueryError, onMutationError]);

  return (
    <AuthProvider client={convex}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};
