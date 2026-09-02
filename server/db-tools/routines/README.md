# Routines CLI

CLI for managing user-defined PostgreSQL DDL objects: **functions, procedures, views, materialized views, and triggers**.

All commands run from the project root against the `DATABASE_URL` in `.env.local`.

```bash
npm run routines -- <command> [args]
```

> **Scope:** This CLI is for DDL objects, not table schema. Table schema is defined in `src/lib/db/schema.ts`. If needed, run the Drizzle scripts already defined in `package.json` to update the database: `npm run drizzle:generate` then `npm run drizzle:migrate`.

---

## Commands

### `list`

Shows all user-defined functions, procedures, views, materialized views, and triggers.

```bash
npm run routines -- list
```

---

### `apply <path/to/file.sql>`

Executes a SQL file. This is the main command for creating or replacing any DDL object.

```bash
npm run routines -- apply server/db-tools/routines/examples/create-trigger-set_updated_at.sql
```

The SQL file can contain any valid DDL, e.g.:
- `CREATE OR REPLACE FUNCTION ...`
- `CREATE OR REPLACE PROCEDURE ...`
- `CREATE OR REPLACE VIEW ...`
- `CREATE MATERIALIZED VIEW IF NOT EXISTS ...`
- `CREATE OR REPLACE TRIGGER ...`

---

### `drop-fn <schema> <name> [arg_types...]`

```bash
npm run routines -- drop-fn public log_user_action uuid text
# → DROP FUNCTION IF EXISTS public.log_user_action(uuid, text);
```

---

### `drop-proc <schema> <name> [arg_types...]`

```bash
npm run routines -- drop-proc public recalculate_stats
# → DROP PROCEDURE IF EXISTS public.recalculate_stats();
```

---

### `drop-view <schema> <name>`

```bash
npm run routines -- drop-view public active_users
# → DROP VIEW IF EXISTS public.active_users;
```

---

### `drop-mat-view <schema> <name>`

```bash
npm run routines -- drop-mat-view public monthly_signups
# → DROP MATERIALIZED VIEW IF EXISTS public.monthly_signups;
```

---

### `drop-trigger <trigger_name> <table_schema> <table_name>`

```bash
npm run routines -- drop-trigger trg_users_set_updated_at public users
# → DROP TRIGGER IF EXISTS trg_users_set_updated_at ON public.users;
```

---

## Examples

Ready-to-use SQL files in `examples/`:

| File | What it creates |
|---|---|
| `create-function-log_user_action.sql` | Function that logs user actions |
| `create-procedure-recalculate_stats.sql` | Procedure to recalculate stats |
| `create-view-active_users.sql` | View of users active in the last 30 days |
| `create-mat-view-monthly_signups.sql` | Materialized view of monthly sign-up counts |
| `create-trigger-set_updated_at.sql` | Trigger + function to auto-update `updated_at` |

Apply any of them:

```bash
npm run routines -- apply server/db-tools/routines/examples/create-mat-view-monthly_signups.sql
```

---

## Workflow

1. Write a SQL file with `CREATE OR REPLACE ...` (see `examples/`).
2. Apply it: `npm run routines -- apply path/to/file.sql`
3. Verify: `npm run routines -- list`
4. Drop if needed: `drop-fn`, `drop-proc`, `drop-view`, `drop-mat-view`, or `drop-trigger`

---

## Key rules

- **Triggers need a companion function.** The trigger calls a `RETURNS trigger` function. Create the function first (or in the same file), then attach the trigger with `CREATE TRIGGER`.
- **Materialized views do not update automatically.** After data changes run `REFRESH MATERIALIZED VIEW <schema>.<name>;` — via `apply` or in the Supabase SQL editor; or schedule it with the cron CLI.
- **Use `CREATE OR REPLACE`** so `apply` is idempotent and safe to re-run.
- **Do not use this CLI for table or column changes** — use Drizzle migrations (`drizzle:generate` / `drizzle:migrate`) for those.
