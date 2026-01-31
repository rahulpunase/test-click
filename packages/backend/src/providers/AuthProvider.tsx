import { ConvexAuthProvider } from "@convex-dev/auth/react";
import type { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import React from "react";

export const AuthProvider = ({
  children,
  client,
}: {
  children: ReactNode;
  client: ConvexReactClient;
}) => {
  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
};
