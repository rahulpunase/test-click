# Surface Architecture Guidelines

This document outlines the architectural guidelines for creating and maintaining "surfaces" within the web application. A surface represents a distinct functional area of the application (e.g., Auth, Home, DashboardSettings).

## Directory Structure

Each surface should reside in its own directory under `apps/web/src/surfaces/` and follow this standard structure:

```
src/surfaces/[surface-name]/
├── components/         # Shared components specific to this surface
├── hooks/              # Custom hooks specific to this surface
├── pages/              # Top-level page components (route targets)
├── stores/             # State management (Zustand stores, Contexts)
└── routes.tsx          # Route definitions for this surface
```

### 1. Root Configuration (`routes.tsx`)
- **Purpose**: Defines the routing logic for the surface.
- **Exports**: A constant array of `RouteObject` (e.g., `authRoutes`, `homeRoutes`).
- **Guidelines**:
    - Should define the layout wrapper for the surface (e.g., `AuthenticatedLayout`, `PublicLayout`).
    - Use code splitting with `lazy` loading for page components where appropriate to optimize bundle size.
    - Example:
      ```tsx
      import { RouteObject } from "react-router";
      import { AuthenticatedLayout } from "@/common/layouts/AuthenticatedLayout";
      import { HomePage } from "./pages/HomePage";

      export const homeRoutes: RouteObject[] = [
        {
          path: "/",
          element: <AuthenticatedLayout />,
          children: [
            { index: true, element: <HomePage /> }
          ]
        }
      ];
      ```

### 2. Pages (`pages/`)
- **Purpose**: Container components that serve as the main entry points for routes.
- **Naming**: PascalCase with `Page` suffix (e.g., `HomePage.tsx`, `LoginPage.tsx`).
- **Guidelines**:
    - Pages should primarily compose smaller components.
    - specialized logic should be delegated to hooks or stores.

### 3. Components (`components/`)
- **Purpose**: UI components that are reusable *within this surface* but not generic enough for the global UI library.
- **Naming**: PascalCase.
- **Guidelines**:
    - If a component becomes useful across multiple surfaces, move it to `apps/web/src/common/components` or the `ui` package.

### 4. Stores (`stores/`)
- **Purpose**: State management specific to the surface.
- **Naming**: camelCase (e.g., `useHomeStore.ts`).
- **Guidelines**:
    - Use for complex state that needs to be shared across multiple components within the surface.
    - Can contain Zustand stores or React Context providers.

### 5. Hooks (`hooks/`)
- **Purpose**: Reusable logic specific to the surface.
- **Naming**: camelCase with `use` prefix (e.g., `useSubmitForm.ts`).

## General Principles
- **Encapsulation**: Keep surface-specific logic self-contained. Avoid importing internal modules of one surface into another.
- **Separation of Concerns**: Use the folder structure to separate routing, UI, and state management.
