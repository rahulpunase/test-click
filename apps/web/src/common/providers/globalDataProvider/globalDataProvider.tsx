import type { Doc } from "@repo/backend/types";
import { createContext, useContext, type ReactNode } from "react";
import { useUserPresence } from "@repo/backend/presence/queries";
import type { PresenceState } from "@repo/backend/types";

interface GlobalData {
  workSpace: Doc<"workspaces">;
  user: Doc<"users">;
  member: Doc<"members">;
  memberProfile: Doc<"member_profiles">;
  presenceState?: PresenceState[];
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
  const presenceState = useUserPresence(
    defaultValue.workSpace._id,
    defaultValue.member._id,
  );
  return (
    <GlobalDataContext.Provider value={{ ...defaultValue, presenceState }}>
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
