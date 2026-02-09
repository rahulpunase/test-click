import { useState, useMemo } from "react";
import { Button, Input, Dropdown } from "@repo/ui";
import {
  useGetWorkspaceMembers,
  useGetMemberWithProfile,
} from "@repo/backend/members/queries";
import {
  useRemoveMember,
  useChangeMemberRole,
} from "@repo/backend/members/mutations";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Trash2,
  ShieldCheck,
  UserMinus,
  UserCheck,
  Copy,
} from "lucide-react";
import { InviteDialog } from "../components/InviteDialog";
import { Presense } from "@/common/components/presence/Presense";

export const PeoplePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const { workSpace } = useGlobalData();

  const { data: members, isPending } = useGetWorkspaceMembers(
    workSpace?._id ?? ("" as never),
  );

  const { data: currentMember } = useGetMemberWithProfile(
    workSpace?._id ?? ("" as never),
  );

  const { mutate: removeMember, isPending: isRemoving } = useRemoveMember();
  const { mutate: changeMemberRole, isPending: isChangingRole } =
    useChangeMemberRole();

  const canManageMembers =
    currentMember?.member?.role === "creator" ||
    currentMember?.member?.role === "admin";

  const filteredMembers = useMemo(() => {
    if (!members) return [];
    if (!searchQuery.trim()) return members;

    const query = searchQuery.toLowerCase();
    return members.filter((item) => {
      const name = item.profile?.name || item.user?.name || "";
      const email = item.user?.email || "";
      return (
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query)
      );
    });
  }, [members, searchQuery]);

  const handleRemoveMember = (memberId: string) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      removeMember({ memberId: memberId as never });
    }
  };

  const handleSetAsAdmin = (memberId: string) => {
    changeMemberRole({ memberId: memberId as never, newRole: "admin" });
  };

  const handleConvertToGuest = (memberId: string) => {
    changeMemberRole({ memberId: memberId as never, newRole: "guest" });
  };

  const handleConvertToMember = (memberId: string) => {
    changeMemberRole({ memberId: memberId as never, newRole: "member" });
  };

  const handleCopyMemberId = async (memberId: string) => {
    await navigator.clipboard.writeText(memberId);
  };

  const canModifyMember = (memberRole: string, memberId: string) => {
    // Cannot modify creator or self
    if (memberRole === "creator") return false;
    if (memberId === currentMember?.member?._id) return false;
    return canManageMembers;
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-text-primary">Manage people</h1>
        <p className="text-text-muted">
          View and manage workspace members and their roles.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
        {canManageMembers && (
          <Button onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="w-4 h-4" />
            Invite
          </Button>
        )}
      </div>

      {workSpace && (
        <InviteDialog
          workspaceId={workSpace._id}
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
        />
      )}

      {isPending ? (
        <div className="text-text-muted">Loading members...</div>
      ) : (
        <div className="border border-border-2 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background-muted">
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted">
                  Role
                </th>
                {canManageMembers && (
                  <th className="text-right px-4 py-3 text-sm font-medium text-text-muted">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={canManageMembers ? 4 : 3}
                    className="px-4 py-8 text-center text-text-muted"
                  >
                    {searchQuery
                      ? "No members found matching your search."
                      : "No members in this workspace."}
                  </td>
                </tr>
              ) : (
                filteredMembers.map((item) => (
                  <tr
                    key={item.member._id}
                    className="border-t border-border-1 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full relative border border-primary flex items-center justify-center text-primary text-sm font-medium">
                          {(item.profile?.name ||
                            item.user?.name ||
                            "?")[0]?.toUpperCase()}
                          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500">
                            <Presense memberId={item.member._id} />
                          </div>
                        </div>
                        <span className="text-text-primary font-medium text-sm">
                          {item.profile?.name || item.user?.name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-muted text-sm">
                      {item.user?.email || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background-muted text-text-muted capitalize">
                        {item.member.role}
                      </span>
                    </td>
                    {canManageMembers && (
                      <td className="px-4 py-3 text-right">
                        <Dropdown>
                          <Dropdown.Trigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </Dropdown.Trigger>
                          <Dropdown.Content align="end">
                            {canModifyMember(
                              item.member.role,
                              item.member._id,
                            ) &&
                              item.member.role !== "admin" && (
                                <Dropdown.Item
                                  onClick={() =>
                                    handleSetAsAdmin(item.member._id)
                                  }
                                  disabled={isChangingRole}
                                >
                                  <ShieldCheck className="w-4 h-4" />
                                  Set as admin
                                </Dropdown.Item>
                              )}
                            {canModifyMember(
                              item.member.role,
                              item.member._id,
                            ) &&
                              item.member.role !== "guest" && (
                                <Dropdown.Item
                                  onClick={() =>
                                    handleConvertToGuest(item.member._id)
                                  }
                                  disabled={isChangingRole}
                                >
                                  <UserMinus className="w-4 h-4" />
                                  Convert to guest
                                </Dropdown.Item>
                              )}
                            {canModifyMember(
                              item.member.role,
                              item.member._id,
                            ) &&
                              item.member.role === "guest" && (
                                <Dropdown.Item
                                  onClick={() =>
                                    handleConvertToMember(item.member._id)
                                  }
                                  disabled={isChangingRole}
                                >
                                  <UserCheck className="w-4 h-4" />
                                  Convert to member
                                </Dropdown.Item>
                              )}
                            <Dropdown.Item
                              onClick={() =>
                                handleCopyMemberId(item.member._id)
                              }
                            >
                              <Copy className="w-4 h-4" />
                              Copy member ID
                            </Dropdown.Item>
                            {canModifyMember(
                              item.member.role,
                              item.member._id,
                            ) && (
                              <Dropdown.Item
                                onClick={() =>
                                  handleRemoveMember(item.member._id)
                                }
                                disabled={isRemoving}
                              >
                                <Trash2 className="w-4 h-4 text-error" />
                                <span className="text-error">
                                  Remove member
                                </span>
                              </Dropdown.Item>
                            )}
                          </Dropdown.Content>
                        </Dropdown>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
