import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Input } from "@repo/ui";
import { Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthActions } from "@repo/backend";

const schema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  workEmail: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type SignUpFormValues = z.infer<typeof schema>;

export const SignUpPage = () => {
  const { signIn } = useAuthActions();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log("Register data:", data);
    // signIn("google", {
    //   email: data.workEmail,
    //   password: data.password,
    // });
    // TODO: Implement actual register logic
  };

  const onGoogleClick = () => {
    signIn("google");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 gap-4">
      <Button
        variant="outlined"
        color="tertiary"
        className="w-full max-w-md bg-white/50 backdrop-blur-sm"
        onClick={onGoogleClick}
      >
        <Chrome className="w-4 h-4 mr-2" />
        Continue with Google
      </Button>

      <Card className="w-full max-w-md">
        <Card.Header title="Register" className="text-center" />
        <Card.Content>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Form.Controller
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <Form.Controller.Item>
                    <Form.Controller.Label>Full Name</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input placeholder="John Doe" {...field} />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Controller.Item>
                )}
              />

              <Form.Controller
                control={form.control}
                name="workEmail"
                render={({ field }) => (
                  <Form.Controller.Item>
                    <Form.Controller.Label>Work Email</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="name@company.com"
                        type="email"
                        {...field}
                      />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Controller.Item>
                )}
              />

              <Form.Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Form.Controller.Item>
                    <Form.Controller.Label>Password</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Controller.Item>
                )}
              />

              <Button type="submit" className="w-full mt-2" size="lg">
                Sign Up
              </Button>
            </form>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
};
