import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Input } from "@repo/ui";
import { Chrome, User } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppAuthActions } from "@/common/hooks/authHooks/useAppAuthActions";
import { useState } from "react";
import { Link } from "react-router";
import { ConvexError } from "@repo/backend";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type SignInFormValues = z.infer<typeof schema>;

export const SignInPage = () => {
  const { signInWithGoogle, signInWithPassword } = useAppAuthActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPassword(data.email, data.password);
    } catch (error) {
      const errorMessage =
        // Check whether the error is an application error
        error instanceof ConvexError
          ? // Access data and cast it to the type we expect
            (error.data as { message: string }).message
          : // Must be some developer error,
            // and prod deployments will not
            // reveal any more information about it
            // to the client
            "Unexpected error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleClick = () => {
    signInWithGoogle();
  };

  return (
    <AuthLayout>
      <Button
        variant="outlined"
        color="tertiary"
        className="w-full max-w-md bg-white/50 backdrop-blur-sm"
        onClick={onGoogleClick}
        disabled={loading}
      >
        <Chrome className="w-4 h-4 mr-2" />
        Continue with Google
      </Button>

      <Card className="w-full max-w-md">
        <Card.Header title="Login" className="text-center" icon={<User />} />
        <Card.Content>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              autoComplete="on"
              name="signin"
            >
              <Form.Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Form.Controller.Item>
                    <Form.Controller.Label>Email</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                        autoComplete="email"
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
                        autoComplete="password"
                      />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Controller.Item>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-2"
                size="lg"
                loading={loading}
              >
                Sign In
              </Button>
              <div className="text-center text-sm mt-2">
                <Link to="/signup" className="hover:underline">
                  Create account to get started?
                </Link>
              </div>
            </form>
          </Form>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
};
