import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const convex = new ConvexReactClient(
    import.meta.env.VITE_CONVEX_URL as string,
  );

  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
};
