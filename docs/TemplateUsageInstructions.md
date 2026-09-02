# Project Summary: Next.js Full-Stack Template

## What's Already Implemented

This project is a **complete, functional template** with the following pre-built components and systems, consider what is already done before adding new features.

### Core Infrastructure
- **Next.js 15 Application** - Fully configured with App Router
- **TypeScript Setup** - Complete type safety configuration
- **Tailwind CSS Integration** - Styling system ready to use
- **shadcn/ui Components** - Pre-installed in \`components/ui/\` directory
- **Toast Notifications** - Already set up, just import and use \`import { toast } from "sonner";\`
- **Supabase Client** - Configured at \`src/lib/supabase.ts\`
- **next-themes Integration** - Theme management system
- **TanStack Query** - Server state management and caching

### Authentication System (FULLY FUNCTIONAL)
- **Supabase Auth Integration** - Complete authentication backend
- **Email/Password Authentication** - Login and SignUp with email and password
- **Login Page** - Functional UI with form handling and validation
- **SignUp Page** - User registration with email/password and database sync

### Database Layer (READY TO USE)
- **Drizzle ORM Setup** - Type-safe database operations
- **PostgreSQL Integration** - Database connection configured via Supabase
- **Database Synchronization** - Users automatically created in both Supabase Auth and PostgreSQL. There is a user table defined in \`src/lib/db/schema.ts\`.

### File Storage (READY TO USE)
- **Supabase Storage** - Use the \`uploads\` bucket for file handling. The bucket is **public** and allows any authenticated user to add, read, and delete files.

### GraphQL (OPTIONAL — READY TO USE)
- **graphql-request + Supabase GraphQL API** - A GraphQL client is pre-configured for Supabase. **You do not have to use GraphQL** — GraphQL is available as an alternative if you explicitly need it (e.g. for a third-party GraphQL API, or if the user requests it).

### Cron Jobs (READY TO USE)
- **Supabase pg_cron** — Recurring tasks can be scheduled when needed. See `server/cron/README.md` for how to create and manage jobs.

### Routines (READY TO USE)
- **Functions, procedures, views, materialized views, triggers** — Use the CLI in `server/db-tools/routines/`. Read `server/db-tools/routines/README.md` for commands and examples.

### Edge Functions (READY TO USE)
- **Supabase Edge Functions** — The folder `supabase/functions/` is set up; there are no Edge Functions included by default. **If you need to create Edge Functions, read `supabase/functions/README.md`** for how to add them.

---

## What's Available to Build Upon

### READY FOR EXTENSION:
1. **Add New Database Tables** - Extend schema.ts with new entities (provide complete schema, do not run migrations)
2. **Create New Pages** - Add routes in src/app/ directory
3. **Build New Components** - Add to src/components/
4. **Use shadcn/ui Components** - Import from \`components/ui/\` directory
5. **Add API Routes** - Create API endpoints
6. **Extend User Features** - Build on existing user system
7. **Add New Queries** - Use existing TanStack Query setup and create query functions on src/lib/actions/
8. **Style Components** - Use configured Tailwind classes
9. **Add Business Logic** - Build features on authentication foundation
10. **Add Theme Toggle** - Use ModeToggle component anywhere
11. **GraphQL Queries** - Use the pre-configured Supabase GraphQL client when needed.
12. **Cron Jobs** — When needed, read `server/cron/README.md` for how to create and manage jobs.
13. **Routines** — Functions, procedures, views, materialized views, triggers → read `server/db-tools/routines/README.md`.
14. **Edge Functions** — When you need Supabase Edge Functions, read `supabase/functions/README.md` to create them.

---

## Authentication System Architecture

### Overview

This application uses **Supabase Auth** for authentication with dual-system user management:
- **Supabase Auth**: Handles login, signup, sessions, tokens
- **PostgreSQL Database**: Stores additional user data via Drizzle ORM

---

## Development Guidelines

### Authentication State Access
**CRITICAL:** Always use the `useAuth` hook to access the current user's authentication state. Never create custom authentication state management.
**Hook Location:** `src/lib/hooks/useAuth.ts`

**Returns:**
\`\`\`typescript
{
  user: User | null,       // Current authenticated user
  session: Session | null, // Current session
  loading: boolean         // Loading state
}
\`\`\`

**✅ DO:**
\`\`\`typescript
// Always use the useAuth hook for authentication state
import { useAuth } from "@/lib/hooks/useAuth";

function MyComponent() {
  const { user, loading } = useAuth();
  // Use user and loading
}
\`\`\`

**❌ DON'T:**
\`\`\`typescript
// Don't create custom auth state or call supabase.auth.getUser() repeatedly
const [user, setUser] = useState(null);
useEffect(() => {
  supabase.auth.getUser().then(({data}) => setUser(data.user));
}, []);
\`\`\`

---

### Protected Routes
**CRITICAL:** Wrap EVERY page that requires authentication with `<ProtectedRoute>`. Use it at the page level, not on individual components.

**Component Location:** `src/components/protected-route/index.tsx`

**Behavior:**
- Checks authentication using `useAuth` hook
- Redirects to `/auth/login` if not authenticated
- Handles loading state automatically
- Once the page is wrapped, all content inside is protected

**✅ DO:**
\`\`\`typescript
// Wrap the entire page content
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <UserProfile />
        <DataTable />
      </div>
    </ProtectedRoute>
  );
}
\`\`\`

**❌ DON'T:**
\`\`\`typescript
// Never implement manual redirect logic
export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user]);

  return <div>Content</div>;
}
\`\`\`

---

### Database Schema Management
**CRITICAL:** When adding or modifying database tables, ALWAYS provide complete Drizzle schema definitions. Do NOT ruß any migration commands.

**Schema Location:** `src/lib/db/schema.ts`


**NOT Your Responsibility:**
- Migrations are handled automatically by the system
- Do NOT run `npm run drizzle:generate`, `npm run drizzle:migrate`, or any drizzle-kit commands
- Do NOT worry about applying schema changes to the database

**Example Schema:**
\`\`\`typescript
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // UUID from Supabase Auth
  email: text("email").notNull().unique(),
  name: text("name"),
  created_at: timestamp("created_at").defaultNow(),
});

// Always infer types from schema
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
\`\`\`

**❌ NEVER run these commands:**
\`\`\`bash
npm run drizzle:generate  # System handles this
npm run drizzle:migrate   # System handles this
npx drizzle-kit generate  # Never use
npx drizzle-kit migrate   # Never use
npx drizzle-kit push      # Never use
\`\`\`

Just update the schema file. Migrations are applied automatically.

---

### User Schema & Authentication Sync

**IMPORTANT:** User authentication is already integrated with the database. When a user signs up:
1. User is created in Supabase Auth (handles authentication)
2. User is automatically created in PostgreSQL database (stores additional data)
3. Both use the same UUID as the primary key

**Existing User Table:** `src/lib/db/schema.ts`

\`\`\`typescript
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),           // UUID from Supabase Auth
  email: text("email").notNull().unique(), // User email
  name: text("name"),                    // Display name
  created_at: timestamp("created_at").defaultNow(),
});
\`\`\`

**CRITICAL:** 
- The `id` field MUST be UUID to match Supabase Auth user ID
- When adding new user-related tables, always reference this `id` field for foreign keys
- Do NOT recreate this table - it already exists and is synchronized with Supabase Auth

**Example of referencing users:**
\`\`\`typescript
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  // other fields...
});
\`\`\`

---

### Database Operations & Data Fetching

**CRITICAL:** ALWAYS use server actions for database operations. Organize them by entity/responsibility in `src/lib/actions/`.

**Pattern:** Create one file per entity with all related server actions, then use them with TanStack Query in client components.

**✅ DO:**

**Step 1: Create Server Actions (one file per entity)**
\`\`\`typescript
// src/lib/actions/users.ts
"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function getUsers() {
  return await db.select().from(users);
}

export async function createUser(data: NewUser) {
  return await db.insert(users).values(data);
}

export async function getUserById(id: string) {
  return await db.select().from(users).where(eq(users.id, id));
}
\`\`\`

**Step 2: Use with TanStack Query in Client Components**
\`\`\`typescript
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getUsers, createUser } from "@/lib/actions/users";

function UsersPage() {
  // Fetch data with React Query + Server Actions
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Mutations for create/update/delete
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return <div>{/* Render users */}</div>;
}
\`\`\`

**File Organization:**
\`\`\`
src/lib/actions/
├── users.ts       # User-related actions
├── posts.ts       # Post-related actions
├── comments.ts    # Comment-related actions
└── ...
\`\`\`

**❌ DON'T:**
\`\`\`typescript
// Never import db directly in client components
"use client";

import { db } from "@/lib/db"; // ERROR: Node.js modules not available in browser
\`\`\`


---

### GraphQL

A `graphql-request` client is pre-configured for Supabase GraphQL. If GraphQL is needed, follow the same pattern as Drizzle: create a Server Action that uses the client, then call it with TanStack Query in the component.

**Key files:**
- **`src/lib/graphql/client.ts`** — exports `getSupabaseGraphQLClient()`, a `GraphQLClient` instance pre-configured with the Supabase endpoint.
- **`src/lib/graphql/queries.ts`** — GraphQL query/mutation strings using the `gql` tag. Add new queries here.

**How Supabase GraphQL names things:**
- Tables are exposed as `<tableName>Collection` (e.g. `users` → `usersCollection`).
- Results follow the Relay Connection spec: `usersCollection.edges[].node` contains the actual row data.

**For other GraphQL APIs (non-Supabase):**
\`\`\`typescript
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://external-api.com/graphql", {
  headers: { Authorization: `Bearer ${process.env.EXTERNAL_API_TOKEN}` },
});
\`\`\`

---

### Supabase Client

**Client Location:** `src/lib/supabase.ts`

Use this client for Supabase operations needed

\`\`\`typescript
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey);
\`\`\`

**Usage:**
\`\`\`typescript
import { supabase } from "@/lib/supabase";

// Storage operations (see File handling section below)
await supabase.storage.from('uploads').upload(path, file);
\`\`\`

---

### Cron Jobs (Supabase pg_cron)

Recurring tasks can be scheduled via Supabase pg_cron. **Read `server/cron/README.md`** for CLI usage, TypeScript API, and rules.

### Routines (functions, procedures, views, triggers)

When you need to create or manage PostgreSQL functions, procedures, views, materialized views, or triggers, **read `server/db-tools/routines/README.md`** for the CLI, workflow, and rules.

### Edge Functions

When you need to create Supabase Edge Functions, **read `supabase/functions/README.md`** for how to add new functions.

---

## Environment Variables
These are the environment variables already defined in the project. If during development we need more we can add them here:

\`\`\`.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_connection_string
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

## Where to Build & Where Examples Live

- **Build your app in** `src/app/page.tsx`. The home route (`/`) is a placeholder that says "Override this component". Replace that file with your application's main screen; do not leave the home page empty.
- **Reference examples** (auth, React Query, server actions, UI components) live in `src/app/reference/page.tsx` and are available at the `/reference` route. Use them as a guide; the home page should be your own implementation.