import type { RouteObject } from "react-router";
import { PublicLayout } from "@/common/layouts/PublicLayout";

export const authRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        lazy: async () => {
          const { LoginPage } = await import("./pages/LoginPage");
          return { Component: LoginPage };
        },
      },
      {
        path: "register",
        lazy: async () => {
          const { RegisterPage } = await import("./pages/RegisterPage");
          return { Component: RegisterPage };
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
