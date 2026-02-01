import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "@repo/ui";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useFetchUserMemberships,
  useGetMemberWithProfile,
} from "@repo/backend/members/queries";
import { useUpdateMemberProfile } from "@repo/backend/members/mutations";
import type { Id } from "@repo/backend/types";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
});

interface ConfirmUserStepProps {
  onNext: () => void;
  onBack: () => void;
  workspaceId: Id<"workspaces">;
}

export const ConfirmUserStep = ({
  onNext,
  onBack,
  workspaceId,
}: ConfirmUserStepProps) => {
  const { data: memberships } = useFetchUserMemberships();
  const { mutateAsync: updateProfile, isPending } = useUpdateMemberProfile();
  const { data: memberData } = useGetMemberWithProfile(workspaceId);

  const memberProfile = memberData?.profile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: memberProfile?.name || "",
      displayName: memberProfile?.displayName || "",
    },
  });

  const member = memberships?.find((m) => m.workspaceId === workspaceId);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!member) return;

    try {
      await updateProfile({
        memberId: member._id,
        name: values.fullName,
        displayName: values.displayName,
      });
      onNext();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }

  return (
    <Form {...form}>
      <Form.Base
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 py-4"
      >
        <Form.Controller
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <Form.Controller.Item>
              <Form.Controller.Label>Your Name</Form.Controller.Label>
              <Form.Controller.Field>
                <Input placeholder="John Doe" {...field} />
              </Form.Controller.Field>
              <Form.Controller.Message />
            </Form.Controller.Item>
          )}
        />
        <Form.Controller
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <Form.Controller.Item>
              <Form.Controller.Label>Display Name</Form.Controller.Label>
              <Form.Controller.Field>
                <Input placeholder="John" {...field} />
              </Form.Controller.Field>
              <Form.Controller.Description>
                This is how your name will appear in chat and notifications.
              </Form.Controller.Description>
              <Form.Controller.Message />
            </Form.Controller.Item>
          )}
        />
        <div className="flex justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="gap-2"
            disabled={isPending}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            type="submit"
            className="gap-2"
            loading={isPending || !member}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Next <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Form.Base>
    </Form>
  );
};
