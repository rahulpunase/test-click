import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, Form, Button, Input, Switch } from "@repo/ui";
import { useCreateFolderStore } from "./store";
import { useCreateFolder } from "@repo/backend/folders/mutations";
import { IconSelector } from "@/common/components/icon-selector/IconSelector";
import { IconSelectorTrigger } from "../icon-selector/IconSelectorTrigger";

const formSchema = z.object({
  name: z.string().min(1, "Folder name is required"),
  icon: z.string().optional(),
  color: z.string().optional(),
  isPrivate: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateFolderDialog = () => {
  const { isOpen, close, spaceId, parentId } = useCreateFolderStore();
  const { mutate, isPending } = useCreateFolder();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "",
      isPrivate: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!spaceId) return;

    mutate(
      {
        spaceId,
        parentId: parentId ?? undefined,
        name: values.name,
        icon: values.icon || undefined,
        color: values.color || undefined,
        isPrivate: values.isPrivate,
      },
      {
        onSuccess: () => {
          close();
          form.reset();
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Create a Folder</Dialog.Title>
          <Dialog.Description>
            Folders help you organize your lists and documents within a space.
          </Dialog.Description>
        </Dialog.Header>
        <div className="px-4">
          <Form {...form}>
            <Form.Base
              onSubmit={form.handleSubmit(onSubmit)}
              id="create-folder-form"
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
                        letter={"F"}
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
                                placeholder="e.g. Design Assets, Documentation"
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

                {/* Make Private Toggle */}
                <div className="pt-2">
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
                              description="Only you and invited members can see this folder"
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
          <Button
            variant="ghost"
            type="button"
            color="tertiary"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-folder-form"
            loading={isPending}
            disabled={isPending}
          >
            Create Folder
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
