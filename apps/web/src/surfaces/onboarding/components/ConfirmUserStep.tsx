import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "@repo/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface ConfirmUserStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const ConfirmUserStep = ({ onNext, onBack }: ConfirmUserStepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", // Ideally this comes from user profile
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
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
          name="fullName"
          render={({ field }) => (
            <Form.Controller.Item>
              <Form.Controller.Label>Your Name</Form.Controller.Label>
              <Form.Controller.Field>
                <Input placeholder="John Doe" {...field} />
              </Form.Controller.Field>
              <Form.Controller.Description>
                Confirm how you want to appear to your team.
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
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Form.Base>
    </Form>
  );
};
