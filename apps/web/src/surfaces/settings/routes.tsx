import type { RouteObject } from "react-router";
import { SettingsPage } from "./pages/SettingsPage";
import { PeoplePage } from "./pages/PeoplePage";
import { ProfilePage } from "./pages/ProfilePage";

export const settingsRoutes: RouteObject[] = [
  {
    index: true,
    element: <SettingsPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "people",
    element: <PeoplePage />,
  },
];
