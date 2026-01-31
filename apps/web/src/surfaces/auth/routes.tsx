import type { RouteObject } from "react-router";

export const authRoutes: RouteObject[] = [
  {
    path: "signin",
    lazy: async () => {
      const { SignInPage } = await import("./pages/SignInPage");
      return { Component: SignInPage };
    },
  },
  {
    path: "signup",
    lazy: async () => {
      const { SignUpPage } = await import("./pages/SignUpPage");
      return { Component: SignUpPage };
    },
  },
  {
    path: "forgot-password",
    lazy: async () => {
      const { ForgotPasswordPage } = await import("./pages/ForgotPasswordPage");
      return { Component: ForgotPasswordPage };
    },
  },
];
