-- Example: set_updated_at trigger
-- Automatically updates the `updated_at` column on every row update.
-- Requires the target table to have an `updated_at timestamptz` column.

-- Step 1: function (fires the trigger logic)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Step 2: trigger (attach the function to a table)
-- Replace `users` with the target table name.
create or replace trigger trg_users_set_updated_at
before update on public.users
for each row
execute function public.set_updated_at();
