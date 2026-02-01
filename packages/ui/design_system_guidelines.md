# Design System Guidelines

## Overview

This design system provides a comprehensive foundation for building consistent, accessible, and beautiful user interfaces across all applications in the monorepo. It's built on modern web technologies and follows industry best practices.

## Philosophy

### Core Principles

1. **Accessibility First**: Every component must be accessible by default, following WCAG 2.1 AA standards
2. **Consistency**: Maintain visual and behavioral consistency across all applications
3. **Flexibility**: Components should be flexible enough to handle various use cases while maintaining consistency
4. **Performance**: Optimize for performance with efficient rendering and minimal bundle sizes
5. **Developer Experience**: Provide excellent TypeScript support, clear documentation, and intuitive APIs

### When to Use the Design System

- ✅ Building user-facing UI components
- ✅ Creating forms, dashboards, and interactive elements
- ✅ Implementing common UI patterns (modals, dropdowns, etc.)
- ❌ One-off, highly customized marketing pages (use Tailwind directly)
- ❌ Experimental prototypes that may not align with design tokens

---

## Design Tokens

Design tokens are the foundational building blocks of the design system. They ensure visual consistency across all applications.

### Colors

We use a semantic color system with CSS variables defined in `globals.css`:

#### Brand Colors
- **Primary**: Custom brand blue with semantic variants
  - `primary` - Base color
  - `primary-hover` - Hover state
  - `primary-active` - Active/pressed state
  - `primary-disabled` - Disabled state
- **Secondary**: Coral/Orange accent color with semantic variants
  - `secondary` - Base color
  - `secondary-hover` - Hover state
  - `secondary-active` - Active/pressed state
  - `secondary-disabled` - Disabled state
- **Tertiary**: Slate/Blue-Gray utility color with semantic variants
  - `tertiary` - Base color
  - `tertiary-hover` - Hover state
  - `tertiary-active` - Active/pressed state
  - `tertiary-disabled` - Disabled state

#### Semantic Colors (Tailwind defaults)
- **Success**: Green (for positive actions, confirmations)
- **Warning**: Orange (for cautions, non-critical alerts)
- **Error**: Red (for errors, destructive actions)
- **Info**: Blue (for informational messages)

#### Theme Semantic Colors
We define semantic colors that automatically adapt to light and dark modes. **Always prefer these over raw neutral colors.**

- **Text Primary**: `text-text-primary` - Main text color (Maps to `var(--color-text-primary)`)
- **Text Muted**: `text-text-muted` - Secondary/subtle text (metadata, placeholders)
- **Background**: `bg-background` - Page and main container backgrounds
- **Background Muted**: `bg-background-muted` - Secondary/subtle backgrounds
- **Border**: `border-border-2` - Default border color (Maps to `var(--color-border-2)`). Use for inputs, cards, dividers.
- **Muted**: `bg-muted` - Muted background areas
- **Muted Foreground**: `text-muted-foreground` - Muted foreground text

#### Usage Guidelines
- **Use semantic color variables**: `bg-primary`, `bg-primary-hover`, etc.
- **For lighter shades**, use opacity modifiers: `bg-primary/10`, `bg-primary/20`
- **Use `bg-background` and `text-text-primary` for root elements and cards**
- **Use `border-border-2` for all generic borders**
- **Use `text-text-muted` for secondary text**
- Always ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text)

```tsx
// Good - using semantic variables
<button className="bg-primary hover:bg-primary-hover active:bg-primary-active">Click me</button>

// Good - using opacity for lighter backgrounds
<div className="bg-primary/10 hover:bg-primary/20">Light primary background</div>

// Bad - hardcoded Tailwind colors
<button className="bg-blue-500">Click me</button>

// Bad - hardcoded color scales that don't exist
<button className="bg-primary-500 hover:bg-primary-600">Click me</button>
```

### Typography

#### Font Families
- **Sans**: Inter - primary font for all text
- **Mono**: Fira Code - for code blocks and technical content

#### Font Sizes
Follow the predefined scale: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl

#### Hierarchy
- **H1**: text-4xl or text-5xl, font-bold
- **H2**: text-3xl, font-bold
- **H3**: text-2xl, font-semibold
- **H4**: text-xl, font-semibold
- **Body**: text-base, font-normal
- **Small**: text-sm, font-normal

### Spacing

Use the 4px grid system for all spacing:
- Prefer spacing tokens over arbitrary values
- Use `space-y-*` and `space-x-*` for consistent spacing in flex/grid layouts
- Common values: 2 (8px), 4 (16px), 6 (24px), 8 (32px)

```tsx
// Good
<div className="p-4 space-y-6">

// Bad - arbitrary values
<div className="p-[17px]">
```

### Border Radius
- **sm**: Subtle rounding (inputs, badges)
- **md**: Default rounding (buttons, cards)
- **lg**: Prominent rounding (modals)
- **xl/2xl/3xl**: Decorative elements
- **full**: Pills, avatars

### Shadows (Elevation)
- **sm**: Slightly raised (hover states)
- **DEFAULT**: Standard elevation (cards)
- **md**: Modal dialogs
- **lg**: Dropdowns, popovers
- **xl/2xl**: High-priority elements

---

## Component Development

### File Structure

Each component should follow this structure:

```
components/
  component-name/
    ComponentName.tsx          # Main component file
    ComponentName.variants.ts  # Tailwind variants configuration
    ComponentName.stories.tsx  # Storybook stories
    ComponentName.test.tsx     # Unit tests
    index.ts                   # Re-exports
```

### Component Export Pattern

**CRITICAL: Only export what consumers need. Hide all internal implementation details.**

Each component's `index.ts` should export **only**:
1. The main component (e.g., `Button`, `Card`, `Tabs`)
2. The root component's props interface (e.g., `ButtonProps`, `CardProps`)

**DO NOT export:**
- ❌ Variant functions (e.g., `buttonVariants`, `cardVariants`)
- ❌ Variant types (e.g., `ButtonVariants`, `CardVariants`)
- ❌ Subcomponent props types (e.g., `CardHeaderProps`, `TabsListProps`)
- ❌ Internal helper functions or utilities
- ❌ Context providers or hooks (unless they're meant to be public)

**Example `index.ts`:**

```tsx
// ✅ CORRECT - Only export main component and root props
export { Button, type ButtonProps } from "./Button";

// ❌ WRONG - Don't export internal implementation
export { Button, type ButtonProps } from "./Button";
export { buttonVariants, type ButtonVariants } from "./Button.variants"; // ❌ Don't do this
```

**For compound components:**

```tsx
// ✅ CORRECT - Only export main component and root props
export { Card, type CardProps } from "./Card";

// ❌ WRONG - Don't export subcomponent props
export { Card, type CardProps, type CardHeaderProps, type CardContentProps } from "./Card"; // ❌ Don't do this
```

**Why this matters:**
- **Cleaner API**: Consumers see only what they need in IDE autocomplete
- **Encapsulation**: Internal implementation details remain private
- **Flexibility**: You can refactor internal code without breaking consumers
- **Smaller bundles**: Fewer type exports = smaller TypeScript declaration files

### Package.json Exports Configuration

When creating a new component, you must update `package.json` to expose the component's directory:

**Location:** `packages/ui/package.json`

**Pattern:**
```json
{
  "exports": {
    "./styles": "./src/styles/globals.css"
  }
}
```

**Example - Adding a new `tooltip` component:**

```json
{
  "exports": {
    "./alert-dialog/*": "./src/components/alert-dialog/*.tsx",
    "./button/*": "./src/components/button/*.tsx",
    "./card/*": "./src/components/card/*.tsx",
    "./dropdown/*": "./src/components/dropdown/*.tsx",
    "./tabs/*": "./src/components/tabs/*.tsx",
    "./tooltip/*": "./src/components/tooltip/*.tsx", // ← Add this line
    "./styles": "./src/styles/globals.css"
  }
}
```

**Important notes:**
- Use kebab-case for the export path (e.g., `./alert-dialog/*`)
- The path should match your component directory name
- The wildcard `/*` allows importing any file from the component directory
- Always maintain alphabetical order for readability

**Consumer usage:**
```tsx
// Consumers can import like this:
import { Button } from "@repo/ui/button/Button";
import { Card } from "@repo/ui/card/Card";
import { Tooltip } from "@repo/ui/tooltip/Tooltip";

// Or from the main index (if re-exported there):
import { Button, Card, Tooltip } from "@repo/ui";
```

### Component Template

```tsx
// ComponentName.tsx
import { forwardRef } from 'react'
import { componentVariants } from './ComponentName.variants'
import { cn } from '@/lib/utils'

export interface ComponentNameProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white dark:bg-neutral-900 border border-border-2 rounded-lg", // Example base styles
          componentVariants({ variant, size }), 
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ComponentName.displayName = 'ComponentName'
```

### Using tailwind-variants

**IMPORTANT: Never use `dark:` variant classes in your tailwind-variants definitions.**

Instead, define dark mode styles as separate compound variants or use CSS custom properties. This keeps your variants clean and maintainable.

```tsx
// ComponentName.variants.ts
import { tv, type VariantProps } from 'tailwind-variants'

export const componentVariants = tv({
  base: 'font-medium transition-colors focus-visible-ring ring-offset-background',
  variants: {
    variant: {
      // ❌ WRONG - Don't use dark: classes
      // primary: 'bg-primary text-white hover:bg-primary-hover dark:bg-primary-400',
      
      // ✅ CORRECT - Use semantic color variables
      primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
      secondary: 'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  // ✅ CORRECT - Define dark mode in compound variants if absolutely needed
  compoundVariants: [
    {
      variant: 'primary',
      class: 'dark:bg-primary-400', // Only if necessary
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type ComponentVariants = VariantProps<typeof componentVariants>
```

**Why avoid `dark:` classes in variant definitions?**
- Keeps variant definitions clean and readable
- Easier to maintain and update
- Better separation of concerns
- Reduces complexity in variant combinations
- Prevents cluttering variant strings with dark mode alternatives

### Props API Design

1. **Use semantic variant names**: `variant="primary"` not `color="blue"`
2. **Provide sensible defaults**: Most common use case should work with zero configuration
3. **Support className override**: Always allow `className` prop for custom styling
4. **Forward refs**: All interactive/focusable components must forward refs
5. **Spread props**: Use `...props` to allow HTML attributes

---

## Accessibility Requirements

### ARIA Patterns

- **Mandatory Library**: **Always** use Base UI (`@base-ui/react`) for all complex interactive components (Dialogs, Dropdowns, Popovers, Tabs, etc.).
- Do not use `@headlessui/react` or custom implementations unless Base UI does not support the required pattern.
- Provide proper ARIA labels for all interactive elements
- Support keyboard navigation
- Manage focus properly

### Focus Management

- Use the `focus-visible-ring` utility class for consistent focus indicators
- Ensure focus is trapped in modals and dialogs
- Restore focus when closing overlays

### Color Contrast

- All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color to convey information

### Screen Readers

- Provide descriptive labels
- Use semantic HTML
- Add `sr-only` text where visual context isn't sufficient

```tsx
// Good
<button aria-label="Close dialog">
  <XIcon className="h-5 w-5" />
  <span className="sr-only">Close</span>
</button>

// Bad - no label for icon-only button
<button>
  <XIcon />
</button>
```

---

## Testing Standards

### Unit Tests

Every component should have tests covering:

1. **Rendering**: Component renders without crashing
2. **Props**: All variants and sizes render correctly
3. **Interactions**: Click handlers, keyboard events work as expected
4. **Accessibility**: Screen reader labels, keyboard navigation

```tsx
// ComponentName.test.tsx
import { render, screen } from '@/test-utils'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders children', () => {
    render(<ComponentName>Hello</ComponentName>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<ComponentName variant="secondary">Test</ComponentName>)
    const el = screen.getByText('Test')
    expect(el).toHaveClass('bg-secondary')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ComponentName ref={ref}>Test</ComponentName>)
    expect(ref.current).toBeInTheDocument()
  })
})
```

### Storybook Stories

Document all variants and states:

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Brief description of the component.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
  args: {
    children: 'Component Name',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </div>
  ),
}
```

---

## Code Style

### TypeScript

- Always use TypeScript
- Export prop types as interfaces
- Use `React.ReactNode` for children
- Prefer `type` for variants, `interface` for component props

### Naming Conventions

- Components: PascalCase (`Button`, `AlertDialog`)
- Files: PascalCase for components (`Button.tsx`)
- Variants: camelCase (`buttonVariants`)
- Props: PascalCase with `Props` suffix (`ButtonProps`)

### Imports

Use path aliases for clean imports:

```tsx
// Good
import { cn } from '@/lib/utils'
import { Button } from '@/components/button'

// Bad
import { cn } from '../../lib/utils'
```

---

## Future Component Development

When creating new components:

1. **Research**: Check existing patterns in Base UI and other design systems
2. **Design**: Define variants, sizes, and states needed
3. **Implement**: Build the component following the template above
4. **Test**: Write comprehensive unit tests
5. **Document**: Create Storybook stories with examples
6. **Review**: Get feedback on API and accessibility

### Component Patterns

#### Simple Components
Single element components like `Button`, `Checkbox`, `Input`.

#### Compound Components (Dot Notation)
For components with distinct related parts (like `AlertDialog`, `Card`, `DropdownMenu`), use the **Compound Component Pattern with Dot Notation**.

**Benefits:**
- **Single Import:** Users only import the main component.
- **Clear Hierarchy:** The relationship between components is explicit.
- **Discoverability:** IntelliSense shows available subcomponents.

**Implementation Guide:**
1.  Define the Main Component and Subcomponents as standalone functions.
2.  Assign Subcomponents to the Main Component keys.
3.  Export the Main Component.

```tsx
// Example: Card.tsx

// 1. Define Subcomponents
const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
)

const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
)

// 2. Define Main Component
export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}

// 3. Attach Subcomponents (Dot Notation)
Card.Header = CardHeader
Card.Content = CardContent

// Usage
// import { Card } from './Card'
// <Card>
//   <Card.Header>...</Card.Header>
//   <Card.Content>...</Card.Content>
// </Card>
```

---

## Component API Reference

### Compound Components
Below is a reference of the exposed subcomponents for the compound components in the library. **Only** use these exposed subcomponents.

#### `Card`
- `Card.Header` (Props: `title?: ReactNode`, `icon?: ReactNode`)
- `Card.Content`
- `Card.Footer`
- `Card.Tabs`
  - `Card.Tabs.List`
  - `Card.Tabs.Trigger`
  - `Card.Tabs.Content`

> **Note:** `Card` does **not** expose a `Title` subcomponent. Use the `title` prop on `Card.Header` instead.

#### `AlertDialog`
- `AlertDialog.Header`
- `AlertDialog.Title`
- `AlertDialog.Description`
- `AlertDialog.Content`
- `AlertDialog.Actions`

#### `Dropdown`
- `Dropdown.Trigger`
- `Dropdown.Content`
- `Dropdown.Popup`
- `Dropdown.Item`
- `Dropdown.ItemIndicator`

#### `Tabs`
- `Tabs.List`
- `Tabs.Trigger`
- `Tabs.Content`

#### `Form`
- `Form.Base` (The `<form>` element)
- `Form.Item`
- `Form.Controller` (Wraps `react-hook-form` Controller)
  - `Form.Controller.Item`
  - `Form.Controller.Label`
  - `Form.Controller.Field` (The Slot for the input)
  - `Form.Controller.Description`
  - `Form.Controller.Message`

---

## Getting Help

- Check existing components for patterns and examples
- Refer to [Base UI documentation](https://headlessui.com/) for accessible primitives
- Consult [Tailwind CSS docs](https://tailwindcss.com/docs) for utilities
- Review [tailwind-variants docs](https://www.tailwind-variants.org/) for variant patterns
