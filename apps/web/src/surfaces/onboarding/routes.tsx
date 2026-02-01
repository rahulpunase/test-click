import type { RouteObject } from "react-router";

export const onboardingRoutes: RouteObject[] = [
  {
    path: "onboarding/get-started",
    lazy: async () => {
      const { GetStartedPage } = await import("./pages/GetStartedPage");
      return { Component: GetStartedPage };
    },
  },
  {
    path: "onboarding/create-workspace",
    lazy: async () => {
      const { CreateWorkspacePage } =
        await import("./pages/CreateWorkspacePage");
      return { Component: CreateWorkspacePage };
    },
  },
];
