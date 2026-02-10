import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BackendProvider } from "@repo/backend";
import { Toaster, toast } from "@repo/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BackendProvider
      onQueryError={(error) => {
        // For queries, we might not want to show a toast for every failure as it can be spammy
        // but for now let's show it to debug
        console.error("Query failed:", error);
        toast.error("Failed to load data", error.message);
      }}
      onMutationError={(error) => {
        console.error("Mutation failed:", error);
        toast.error("Operation failed", error.message);
      }}
    >
      <App />
      <Toaster />
    </BackendProvider>
  </StrictMode>,
);
