import { Button, Card } from "@repo/ui";

interface EmptyOrganizationStateProps {
  onCreateNew: () => void;
}

export const EmptyOrganizationState = ({
  onCreateNew,
}: EmptyOrganizationStateProps) => {
  return (
    <Card className="w-full">
      <Card.Content className="flex flex-col items-center justify-center py-12 px-4 text-center">
        {/* Placeholder for an empty state illustration if available, otherwise just text */}
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No organisations found
        </h3>
        <p className="text-text-muted mb-6 max-w-sm">
          You are not a member of any organisation yet. Create a new one to get
          started.
        </p>
        <Button variant="text" color="tertiary" onClick={onCreateNew}>
          Create a new organisation
        </Button>
      </Card.Content>
    </Card>
  );
};
