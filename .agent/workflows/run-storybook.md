---
description: Run Storybook for the UI design system
---

# Run Storybook

This workflow starts the Storybook development server to view and interact with the design system components.

## Prerequisites

Storybook requires Node.js 18 or higher. This project uses Node.js 25 as specified in `.nvmrc`.

## Steps

### 1. Switch to the correct Node.js version

```bash
# Navigate to project root
cd /Users/macbookpro/Documents/projects/test-click

# Switch to Node.js version from .nvmrc (Node 25)
nvm use
```

### 2. Install dependencies (if needed)

If you just switched Node versions, reinstall dependencies:

```bash
npm install
```

### 3. Run Storybook

```bash
# Navigate to the UI package
cd packages/ui

# turbo
# Start Storybook development server
npm run storybook
```

Storybook will start on `http://localhost:6006`

## What You'll See

Once Storybook is running, you can:

- **Design Tokens**: View all color palettes, typography, spacing, shadows, and breakpoints
- **Button Component**: Explore all button variants (3 sizes × 5 colors × 2 styles = 30 variants)
- **Theme Switcher**: Toggle between light and dark modes using the toolbar
- **Accessibility**: Check accessibility with the a11y addon

## Troubleshooting

### "To run Storybook you need to have Node.js 18 or higher"

You're running an older version of Node. Run `nvm use` in the project root to switch to Node 25.

### Port 6006 already in use

Kill the process using port 6006:
```bash
lsof -ti:6006 | xargs kill -9
```

Or run Storybook on a different port:
```bash
npm run storybook -- -p 6007
```
