import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";

export const useMemberRole = () => {
  const { member } = useGlobalData();
  const role = member.role;

  const isCreator = role === "creator";
  const isAdmin = role === "admin";
  const isMember = role === "member";
  const isGuest = role === "guest";

  return {
    role,
    // Role checks
    isCreator,
    isAdmin,
    isMember,
    isGuest,

    // Derived permissions
    canManageWorkspace: isCreator || isAdmin,
    canManageMembers: isCreator || isAdmin,
    canCreateSpaces: isCreator || isAdmin || isMember,
    canInviteMembers: isCreator || isAdmin || isMember,
  };
};
