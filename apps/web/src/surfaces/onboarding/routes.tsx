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
    path: "onboarding/create-organization",
    lazy: async () => {
      const { CreateOrganizationPage } =
        await import("./pages/CreateOrganizationPage");
      return { Component: CreateOrganizationPage };
    },
  },
];
