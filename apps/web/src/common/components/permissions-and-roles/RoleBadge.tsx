import { Badge } from "@repo/ui";
import { CrownIcon, ShieldCheckIcon, UserIcon, UserXIcon } from "lucide-react";

type MemberRole = "creator" | "admin" | "member" | "guest";

// Role icon mapping
const ROLE_ICONS: Record<
  MemberRole,
  React.ReactElement<{ className?: string }>
> = {
  creator: <CrownIcon />,
  admin: <ShieldCheckIcon />,
  member: <UserIcon />,
  guest: <UserXIcon />,
};

// Role display labels (capitalized)
const ROLE_LABELS: Record<MemberRole, string> = {
  creator: "Creator",
  admin: "Admin",
  member: "Member",
  guest: "Guest",
};

export interface RoleBadgeProps {
  /** The member's role */
  role: MemberRole;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * RoleBadge component displays a badge with an icon based on the member's role.
 *
 * @example
 * <RoleBadge role="admin" />
 * <RoleBadge role="guest" />
 */
export const RoleBadge = ({ role, className }: RoleBadgeProps) => {
  return (
    <Badge icon={ROLE_ICONS[role]} className={className}>
      {ROLE_LABELS[role]}
    </Badge>
  );
};
