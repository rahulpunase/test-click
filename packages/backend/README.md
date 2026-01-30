# @repo/backend

Convex backend package for the monorepo. This package contains all backend logic including queries, mutations, actions, and database schemas.

## Getting Started

### Initial Setup

1. **Install dependencies** (from the root of the monorepo):
   ```bash
   npm install
   ```

2. **Initialize Convex** (first time only):
   ```bash
   cd packages/backend
   npx convex dev
   ```
   
   This will:
   - Prompt you to log in with GitHub
   - Create a new Convex project
   - Generate the `convex/_generated/` directory
   - Create a `.env.local` file with your deployment URL
   - Start the dev server to sync functions

3. **Copy the deployment URL** from `.env.local` to `apps/web/.env.local`:
   ```bash
   # In packages/backend/.env.local, you'll find:
   CONVEX_URL=https://your-deployment.convex.cloud
   
   # Copy this to apps/web/.env.local as:
   VITE_CONVEX_URL=https://your-deployment.convex.cloud
   ```

### Development Workflow

Run the Convex dev server to sync your backend functions:

```bash
cd packages/backend
npm run dev
```

This watches for changes in the `convex/` directory and automatically syncs them to your Convex deployment.

## Project Structure

```
packages/backend/
├── src/
│   └── index.ts          # Re-exports Convex client utilities
├── convex/
│   ├── _generated/       # Auto-generated API types (do not edit)
│   ├── schema.ts         # Database schema definition
│   └── *.ts              # Your queries, mutations, and actions
└── package.json
```

## Adding Backend Functions

### Queries

Create a new file in `convex/` directory (e.g., `convex/tasks.ts`):

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const get = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

### Mutations

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    text: v.string(),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: args.isCompleted,
    });
    return taskId;
  },
});
```

### Actions

```typescript
import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    // Call external APIs here
    await fetch("https://api.emailservice.com/send", {
      method: "POST",
      body: JSON.stringify(args),
    });
  },
});
```

## Updating the Schema

Edit `convex/schema.ts` to define your tables:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),
  
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }).index("by_email", ["email"]),
});
```

## Using in Apps

In your React components, import from `@repo/backend`:

```typescript
import { useQuery, useMutation, api } from '@repo/backend';

function MyComponent() {
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  
  const handleCreate = () => {
    createTask({ text: "New task", isCompleted: false });
  };
  
  return (
    <div>
      {tasks?.map(task => (
        <div key={task._id}>{task.text}</div>
      ))}
      <button onClick={handleCreate}>Add Task</button>
    </div>
  );
}
```

## Deployment

To deploy to production:

```bash
cd packages/backend
npm run deploy
```

This creates a production deployment and provides a new deployment URL for your production environment.

## Learn More

- [Convex Documentation](https://docs.convex.dev/)
- [React Quickstart](https://docs.convex.dev/quickstart/react)
- [TypeScript Guide](https://docs.convex.dev/using/typescript)
