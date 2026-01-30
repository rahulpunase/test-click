import { createBrowserRouter, type RouteObject } from "react-router";
import { authRoutes } from "@/surfaces/auth/routes";
import { homeRoutes } from "@/surfaces/home/routes";

const routes: RouteObject[] = [
  // Auth Routes
  ...authRoutes,

  // Home Routes
  ...homeRoutes,

  // 404 Fallback
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export const router = createBrowserRouter(routes);
