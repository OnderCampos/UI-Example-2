-- Example: recalculate_stats procedure
-- Placeholder procedure that updates a hypothetical stats table.

create or replace procedure public.recalculate_stats()
language sql
as $$
  update stats
  set updated_at = now();
$$;

