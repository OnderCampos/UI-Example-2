# Cron Jobs (Supabase pg_cron)

This folder contains tooling for managing scheduled jobs in Supabase using the `pg_cron` extension — a **TypeScript API** and **CLI** that run the SQL via `pg`. The `examples/` folder has ready-to-use SQL you can run from the CLI or adapt in code.

---

## Files

| File | Purpose |
|------|---------|
| `cron-client.ts` | TypeScript functions: `scheduleCronJob`, `alterCronJob`, `activateCronJob`, `deactivateCronJob`, `listCronJobs` |
| `run.ts` | CLI script — run cron operations from the terminal |
| `examples/` | Ready-to-use SQL examples (cleanup, vacuum, functions, Edge Functions) — run via CLI or adapt in code |

---

## How to use the CLI

Run from the project root: `npm run cron -- <command> [args]`.

### `list`

Lists all registered cron jobs (active and inactive).

```bash
npm run cron -- list
```

### `schedule <name> <schedule> <command>`

Creates a new job or replaces an existing one with the same name (upsert).

- **name** — Unique job name (case sensitive; cannot be changed later).
- **schedule** — Cron expression (e.g. `0 3 * * *`) or interval (e.g. `30 seconds`).
- **command** — SQL to run (e.g. `SELECT 1`, `CALL my_proc()`). Use quotes if it contains spaces.

```bash
npm run cron -- schedule "nightly-vacuum" "0 3 * * *" "VACUUM"
npm run cron -- schedule "test-job" "*/5 * * * *" "SELECT 1"
```

### `alter <name> [--schedule=...] [--command=...] [--active=true|false]`

Updates an existing job. Only include the options you want to change.

```bash
npm run cron -- alter "nightly-vacuum" --schedule="0 4 * * *"
npm run cron -- alter "nightly-vacuum" --command="VACUUM ANALYZE"
npm run cron -- alter "nightly-vacuum" --active=false
```

### `activate <name>`

Re-enables a paused job so it runs again on its schedule.

```bash
npm run cron -- activate "nightly-vacuum"
```

### `deactivate <name>`

Pauses a job without deleting it. You can reactivate it later with `activate`.

```bash
npm run cron -- deactivate "nightly-vacuum"
```

### Deleting a job

The CLI does not support delete.

---

## Important rules

- **Job names are case sensitive** — `'my-job'` and `'My-Job'` are different jobs.
- **Job names cannot be edited** after creation. To rename a job, delete it and recreate it.
- Calling `cron.schedule()` with the same name **overwrites** the existing job (upsert).

---

## Cron syntax reference

```
┌──────────── minute (0–59)
│ ┌────────── hour (0–23)
│ │ ┌──────── day of month (1–31)
│ │ │ ┌────── month (1–12)
│ │ │ │ ┌──── day of week (0–6, Sunday = 0)
│ │ │ │ │
* * * * *
```

| Expression | Meaning |
|------------|---------|
| `*/5 * * * *` | Every 5 minutes |
| `0 3 * * *` | Every day at 3:00 AM GMT |
| `30 3 * * 6` | Every Saturday at 3:30 AM GMT |
| `0 9 * * 1` | Every Monday at 9:00 AM GMT |
| `0 0 1 * *` | First day of every month at midnight |
| `30 seconds` | Every 30 seconds (Postgres >= 15.1.1.61) |

---

## Examples

See the `examples/` folder:

- **`delete-old-data.sql`** — Delete rows older than 1 week every Saturday.
- **`vacuum-daily.sql`** — Run `VACUUM` every night at 3 AM.
- **`call-db-function.sql`** — Call a PostgreSQL function every 5 minutes.
- **`call-stored-procedure.sql`** — Call a stored procedure every 5 minutes.
- **`invoke-edge-function.sql`** — POST to a Supabase Edge Function every 30 seconds.


