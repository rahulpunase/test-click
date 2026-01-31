import type { RouteObject } from "react-router";
import { Home } from "./pages/HomePage";

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
];
