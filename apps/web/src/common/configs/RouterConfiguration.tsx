import { createBrowserRouter, type RouteObject } from "react-router";
import { authRoutes } from "@/surfaces/auth/routes";
import { homeRoutes } from "@/surfaces/home/routes";
import { AuthenticatedLayout } from "../layouts/AuthenticatedLayout";
import { MainLayout } from "../layouts/MainLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { LoginCallback } from "@/surfaces/auth/pages/LoginCallback";

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
        element: <MainLayout />,
        children: [...homeRoutes],
      },
    ],
  },

  // 404 Fallback
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export const router = createBrowserRouter(routes);
