import type { RouteObject } from "react-router";
import { PublicLayout } from "@/common/layouts/PublicLayout";

export const authRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        lazy: async () => {
          const { SignInPage } = await import("./pages/SignInPage");
          return { Component: SignInPage };
        },
      },
      {
        path: "register",
        lazy: async () => {
          const { SignUpPage } = await import("./pages/SignUpPage");
          return { Component: SignUpPage };
        },
      },
      {
        path: "forgot-password",
        lazy: async () => {
          const { ForgotPasswordPage } =
            await import("./pages/ForgotPasswordPage");
          return { Component: ForgotPasswordPage };
        },
      },
    ],
  },
];
