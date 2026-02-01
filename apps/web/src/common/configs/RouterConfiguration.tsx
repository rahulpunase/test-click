import { createBrowserRouter, type RouteObject } from "react-router";
import { authRoutes } from "@/surfaces/auth/routes";
import { homeRoutes } from "@/surfaces/home/routes";
import { onboardingRoutes } from "@/surfaces/onboarding/routes";
import { AuthenticatedLayout } from "../layouts/AuthenticatedLayout";
import { MainLayout } from "../layouts/MainLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { LoginCallback } from "@/surfaces/auth/pages/LoginCallback";
import { WithWorkspaceLayout } from "../layouts/WithWorkspaceLayout";

const routes: RouteObject[] = [
  {
    path: "auth/callback",
    element: <LoginCallback />,
  },
  // Auth Layout
  {
    element: <PublicLayout />,
    children: [...authRoutes],
  },

  // Authenticated + Main Layout
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      {
        element: <WithWorkspaceLayout />,
        children: [
          {
            element: <MainLayout />,
            children: [...homeRoutes],
          },
        ],
      },
      // allowed to see these pages even if user have organization
      ...onboardingRoutes,
    ],
  },

  // 404 Fallback
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export const router = createBrowserRouter(routes);
