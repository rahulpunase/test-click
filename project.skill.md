---
name: clickup-clone-project
description: Complete guide for developing a ClickUp-like project management system built with React, Vite, and Convex. Use this skill when working on task management features, workspace/team collaboration, chat messaging, template systems, or any development within this monorepo structure. Triggers include requests to add features, modify schemas, create new surfaces/modules, implement views (list/board/calendar), handle permissions, or debug Convex backend issues.
---

# ClickUp Clone - Project Management System

This skill provides comprehensive guidance for developing a multi-feature project management application that combines task management, team collaboration, chat messaging, and template systems—similar to ClickUp.

## Project Overview

**Purpose**: An all-in-one productivity platform that eliminates the need for multiple apps by combining task management, team collaboration, sprint planning, and real-time communication.

**Core Philosophy**: One workspace for everything—tasks, chats, sprints, and team coordination.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Convex (serverless backend + database)
- **Monorepo**: Turborepo
- **Authentication**: Convex Auth
- **Real-time**: Convex subscriptions (built-in)
- **File Storage**: Convex storage (`_storage`)

## Architecture

### Monorepo Structure

```
├── apps/
│   ├── web/                    # Main React application
│   │   └── src/
│   │       ├── common/         # Shared utilities, hooks, layouts
│   │       │   ├── components/ # App-specific shared components
│   │       │   ├── layouts/    # Page layouts (e.g., DashboardLayout)
│   │       │   └── providers/  # Global context providers
│   │       └── surfaces/       # Feature-based functional areas
│   │           ├── auth/       # Login, signup, password reset
│   │           ├── home/       # Home dashboard
│   │           └── onboarding/ # Workspace creation, invites
│   └── docs/                   # Documentation site (if needed)
│
├── packages/
│   ├── backend/                # Convex backend
│   │   └── convex/
│   │       ├── schema.ts       # Database schema definitions
│   │       ├── auth.ts         # Authentication logic
│   │       └── [features]/     # Feature modules (workspaces, members, etc.)
│   ├── ui/                     # Shared design system
│   │   └── src/
│   │       ├── components/     # Reusable UI components
│   │       └── stories/        # Storybook stories
│   ├── eslint-config/          # Shared linting rules
│   └── typescript-config/      # Shared TS configuration
```

### Key Architectural Decisions

**Surfaces Pattern**: Features are organized as "surfaces" in `apps/web/src/surfaces/`. Each surface represents a distinct functional area (auth, workspace management, task views, etc.).

**Component Location Logic**:
- `packages/ui/src/components/`: Generic, reusable design system components (buttons, inputs, modals)
- `apps/web/src/common/components/`: App-specific shared components (workspace switcher, member avatar, sidebar)

**Convex Organization**: Backend logic is organized by feature (workspaces, members, tasks) in `packages/backend/convex/[feature]/`.

## Data Model

### Hierarchy

```
User
  └── Workspaces (multiple)
        ├── Members (with roles: creator, admin, member)
        └── Spaces (multiple)
              └── Folders (multiple)
                    └── Lists (multiple)
                          └── Tasks (multiple)
                                └── Sub-tasks (multiple)
```

### Current Schema

```typescript
// Core tables
workspaces: {
  name: string
  slug: string              // Used in URL routing
  logoId?: Id<"_storage">   // Optional workspace logo
}

members: {
  userId: Id<"users">
  workspaceId: Id<"workspaces">
  role: "creator" | "admin" | "member"
}

member_profiles: {
  memberId: Id<"members">
  name?: string
  displayName?: string
  role?: string             // Job title/role (not workspace role)
  location?: string
  bio?: string
  contactEmail?: string
  contactPhone?: string
}

sidebar: {
  memberId: Id<"members">
  configuration: {
    navigation: Array<SidebarItem>
    home: Array<SidebarItem>
    sections: Array<SidebarItem>
  }
}
```

### Planned Tables (To Be Implemented)

```typescript
spaces: {
  workspaceId: Id<"workspaces">
  name: string
  color?: string
  icon?: string
  createdBy: Id<"members">
  createdAt: number
}

folders: {
  spaceId: Id<"spaces">
  name: string
  color?: string
  icon?: string
  createdBy: Id<"members">
  createdAt: number
}

lists: {
  folderId?: Id<"folders">  // Can be directly under space
  spaceId: Id<"spaces">
  name: string
  templateId?: Id<"templates">
  createdBy: Id<"members">
  createdAt: number
}

tasks: {
  listId: Id<"lists">
  name: string
  description?: string
  status: string            // Defined by list template
  priority?: string         // Defined by list template
  assignees: Array<Id<"members">>
  dueDate?: number
  startDate?: number
  position: number          // For ordering
  createdBy: Id<"members">
  createdAt: number
}

subtasks: {
  taskId: Id<"tasks">
  name: string
  isCompleted: boolean
  assignee?: Id<"members">
  position: number
}

templates: {
  name: string
  description?: string
  workspaceId?: Id<"workspaces">  // null = global template
  statuses: Array<{name: string, color: string}>
  priorities: Array<{name: string, color: string, level: number}>
  defaultTasks?: Array<{name: string, description?: string}>
}

comments: {
  taskId: Id<"tasks">
  memberId: Id<"members">
  content: string
  createdAt: number
  updatedAt?: number
}
```

## Core Features

### 1. Workspace & Member Management

**Workspace Creation Flow**:
1. User signs in/up
2. Check if user has workspaces → If none, redirect to workspace creation
3. User creates workspace → automatically becomes "creator"
4. Workspace gets unique slug for URL routing

**Invitation System**:
- Creator/Admin can invite users via email
- Invitees receive request
- On acceptance, new member record created with role "member"
- Members can be promoted to "admin" by creator/admin

**Role Permissions**:
- **Creator**: Full control, cannot be removed, one per workspace
- **Admin**: Manage members, create/delete spaces, configure settings
- **Member**: Create tasks, comment, limited administrative actions

**Workspace Switching**:
- URL structure: `/app/:workspaceSlug/...`
- Slug used to determine active workspace
- UI provides workspace switcher (dropdown/sidebar)

### 2. Task Management

**Hierarchy Navigation**:
- Workspace → Spaces → Folders → Lists → Tasks → Subtasks
- Each level can be expanded/collapsed in sidebar

**Views** (To Be Implemented):
- **List View**: Traditional task list with filters
- **Board View**: Kanban board grouped by status
- **Calendar View**: Tasks organized by due date
- **Gantt View**: Timeline view for project planning

**Task Properties**:
- Name, description
- Status (from template)
- Priority (from template)
- Assignees (multiple members)
- Due date, start date
- Comments/activity feed
- Subtasks
- Custom fields (future)

### 3. Template System

**Template Application**:
- Templates are applied when creating a **List**
- Template defines: statuses, priorities, default tasks
- Examples: "Bug Tracking", "Sprint Planning", "Marketing Campaign"

**Template Structure**:
```typescript
{
  name: "Bug Tracking",
  statuses: [
    {name: "Backlog", color: "#gray"},
    {name: "In Progress", color: "#blue"},
    {name: "Testing", color: "#yellow"},
    {name: "Done", color: "#green"}
  ],
  priorities: [
    {name: "Critical", color: "#red", level: 1},
    {name: "High", color: "#orange", level: 2},
    {name: "Medium", color: "#yellow", level: 3},
    {name: "Low", color: "#gray", level: 4}
  ],
  defaultTasks: [
    {name: "Setup testing environment"},
    {name: "Document reproduction steps"}
  ]
}
```

### 4. Chat/Messaging System

**Implementation Approach** (To Be Decided):
- Option A: Task-specific comments/threads (like GitHub issues)
- Option B: Slack-style channels + DMs
- Option C: Both (hybrid approach)

**Recommended**: Start with task comments, expand to channels later

**Real-time Updates**: Use Convex's built-in subscriptions for live updates

## Development Patterns

### Adding a New Feature Module

1. **Define Schema** in `packages/backend/convex/schema.ts`
2. **Create Feature Directory** in `packages/backend/convex/[feature-name]/`
3. **Write Convex Functions**:
   - Queries (read data): `export const get = query(...)`
   - Mutations (write data): `export const create = mutation(...)`
   - Actions (external APIs): `export const send = action(...)`
4. **Create Surface** in `apps/web/src/surfaces/[feature-name]/`
5. **Build UI Components** using components from `packages/ui`

### Convex Function Patterns

**Query Example**:
```typescript
// packages/backend/convex/workspaces/queries.ts
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const workspace = await ctx.db
      .query("workspaces")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return workspace;
  },
});
```

**Mutation Example**:
```typescript
// packages/backend/convex/members/mutations.ts
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateRole = mutation({
  args: {
    memberId: v.id("members"),
    role: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async (ctx, args) => {
    // Authorization check
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    
    // Update member role
    await ctx.db.patch(args.memberId, { role: args.role });
  },
});
```

### Creating a New Surface

1. Create directory: `apps/web/src/surfaces/[surface-name]/`
2. Add components, hooks, and pages specific to this feature
3. Update routing configuration
4. Add to sidebar configuration if needed

### Naming Conventions

**Files**:
- Components: `PascalCase.tsx` (e.g., `TaskCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Convex files: `camelCase.ts` (e.g., `queries.ts`, `mutations.ts`)

**Convex Functions**:
- Queries: `get`, `list`, `getBySlug`, `getById`
- Mutations: `create`, `update`, `delete`, `updateRole`
- Actions: `send`, `fetch`, `sync`

**Database Fields**:
- Use `camelCase` for all field names
- IDs: `userId`, `workspaceId`, `memberId`
- Timestamps: `createdAt`, `updatedAt` (milliseconds since epoch)
- Booleans: `isCompleted`, `isArchived`, `isActive`

## Common Development Tasks

### Adding a New Table

1. Define in `packages/backend/convex/schema.ts`:
```typescript
tasks: defineTable({
  listId: v.id("lists"),
  name: v.string(),
  status: v.string(),
  // ... other fields
})
  .index("by_listId", ["listId"])
  .index("by_assignee", ["assignees"])
```

2. Create queries/mutations in new feature directory
3. Update TypeScript types if needed

### Implementing Authorization

```typescript
// Check if user is workspace member
const member = await ctx.db
  .query("members")
  .withIndex("by_workspaceId_and_userId", (q) => 
    q.eq("workspaceId", workspaceId).eq("userId", userId)
  )
  .unique();

if (!member) throw new Error("Not a workspace member");

// Check role
if (member.role !== "admin" && member.role !== "creator") {
  throw new Error("Insufficient permissions");
}
```

### Adding Real-time Features

Convex queries are automatically reactive. Components re-render when data changes:

```typescript
// In React component
const tasks = useQuery(api.tasks.list, { listId });
// Tasks automatically update when database changes
```

### File Uploads

```typescript
// Get upload URL
const uploadUrl = await generateUploadUrl();

// Upload file
const response = await fetch(uploadUrl, {
  method: "POST",
  body: file,
});
const { storageId } = await response.json();

// Save reference in database
await createWorkspace({ name, logoId: storageId });
```

## Testing Approach

- **Unit Tests**: Test utility functions and helpers
- **Integration Tests**: Test Convex functions with test database
- **E2E Tests**: Test critical user flows (workspace creation, task management)
- **Manual Testing**: Use Convex dashboard to inspect database state

## Performance Considerations

- **Pagination**: Use Convex's cursor-based pagination for large lists
- **Indexes**: Add indexes for frequently queried fields
- **Selective Loading**: Load task details only when needed, not entire task list
- **Optimistic Updates**: Use Convex's optimistic update patterns for better UX

## Future Enhancements

- Custom fields for tasks
- Automations and triggers
- Time tracking
- Reporting and analytics
- API integrations (Slack, GitHub, etc.)
- Mobile applications
- Offline support

## Key Reminders

1. **Always** use indexes when querying by non-ID fields
2. **Check permissions** before mutations (member role, workspace access)
3. **Use workspace slug** for routing, not workspace ID
4. **Keep UI components** in appropriate directories (ui package vs app common)
5. **Follow surface pattern** for new feature areas
6. **Use Convex's reactivity** - don't manually refresh data
7. **Test with multiple workspaces** - users can belong to many

## Getting Help

- Convex docs: https://docs.convex.dev
- Turborepo docs: https://turbo.build/repo/docs
- React docs: https://react.dev
- Vite docs: https://vitejs.dev