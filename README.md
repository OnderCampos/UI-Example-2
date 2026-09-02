# Next.js + Tailwind + Drizzle + TanStack + Supabase — Template

A production-oriented starter for full-stack apps: **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Supabase** (Auth, Postgres, Storage), **Drizzle ORM**, and **TanStack Query**. Optional **GraphQL** (`graphql-request`), **pg_cron** and **routines** CLIs, and **Supabase Edge Functions** scaffolding live alongside the app.

## Quick start

1. Copy environment variables (see below) into `.env.local`.
2. Install and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Replace the home page in `src/app/page.tsx` with your app. Examples (auth, queries, storage, GraphQL) are at **`/reference`** (`src/app/reference/page.tsx`).

## Environment

Set at least:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `DATABASE_URL` | Postgres connection string (e.g. Supabase) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; seeding / admin tasks |

## Useful scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Typecheck, Next build, Edge Functions check |
| `npm run db:setup` | Migrations + seed (see `server/README.md`) |
| `npm run drizzle:generate` / `drizzle:migrate` | Drizzle migrations |
| `npm run cron` | pg_cron CLI — `server/cron/README.md` |
| `npm run routines` | DB functions / views / triggers CLI — `server/db-tools/routines/README.md` |

Edge Functions live under `supabase/functions/` — see **`supabase/functions/README.md`**.

## Documentation

- **`docs/TemplateUsageInstructions.md`** — Full template conventions, patterns, and extension points (especially for AI-assisted development).

## Learn more

- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Drizzle](https://orm.drizzle.team/docs/overview)
- [TanStack Query](https://tanstack.com/query/latest)
