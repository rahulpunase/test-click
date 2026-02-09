import { Dropdown, Avatar, Skeleton, Separator } from "@repo/ui";
import {
  useGetMemberWithProfile,
  useGetMemberStatus,
} from "@repo/backend/members/queries";
import type { Id } from "@repo/backend/types";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import { ChevronDownIcon, LogOutIcon, SmilePlusIcon } from "lucide-react";
import { useAppAuthActions } from "@/common/hooks/authHooks/useAppAuthActions";
import { Presense } from "../presence/Presense";
import { SetStatusDialog } from "./SetStatusDialog";
import { useSetStatusDialogStore } from "./store";

// Status display mapping
const STATUS_DISPLAY: Record<string, { label: string; emoji: string }> = {
  in_meeting: { label: "In a meeting", emoji: "📅" },
  focus: { label: "Focus", emoji: "🎯" },
  sick: { label: "Sick", emoji: "🤒" },
  vacation: { label: "Vacation", emoji: "🏝️" },
  custom: { label: "Custom", emoji: "💬" },
};

export const ProfileDropdown = () => {
  const { workSpace } = useGlobalData();
  const { data: memberInfo, isPending } = useGetMemberWithProfile(
    (workSpace._id as Id<"workspaces">) ?? undefined,
  );
  const { data: memberStatus } = useGetMemberStatus();
  const { onOpen: openStatusDialog, isOpen } = useSetStatusDialogStore();

  const { signOut } = useAppAuthActions();

  if (isPending || !memberInfo) {
    // Show a skeleton or loading state trigger
    return <Skeleton className="h-6 w-6" circle />;
  }

  const userInitial = memberInfo.profile.name?.charAt(0) || "?";

  const handleLogout = () => {
    signOut();
  };

  const handleSetStatus = () => {
    openStatusDialog();
  };

  // Get current status display info
  const getStatusDisplay = () => {
    if (!memberStatus) return null;

    if (memberStatus.status === "custom") {
      // For custom status, use the stored emoji and customText
      return {
        emoji: memberStatus.emoji || "💬",
        label: memberStatus.customText || "Custom status",
      };
    }

    // For predefined statuses, use the STATUS_DISPLAY mapping
    // but prefer the stored emoji if available
    const predefined = STATUS_DISPLAY[memberStatus.status];
    return {
      emoji: memberStatus.emoji || predefined?.emoji || "💬",
      label: predefined?.label || memberStatus.status,
    };
  };

  const currentStatusDisplay = getStatusDisplay();

  return (
    <>
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
        <Dropdown.Content align="end" className="w-64">
          <Dropdown.Item className="flex items-center gap-2 p-2 focus:bg-transparent">
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
                <span className="text-xs text-text-muted">
                  {currentStatusDisplay
                    ? `${currentStatusDisplay.emoji} ${currentStatusDisplay.label}`
                    : "Online"}
                </span>
              </div>
            </div>
          </Dropdown.Item>
          <Separator className="my-2" />
          <Dropdown.Item
            label={
              currentStatusDisplay
                ? `${currentStatusDisplay.emoji} ${currentStatusDisplay.label}`
                : "Set status"
            }
            icon={<SmilePlusIcon />}
            onClick={handleSetStatus}
          />
          <Separator className="my-2" />
          <Dropdown.Item
            label="Logout"
            icon={<LogOutIcon />}
            onClick={handleLogout}
          />
        </Dropdown.Content>
      </Dropdown>
      {isOpen && <SetStatusDialog />}
    </>
  );
};
