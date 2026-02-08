import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import type { Id } from "@repo/backend/types";

type Props = {
  memberId?: Id<"members">;
};

type PresenceInternal = {
  memberId: Id<"members">;
};

type PresenceStatusCircleProps = {
  isOnline: boolean;
};

const PresenceStatusCircle = ({ isOnline }: PresenceStatusCircleProps) => {
  return (
    <div
      className={`w-2 h-2 rounded-full ${isOnline ? "bg-success" : "bg-gray"}`}
    />
  );
};

const PresenceInternal = ({ memberId }: PresenceInternal) => {
  const { presenceState } = useGlobalData();

  console.log({ presenceState });

  const userPresence = presenceState?.find(
    (presence) => presence.userId === memberId,
  );
  return <PresenceStatusCircle isOnline={userPresence?.online || false} />;
};

/**
 * Displays the online presence status of a member.
 *
 * @param props - The component props.
 * @param props.memberId - The ID of the member to check presence for.
 * @returns The presence status indicator or null if no memberId is provided.
 */

export const Presense = ({ memberId }: Props) => {
  if (!memberId) {
    return null;
  }

  return <PresenceInternal memberId={memberId} />;
};
