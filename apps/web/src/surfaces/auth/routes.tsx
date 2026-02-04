import type { RouteObject } from "react-router";

export const authRoutes: RouteObject[] = [
  // {
  //   path: "signin",
  //   lazy: async () => {
  //     const { SignInPage } = await import("./pages/SignInPage");
  //     return { Component: SignInPage };
  //   },
  // },
  {
    path: "signin",
    lazy: async () => {
      const { NewSignInPage } = await import("./pages/NewSignInPage");
      return { Component: NewSignInPage };
    },
  },
  // {
  //   path: "signup",
  //   lazy: async () => {
  //     const { SignUpPage } = await import("./pages/SignUpPage");
  //     return { Component: SignUpPage };
  //   },
  // },
  {
    path: "signup",
    lazy: async () => {
      const { NewSignUpPage } = await import("./pages/NewSignUpPage");
      return { Component: NewSignUpPage };
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
