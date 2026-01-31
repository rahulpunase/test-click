/**
 * Backend package exports
 */

// Provider
export { BackendProvider } from "./providers/BackendProvider";
export { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
export { ConvexError } from "convex/values";

// Hooks are now exported via granular paths (e.g. @repo/backend/sample/queries)
// Do not re-export them here to keep the main bundle light and explicit

// Types (re-export common Convex types if needed by consumers)
// export type { Id } from "../convex/_generated/dataModel";
