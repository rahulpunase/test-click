import { useState } from "react";
import { Dialog, Button, Input } from "@repo/ui";
import { useCreateInvitation } from "@repo/backend/invitations/mutations";
import { Copy, Check, Link } from "lucide-react";
import type { Id } from "@repo/backend/types";

type InviteDialogProps = {
  workspaceId: Id<"workspaces">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const InviteDialog = ({
  workspaceId,
  open,
  onOpenChange,
}: InviteDialogProps) => {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { mutate: createInvitation, isPending } = useCreateInvitation();

  const handleCreateInvite = () => {
    createInvitation(
      { workspaceId },
      {
        onSuccess: (result) => {
          const link = `${window.location.origin}/invite/${result.token}`;
          setInviteLink(link);
        },
        onError: (err) => {
          console.error("Failed to create invitation:", err);
        },
      },
    );
  };

  const handleCopy = async () => {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setInviteLink(null);
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <Dialog.Content className="max-w-md">
        <Dialog.Header>
          <Dialog.Title>Invite people</Dialog.Title>
          <Dialog.Description>
            Create an invitation link to invite people to your workspace.
          </Dialog.Description>
        </Dialog.Header>

        <div className="flex flex-col gap-4 py-4">
          {!inviteLink ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Link className="h-8 w-8 text-primary" />
              </div>
              <p className="text-center text-text-muted">
                Generate an invite link that anyone can use to join your
                workspace as a member.
              </p>
              <Button onClick={handleCreateInvite} disabled={isPending}>
                {isPending ? "Creating..." : "Generate Invite Link"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-4">
              <p className="text-sm text-text-muted">
                Share this link with people you want to invite:
              </p>
              <div className="flex gap-2">
                <Input value={inviteLink} readOnly className="flex-1" />
                <Button
                  variant="outlined"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-text-muted">
                This link expires in 7 days.
              </p>
            </div>
          )}
        </div>

        <Dialog.Footer>
          <Button variant="ghost" onClick={handleClose}>
            {inviteLink ? "Done" : "Cancel"}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
