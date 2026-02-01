import { OrganizationCard } from "./OrganizationCard";
import { EmptyOrganizationState } from "./EmptyOrganizationState";
import type { Doc, Id } from "@repo/backend/types";

interface OrganizationListProps {
  memberships: Array<{
    _id: Id<"members">;
    role: "admin" | "member";
    organization: Doc<"organizations">;
    userId: Id<"users">;
  }>;
  onCreateNew: () => void;
}

export const OrganizationList = ({
  memberships,
  onCreateNew,
}: OrganizationListProps) => {
  if (memberships.length === 0) {
    return <EmptyOrganizationState onCreateNew={onCreateNew} />;
  }

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="flex flex-col gap-3">
        {memberships.map((membership) => (
          <OrganizationCard
            key={membership.organization._id}
            organization={membership.organization}
            // We don't have member count in the query yet, passing undefined for now or mock if needed
          />
        ))}
      </div>

      <div className="pt-4 border-t border-border-1 mt-6">
        <button
          onClick={onCreateNew}
          className="text-primary-hover hover:text-primary-active font-medium hover:underline text-sm mb-1"
        >
          Create a new organisation
        </button>
        <p className="text-sm text-text-muted">
          Not seeing your organisation?{" "}
          <button className="text-primary-hover hover:underline">
            Try a different email address
          </button>
        </p>
      </div>
    </div>
  );
};
