import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";

export const BackendProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    const tanstackQueryClient = new QueryClient({
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
  }, [convexUrl]);

  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexProvider>
  );
};
