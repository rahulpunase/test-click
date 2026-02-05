# Backend Development Guidelines

This guide outlines the standard process for adding new features, schemas, and API endpoints to the packages/backend package. We follow a strict structure to ensure maintainability, type safety, and clean separation of concerns.

## 1. Schema Definition

All database tables are defined in feature-specific files and imported into `convex/schema.ts`.

**Important**: Use `convex-helpers` wherever possible in your backend queries and mutations. Evaluate wherever `convex-helpers` can help.

Important! Always add the related hooks when creating a new query or mutation. 

When adding a new feature (e.g., "products"), first define its schema in a separate file (e.g., `convex/products/table.ts`) and then import it into `convex/schema.ts`.

**Example `convex/products/table.ts`**:
```typescript
import { defineTable } from "convex/server";
import { v } from "convex/values";

export const products = defineTable({
  name: v.string(),
  price: v.number(),
  categoryId: v.id("categories"),
  inStock: v.boolean(),
});
```

**Example `convex/schema.ts`**:
```typescript
import { defineSchema } from "convex/server";
import { products } from "./products/table";

export default defineSchema({
  // ... existing tables
  products,
});
```


**Important**: Use getting member by workspace ID and user ID, always use `getMember` from `convex/members/service.ts`.

**Important**: Use the centralized error service for throwing errors. Import the `Errors` object from `convex/errors/service.ts` and use the domain-specific function (e.g., `Errors.Auth.unauthenticated()`, `Errors.Member.notFound()`). Do NOT use `throw new ConvexError(...)` or `throw new Error(...)` directly. 

If you need a new error type:
1. Add the error message string to `convex/errors/constants.ts`
2. Add a semantic function to the `Errors` object in `convex/errors/service.ts` (e.g., under `Auth`, `Member`, etc.)
3. Use the new function in your queries/mutations. 

## 2. Backend Implementation

We organize backend logic by feature/domain rather than by function type.

Create a new folder in `convex/` for your feature: `convex/[featureName]/`.

### File Structure
```
convex/
  ├── schema.ts           # Global schema definition
  └── [featureName]/      # e.g., 'products'
      ├── queries.ts      # Read operations
      ├── mutations.ts    # Write operations
      └── service.ts      # Reusable business logic (Optional but recommended)
```

### Writing Queries & Mutations

**Documentation Requirement**:
All queries and mutations MUST have a JSDoc comment explaining what they do, their arguments, and potential errors thrown.

Example:
```typescript
/**
 * Retrieves a product by its ID.
 *
 * @param ctx - The query context.
 * @param args - The arguments for the query.
 * @param args.id - The ID of the product to retrieve.
 * @returns The product document, or null if not found.
 */
export const getById = query({ ... });
```

**`queries.ts`**:
```typescript
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

**`mutations.ts`**:
```typescript
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { name: v.string(), price: v.number() },
  handler: async (ctx, args) => {
    // Validation logic...
    return await ctx.db.insert("products", args);
  },
});
```

## 3. Hooks Integration (TanStack Query)

We do **not** expose raw Convex functions to the frontend. Instead, we create custom hooks using TanStack Query.

Create a corresponding folder in `src/hooks/[featureName]/`.

### File Structure
```
src/
  └── hooks/
      └── [featureName]/  # e.g., 'products'
          ├── queries.ts  # Hooks for reading data
          └── mutations.ts # Hooks for writing data
```

### Implementing Hooks

**`src/hooks/[featureName]/queries.ts`**:
All query hooks must return `{ data, isPending, error }`.

```typescript
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const useGetProduct = (id: Id<"products">) => {
  const { data, isPending, error } = useQuery(
    convexQuery(api.products.queries.getById, { id })
  );
  return { data, isPending, error };
};
```

**`src/hooks/[featureName]/mutations.ts`**:
All mutation hooks must return `{ mutate, isPending, error }`.

```typescript
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";

export const useCreateProduct = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.products.mutations.create),
  });
  return { mutate, isPending, error };
};
```

## 4. Public API & Exports

We use "Granular Exports" to keep imports clean and explicit. Consumers should import hooks from their specific feature subpath.

**Do NOT export hooks in `src/index.ts`.**

### Update `package.json`
Add your new feature paths to the `exports` field:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./products/queries": "./src/hooks/products/queries.ts",
    "./products/mutations": "./src/hooks/products/mutations.ts",
    // ... other exports
  }
}
```

## Summary Checklist

1.  [ ] Define schema in `convex/[feature]/table.ts` and import in `convex/schema.ts`
2.  [ ] Implement logic in `convex/[feature]/{queries,mutations,service}.ts`
3.  [ ] Create hooks in `src/hooks/[feature]/{queries,mutations}.ts`
4.  [ ] Add export paths to `package.json`