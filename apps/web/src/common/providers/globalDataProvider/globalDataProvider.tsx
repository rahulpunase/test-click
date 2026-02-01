import type { Doc } from "@repo/backend/types";
import { createContext, useContext, type ReactNode } from "react";

interface GlobalData {
  workSpace: Doc<"workspaces">;
}

const GlobalDataContext = createContext<GlobalData | undefined>(undefined);

interface GlobalDataProviderProps {
  children: ReactNode;
  defaultValue: GlobalData;
}

export const GlobalDataProvider = ({
  children,
  defaultValue,
}: GlobalDataProviderProps) => {
  return (
    <GlobalDataContext.Provider value={defaultValue}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (context === undefined) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
};
