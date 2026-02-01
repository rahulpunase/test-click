import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "@repo/ui"; // textarea is not in imports, checking if it exists or use Input for now or standard textarea
import { ArrowLeft, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Simple validation for list of emails
const formSchema = z.object({
  emails: z.string().optional(),
});

interface InviteUsersStepProps {
  onFinish: () => void;
  onBack: () => void;
}

export const InviteUsersStep = ({ onFinish, onBack }: InviteUsersStepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: "",
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    onFinish();
  }

  return (
    <Form {...form}>
      <Form.Base
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 py-4"
      >
        <Form.Controller
          control={form.control}
          name="emails"
          render={({ field }) => (
            <Form.Controller.Item>
              <Form.Controller.Label>Invite Team Members</Form.Controller.Label>
              <Form.Controller.Field>
                <div className="space-y-2">
                  <Input
                    placeholder="colleague@example.com"
                    {...field}
                    className="w-full"
                  />
                </div>
              </Form.Controller.Field>
              <Form.Controller.Description>
                Separate multiple emails with commas.
              </Form.Controller.Description>
              <Form.Controller.Message />
            </Form.Controller.Item>
          )}
        />
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={() => onFinish()}>
              Skip
            </Button>
            <Button type="submit" className="gap-2">
              Done <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Form.Base>
    </Form>
  );
};
