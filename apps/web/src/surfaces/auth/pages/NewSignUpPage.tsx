import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "@repo/backend";
import { Button, Form, Input } from "@repo/ui";
import { Chrome } from "lucide-react";
import { useState } from "react";
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

export const NewSignUpPage = () => {
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
        err instanceof ConvexError
          ? (err.data as { message: string }).message
          : "Unexpected error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleClick = () => {
    signInWithGoogle();
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-2">
              Create an account
            </h1>
            <p className="text-neutral-500">
              Start managing your tasks effectively today.
            </p>
          </div>

          <Button
            variant="outlined"
            className="w-full relative overflow-hidden group border-neutral-200 hover:border-violet-500 hover:text-violet-600 transition-all duration-300"
            onClick={onGoogleClick}
            disabled={loading}
          >
            <span className="relative z-10 flex items-center justify-center">
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </span>
            <div className="absolute inset-0 bg-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left" />
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-500">
                Or register with email
              </span>
            </div>
          </div>

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
                    <Form.Controller.Label className="text-neutral-700">
                      Full Name
                    </Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        autoComplete="name"
                        className="h-11 bg-neutral-50 border-neutral-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
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
                    <Form.Controller.Label className="text-neutral-700">
                      Work Email
                    </Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="name@company.com"
                        type="email"
                        {...field}
                        autoComplete="email"
                        className="h-11 bg-neutral-50 border-neutral-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
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
                    <Form.Controller.Label className="text-neutral-700">
                      Password
                    </Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        autoComplete="new-password"
                        className="h-11 bg-neutral-50 border-neutral-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                      />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Controller.Item>
                )}
              />

              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm text-center border border-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 border-0 mt-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
                loading={loading}
              >
                Sign Up
              </Button>
              <div className="text-center text-sm mt-4 text-neutral-500">
                <Link
                  to="/signin"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Already have an account? Sign In
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-900/40 mix-blend-overlay z-10" />
        <img
          src="/auth-illustration.png"
          alt="Task Management Illustration"
          className="object-cover w-full h-full transform scale-105 hover:scale-110 transition-transform duration-1000 ease-in-out"
        />
        <div className="absolute bottom-12 left-12 right-12 z-20 text-white p-8 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            Join our community
          </h2>
          <p className="text-neutral-800 text-lg leading-relaxed">
            Collaborate with your team and streamline your workflow with our
            advanced task management platform.
          </p>
        </div>
      </div>
    </div>
  );
};
