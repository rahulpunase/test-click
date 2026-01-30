import type { RouteObject } from "react-router";
import { AuthenticatedLayout } from "@/common/layouts/AuthenticatedLayout";
import { Home } from "./pages/HomePage";

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];
