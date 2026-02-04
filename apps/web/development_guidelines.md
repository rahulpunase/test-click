# Development Guidelines

This document outlines the standards and best practices for developing components and features within the web application. Always refer to these guidelines before creating new components or integrating backend logic.

## 1. UI Component Imports

All UI components must be imported from the `@repo/ui` package. Do not import components directly from their source files.

**Package Name:** `@repo/ui`

**Import Pattern:**
```typescript
import { ComponentName } from "@repo/ui";
```

**Available Components (exported via `@repo/ui`):**
- `Button`
- `Tabs`
- `Card`
- `Dropdown`
- `AlertDialog`
- `Checkbox`
- `Input`
- `Form`
- `List`
- `Skeleton`

**Utilities:**
Utilities can be imported from the utils path:
```typescript
import { cn } from "@repo/ui/utils";
```

**Reference:** `packages/ui/package.json`

## 1.1 Implementation & Usage

**CRITICAL RULE:** Whenever you add or implement a new component from `packages/ui`, **ALWAYS** refer to its Storybook documentation first.
- The Storybook contains the source of truth for props, variants, and usage examples.
- Check the Storybook stories to understand how the component is intended to be composed and used.
- Do not guess prop names or usage patterns; verified examples are in Storybook.
- To run Storybook: `/run-storybook` or `pnpm storybook` in `packages/ui`.

## 2. Backend Imports

Backend types, queries, and mutations must be imported from the specific paths exposed by the `@repo/backend` package.

**Package Name:** `@repo/backend`

**Import Patterns:**

- **Types:**
  ```typescript
  import { SomeType } from "@repo/backend/types";
  ```

- **User Queries & Mutations:**
  ```typescript
  import { useQuery } from "convex/react";
  import { api } from "../../../convex/_generated/api"; // Note: In the actual app, you might be using the convex generated API directly or custom hooks from the backend package if available.
  
  // However, based on the package.json exports, specific hooks/logic might be available at:
  import { ... } from "@repo/backend/user/queries";
  import { ... } from "@repo/backend/user/mutations";
  ```

- **Workspace Queries:**
  ```typescript
  import { ... } from "@repo/backend/workspaces/queries";
  ```

- **Sample Queries & Mutations:**
  ```typescript
  import { ... } from "@repo/backend/sample/queries";
  import { ... } from "@repo/backend/sample/mutations";
  ```

**Reference:** `packages/backend/package.json`

## 3. CSS/Styling Guidelines

We utilize a centralized design system defined in `packages/ui/src/styles/globals.css`. 

**Strict Rule:**
- **NEVER** use raw Tailwind colors (e.g., `text-red-500`, `bg-blue-600`, `border-gray-200`) directly in your components.
- **ALWAYS** use the semantic color tokens provided by our `globals.css`.

### Available Semantic Colors

Use these tokens in your Tailwind classes (e.g., `bg-primary`, `text-error`, `border-border-1`).

**Brand & Actions:**
- `primary`: Main brand color (actions, links).
  - Variants: `primary-hover`, `primary-active`, `primary-disabled`
- `secondary`: Secondary actions.
  - Variants: `secondary-hover`, `secondary-active`, `secondary-disabled`
- `tertiary`: Neutral/Subtle actions.
  - Variants: `tertiary-hover`, `tertiary-active`, `tertiary-disabled`

**Status:**
- `success`: Success states.
  - Variants: `success-hover`, `success-active`, `success-disabled`
- `error`: Error states (Note: avoid `red-*`).
  - Variants: `error-light` (backgrounds), `error-hover`, `error-active`, `error-disabled`
- `warning`: Warning states.
  - Variants: `warning-hover`, `warning-active`, `warning-disabled`

**Typography:**
- `text-primary`: Key text content.
- `text-muted`: Secondary/supporting text.

**Backgrounds:**
- `background`: Main page background.
- `background-muted`: Secondary background / panels.
- `background-hover`: Hover states for interactive elements.

**Borders:**
- `border-1`: Subtle borders.
- `border-2`: Default borders.
- `border-3`: Stronger borders.
- `border-4`: High contrast borders.

**Muted/Subtle:**
- `muted`: Muted backgrounds.
- `muted-foreground`: Muted text on muted backgrounds.

**Example Usage:**

```tsx
// ❌ WRONG
<div className="bg-red-500 text-white border-gray-200">
  Error Message
</div>

// ✅ CORRECT
<div className="bg-error text-white border-border-1">
  Error Message
</div>
```

**Reference:** `packages/ui/src/styles/globals.css`
