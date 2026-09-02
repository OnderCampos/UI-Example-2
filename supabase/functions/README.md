# Supabase Edge Functions

This folder contains **Supabase Edge Functions**. Each function is a separate subfolder with its own entrypoint and config.

---

## Creating a new Edge Function - Supabase CLI

From the project root, run:

```bash
npx supabase functions new <function-name>
```

Use a **kebab-case** name (e.g. `send-email`, `process-webhook`). This creates:

Then implement the handler in `supabase/functions/<function-name>/index.ts`.