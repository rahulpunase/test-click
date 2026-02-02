import { Dropdown, Avatar, Skeleton } from "@repo/ui";
import { useGetMemberWithProfile } from "@repo/backend/members/queries";
import type { Id } from "@repo/backend/types";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { useAppAuthActions } from "@/common/hooks/authHooks/useAppAuthActions";
import { Presense } from "../presence/Presense";
// Local Avatar component removed in favor of @repo/ui Avatar

export const ProfileDropdown = () => {
  const { workSpace } = useGlobalData();
  const { data: memberInfo, isPending } = useGetMemberWithProfile(
    (workSpace._id as Id<"workspaces">) ?? undefined,
  );

  console.log(memberInfo);

  if (isPending || !memberInfo) {
    // Show a skeleton or loading state trigger
    return <Skeleton className="h-6 w-6" circle />;
  }

  const userInitial = memberInfo.profile.name?.charAt(0) || "?";

  const { signOut } = useAppAuthActions();

  const handleLogout = () => {
    signOut();
  };

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <div className="rounded-full p-1 border border-border-2 flex items-center gap-1 hover:bg-background-muted cursor-pointer relative">
          <Avatar
            src={memberInfo.user.image ?? undefined}
            fallback={userInitial}
            size="xxs"
          />
          <div className="absolute top-0 right-[-2px]">
            <Presense memberId={memberInfo?.member._id} />
          </div>
          <div>
            <ChevronDownIcon className="h-4 w-4 text-text-muted" />
          </div>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content align="end" className="w-56">
        <Dropdown.Item className="flex items-center gap-2 p-2 focus:bg-transparent">
          {/* <Avatar src={member.user.image} fallback={userInitial} size="md" /> */}
          <div className="flex gap-2">
            <Avatar
              src={memberInfo.user.image ?? undefined}
              fallback={userInitial}
              size="sm"
            />
            <div className="flex flex-col space-y-0.5">
              <span className="text-sm font-medium leading-none truncate">
                {memberInfo.profile.name ?? "[Add name]"}
              </span>
              <span className="text-xs text-text-muted">Online</span>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          label="Logout"
          icon={<LogOutIcon />}
          onClick={handleLogout}
        />
        {/* Placeholder for other items like Profile settings, Log out etc. */}
      </Dropdown.Content>
    </Dropdown>
  );
};
