import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import React from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const convex = new ConvexReactClient(
    import.meta.env.VITE_CONVEX_URL as string,
    {
      verbose: true,
    },
  );

  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
};
