import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "@repo/ui";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  workspaceName: z.string().min(2, {
    message: "Workspace name must be at least 2 characters.",
  }),
});

interface WorkspaceNameStepProps {
  onNext: () => void;
}

export const WorkspaceNameStep = ({ onNext }: WorkspaceNameStepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    // Ideally update some shared state here
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
