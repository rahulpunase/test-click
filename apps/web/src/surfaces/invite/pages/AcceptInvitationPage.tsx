import { useParams, useNavigate } from "react-router";
import { useGetInvitationByToken } from "@repo/backend/invitations/queries";
import { useAcceptInvitation } from "@repo/backend/invitations/mutations";
import { Button, Card, Skeleton } from "@repo/ui";
import { Building2, CheckCircle, XCircle, Clock } from "lucide-react";

export const AcceptInvitationPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const {
    data: invitation,
    isPending,
    error,
  } = useGetInvitationByToken(token || "");
  const { mutate: acceptInvitation, isPending: isAccepting } =
    useAcceptInvitation();

  const handleAccept = () => {
    if (!token) return;

    acceptInvitation(
      { token },
      {
        onSuccess: (result) => {
          navigate(`/${result.workspaceId}`);
        },
        onError: (err) => {
          console.error("Failed to accept invitation:", err);
        },
      },
    );
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-10 w-32 mt-4" />
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !invitation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 rounded-full bg-error-light">
              <XCircle className="h-8 w-8 text-error" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Invitation Not Found
            </h1>
            <p className="text-text-muted">
              This invitation link is invalid or has been removed.
            </p>
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              Go to Sign In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Expired state
  if (invitation.status === "expired") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 rounded-full bg-warning/10">
              <Clock className="h-8 w-8 text-warning" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Invitation Expired
            </h1>
            <p className="text-text-muted">
              This invitation to join{" "}
              <strong>{invitation.workspace.name}</strong> has expired. Please
              ask the workspace admin for a new invitation.
            </p>
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              Go to Sign In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Cancelled state
  if (invitation.status === "cancelled") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 rounded-full bg-error-light">
              <XCircle className="h-8 w-8 text-error" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Invitation Cancelled
            </h1>
            <p className="text-text-muted">
              This invitation to join{" "}
              <strong>{invitation.workspace.name}</strong> has been cancelled.
            </p>
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              Go to Sign In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Already accepted state
  if (invitation.status === "accepted") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Already Accepted
            </h1>
            <p className="text-text-muted">
              This invitation has already been accepted.
            </p>
            <Button onClick={() => navigate(`/${invitation.workspaceId}`)}>
              Go to Workspace
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Pending - show accept UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Building2 className="h-10 w-10 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">
              You're Invited!
            </h1>
            <p className="text-text-muted">You've been invited to join</p>
            <p className="text-xl font-semibold text-text-primary">
              {invitation.workspace.name}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full mt-4">
            <Button
              onClick={handleAccept}
              disabled={isAccepting}
              className="w-full"
            >
              {isAccepting ? "Joining..." : "Accept Invitation"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/onboarding/get-started")}
              className="w-full"
            >
              Decline
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
