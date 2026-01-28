# Components

This directory contains all design system components built following the design system guidelines.

## Structure

Each component follows this structure:

```
component-name/
  ComponentName.tsx          # Main component implementation
  ComponentName.variants.ts  # Tailwind variants using tailwind-variants
  ComponentName.stories.tsx  # Storybook documentation
  ComponentName.test.tsx     # Unit tests
  index.ts                   # Re-exports
```

## Creating New Components

Refer to the [design_system_guidelines.md](../design_system_guidelines.md) for detailed instructions on creating new components.

### Quick Start

1. Follow the component template in the guidelines
2. Use `tailwind-variants` for styling variants
3. Use Base UI (Headless UI) for accessible primitives
4. Write comprehensive tests and Storybook stories
5. Ensure accessibility compliance (WCAG 2.1 AA)

## Available Components

Components will be added here as they are developed. The design system foundation is set up and ready for component development.

### Planned Components

- Button
- Input
- Checkbox
- Radio
- Select
- Card
- Badge
- Avatar
- Alert
- Modal/Dialog
- Dropdown Menu
- And more...
