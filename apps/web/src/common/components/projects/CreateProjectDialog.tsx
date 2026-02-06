import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, Form, Button, Input } from "@repo/ui";
import { useCreateProjectStore } from "./store";
import { useCreateProject } from "@repo/backend/projects/mutations";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateProjectDialog = () => {
  const {
    isOpen,
    close: closeProjectDialog,
    spaceId,
  } = useCreateProjectStore();
  const { mutate, isPending } = useCreateProject();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!spaceId) return;

    mutate(
      {
        spaceId,
        name: values.name,
      },
      {
        onSuccess: () => {
          closeProjectDialog();
          form.reset();
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeProjectDialog();
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Create a Project</Dialog.Title>
          <Dialog.Description>
            Projects help you organize tasks and lists within your Space.
          </Dialog.Description>
        </Dialog.Header>
        <div className="px-4">
          <Form {...form}>
            <Form.Base
              onSubmit={form.handleSubmit(onSubmit)}
              id="create-project-form"
            >
              <div className="space-y-4">
                <Form.Controller
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Controller.Label>Name</Form.Controller.Label>
                      <Form.Controller.Field>
                        <Input placeholder="e.g. Website Launch" {...field} />
                      </Form.Controller.Field>
                      <Form.Controller.Message />
                    </Form.Item>
                  )}
                />
              </div>
            </Form.Base>
          </Form>
        </div>
        <Dialog.Footer>
          <Button
            type="submit"
            form="create-project-form"
            loading={isPending}
            disabled={isPending}
          >
            Create Project
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
