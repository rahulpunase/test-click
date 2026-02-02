import usePresence from "@convex-dev/presence/react";
import { api } from "../../../convex/_generated/api";

export const useUserPresence = (chatRoomId: string, userId: string) => {
  const presenceState = usePresence(api.presence, chatRoomId, userId);
  return presenceState;
};
