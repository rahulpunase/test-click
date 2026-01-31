import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "@repo/backend";
import { Button, Card, Form, Input } from "@repo/ui";
import { Chrome } from "lucide-react";
import { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { useAppAuthActions } from "@/common/hooks/authHooks/useAppAuthActions";

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
  const { signInWithGoogle, signUpWithPassword } = useAppAuthActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setError(null);
    setLoading(true);
    try {
      await signUpWithPassword({
        email: data.workEmail,
        password: data.password,
        fullName: data.fullName,
      });
      navigate("/auth/callback");
    } catch (err) {
      const errorMessage =
        // Check whether the error is an application error
        err instanceof ConvexError
          ? // Access data and cast it to the type we expect
            (err.data as { message: string }).message
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
        <Card.Header title="Register" className="text-center" />
        <Card.Content>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              name="signup"
              autoComplete="on"
            >
              <Form.Controller
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <Form.Controller.Item>
                    <Form.Controller.Label>Full Name</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        autoComplete="name"
                      />
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
                        autoComplete="new-password"
                      />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Controller.Item>
                )}
              />

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full mt-2"
                size="lg"
                loading={loading}
              >
                Sign Up
              </Button>
              <div className="text-center text-sm mt-2">
                <Link to="/signin" className="hover:underline">
                  Already have an account? Sign In
                </Link>
              </div>
            </form>
          </Form>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
};
