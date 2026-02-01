import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "@repo/ui";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetWorkspaceById } from "@repo/backend/workspaces/queries";

const formSchema = z.object({
  workspaceName: z.string().min(2, {
    message: "Workspace name must be at least 2 characters.",
  }),
});

import { useUpdateName } from "@repo/backend/workspaces/mutations";
import type { Id } from "@repo/backend/types";
import { useEffect } from "react";

interface WorkspaceNameStepProps {
  onNext: () => void;
  workspaceId: Id<"workspaces">;
}

export const WorkspaceNameStep = ({
  onNext,
  workspaceId,
}: WorkspaceNameStepProps) => {
  const { data: workspace } = useGetWorkspaceById(workspaceId);
  const { mutateAsync: updateName } = useUpdateName();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: workspace?.name || "",
    },
  });

  useEffect(() => {
    if (workspace) {
      form.setValue("workspaceName", workspace.name);
    }
  }, [workspace]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (workspaceId) {
      try {
        await updateName({
          workspaceId: workspaceId as Id<"workspaces">,
          name: values.workspaceName,
        });
      } catch (error) {
        console.error("Failed to update workspace name:", error);
        // We could set a form error here
        return;
      }
    }
    onNext();
  }

  return (
    <Form {...form}>
      <Form.Base
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 py-4"
      >
        <Form.Controller
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <Form.Controller.Item>
              <Form.Controller.Label>Workspace Name</Form.Controller.Label>
              <Form.Controller.Field>
                <Input placeholder="Acme Inc." {...field} />
              </Form.Controller.Field>
              <Form.Controller.Description>
                This is the name of your new workspace.
              </Form.Controller.Description>
              <Form.Controller.Message />
            </Form.Controller.Item>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Form.Base>
    </Form>
  );
};
