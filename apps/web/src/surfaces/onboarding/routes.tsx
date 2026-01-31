import type { RouteObject } from "react-router";

export const onboardingRoutes: RouteObject[] = [
  {
    path: "onboarding/create-organization",
    lazy: async () => {
      const { CreateOrganizationPage } =
        await import("./pages/CreateOrganizationPage");
      return { Component: CreateOrganizationPage };
    },
  },
  {
    path: "onboarding/choose-organization",
    lazy: async () => {
      const { ChooseOrganizationPage } =
        await import("./pages/ChooseOrganizationPage");
      return { Component: ChooseOrganizationPage };
    },
  },
];
