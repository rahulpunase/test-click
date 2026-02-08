import { createBrowserRouter, type RouteObject } from "react-router";
import { authRoutes } from "@/surfaces/auth/routes";
import { homeRoutes } from "@/surfaces/home/routes";
import { settingsRoutes } from "@/surfaces/settings/routes";
import { onboardingRoutes } from "@/surfaces/onboarding/routes";
import { inviteRoutes } from "@/surfaces/invite/routes";
import { AuthenticatedLayout } from "../layouts/AuthenticatedLayout";
import { MainLayout } from "../layouts/MainLayout";
import { SettingsLayout } from "../layouts/SettingsLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { LoginCallback } from "@/surfaces/auth/pages/LoginCallback";
import { WithWorkspaceLayout } from "../layouts/WithWorkspaceLayout";

const routes: RouteObject[] = [
  {
    path: "/auth/callback",
    element: <LoginCallback />,
  },
  // Auth Layout
  {
    path: "/",
    element: <PublicLayout />,
    children: [...authRoutes],
  },

  // Authenticated + Main Layout
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/:workspaceId",
        element: <WithWorkspaceLayout />,
        children: [
          {
            element: <MainLayout />,
            children: [...homeRoutes],
          },
          {
            path: "settings",
            element: <SettingsLayout />,
            children: [...settingsRoutes],
          },
        ],
      },
      // allowed to see these pages even if user have organization
      ...onboardingRoutes,
      // invite routes - user must be logged in to accept
      ...inviteRoutes,
    ],
  },

  // 404 Fallback
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export const router = createBrowserRouter(routes);
