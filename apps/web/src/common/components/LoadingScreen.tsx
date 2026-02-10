import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div
      aria-busy="true"
      className="min-h-screen w-full flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};
