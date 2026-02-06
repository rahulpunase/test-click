import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, Form, Button, Input, TextArea } from "@repo/ui";
import { useCreateSpaceStore } from "./store";
import { Switch } from "@repo/ui";
import { useCreateSpace } from "@repo/backend/spaces/mutations";
import { useGlobalData } from "../../providers/globalDataProvider/globalDataProvider";
import { IconSelector } from "@/common/components/icon-selector/IconSelector";
import { useGetDynamicIcon } from "../icon-selector/useGetDynamicIcon";
import { IconSelectorTrigger } from "../icon-selector/IconSelectorTrigger";

const formSchema = z.object({
  name: z.string().min(1, "Space name is required"),
  icon: z.string().optional(),
  description: z.string().optional(),
  isPrivate: z.boolean(),
  permission: z.enum(["full_edit", "comment_only", "view_only"]),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateSpaceDialog = () => {
  const { isOpen, onClose } = useCreateSpaceStore();
  const { workSpace } = useGlobalData();
  const { mutate, isPending } = useCreateSpace();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
      permission: "full_edit",
    },
  });

  const Icon = useGetDynamicIcon(form.watch("icon") ?? "");

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        workspaceId: workSpace._id,
        name: values.name,
        isPrivate: values.isPrivate,
        // Description is not currently supported by the backend mutation
      },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Create a Space</Dialog.Title>
          <Dialog.Description>
            A Space represents teams, departments, or groups, each with its own
            Lists, workflows, and settings.
          </Dialog.Description>
        </Dialog.Header>
        <div className="px-4">
          <Form {...form}>
            <Form.Base
              onSubmit={form.handleSubmit(onSubmit)}
              id="create-space-form"
            >
              <div className="space-y-4">
                {/* Icon & Name Section */}
                <div className="flex flex-row gap-2">
                  <div className="flex items-end">
                    <IconSelector
                      value={form.watch("icon") ?? ""}
                      onChange={(value) => {
                        form.setValue("icon", value);
                      }}
                    >
                      <IconSelectorTrigger
                        iconName={form.watch("icon") ?? ""}
                        letter={"S"}
                      />
                    </IconSelector>
                  </div>
                  <div className="space-y-2 flex-1">
                    <Form.Controller.Label>Name</Form.Controller.Label>
                    <div className="flex gap-3">
                      <Form.Controller
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <Form.Item className="w-full space-y-0">
                            <Form.Controller.Field>
                              <Input
                                placeholder="e.g. Marketing, Engineering, HR"
                                {...field}
                              />
                            </Form.Controller.Field>
                            <Form.Controller.Message />
                          </Form.Item>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <Form.Controller
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Controller.Label>
                        Description{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </Form.Controller.Label>
                      <Form.Controller.Field>
                        <TextArea {...field} />
                      </Form.Controller.Field>
                      <Form.Controller.Message />
                    </Form.Item>
                  )}
                />

                {/* Default Permission & Make Private Section */}
                <div className="space-y-4 pt-2">
                  {/* Default Permission */}

                  {/* Make Private Toggle */}
                  <Form.Controller
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                      <Form.Item className="flex flex-row items-center justify-between space-y-0 rounded-lg p-0">
                        <Form.Controller.Field>
                          <div>
                            <Switch
                              size="sm"
                              label="Make Private"
                              description="Only you and invited members have access to this space"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </div>
                        </Form.Controller.Field>
                      </Form.Item>
                    )}
                  />
                </div>
              </div>
            </Form.Base>
          </Form>
        </div>
        <Dialog.Footer>
          <Button variant="ghost" type="button" color="tertiary">
            Use Templates
          </Button>
          <Button
            type="submit"
            form="create-space-form"
            loading={isPending}
            disabled={isPending}
          >
            Continue
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
