import type { RouteObject } from "react-router";

export const inviteRoutes: RouteObject[] = [
  {
    path: "invite/:token",
    lazy: async () => {
      const { AcceptInvitationPage } =
        await import("./pages/AcceptInvitationPage");
      return { Component: AcceptInvitationPage };
    },
  },
];
