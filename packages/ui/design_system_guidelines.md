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

We use a comprehensive color system with semantic meaning:

#### Brand Colors
- **Primary**: Blue-based brand color (50-950 scale)
- **Secondary**: Purple accent color (50-950 scale)
- **Neutral**: Gray palette for UI elements (50-950 scale)

#### Semantic Colors
- **Success**: Green (for positive actions, confirmations)
- **Warning**: Orange (for cautions, non-critical alerts)
- **Error**: Red (for errors, destructive actions)
- **Info**: Blue (for informational messages)

#### Usage Guidelines
- Use `500` as the default shade for most use cases
- Use lighter shades (50-300) for backgrounds
- Use darker shades (600-950) for text and emphasis
- Always ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text)

```tsx
// Good
<button className="bg-primary-500 hover:bg-primary-600">Click me</button>

// Bad - hardcoded colors
<button className="bg-blue-500">Click me</button>
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
        className={cn(componentVariants({ variant, size }), className)}
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
  base: 'font-medium transition-colors focus-visible-ring',
  variants: {
    variant: {
      // ❌ WRONG - Don't use dark: classes
      // primary: 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400',
      
      // ✅ CORRECT - Keep light mode classes only
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
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

- Use Base UI (Headless UI) components for complex patterns (Dialogs, Dropdowns, etc.)
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
    expect(el).toHaveClass('bg-secondary-500')
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

### Simple vs Compound Components

- **Simple**: Single element (Button, Badge, Avatar)
- **Compound**: Multiple related parts (Card.Header, Card.Body, Card.Footer)

Choose compound pattern when:
- Component has distinct sections
- Users need flexibility in composition
- Each part can be styled independently

---

## Getting Help

- Check existing components for patterns and examples
- Refer to [Base UI documentation](https://headlessui.com/) for accessible primitives
- Consult [Tailwind CSS docs](https://tailwindcss.com/docs) for utilities
- Review [tailwind-variants docs](https://www.tailwind-variants.org/) for variant patterns
