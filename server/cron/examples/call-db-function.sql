-- ============================================================
-- EXAMPLE: Call a database function every 5 minutes
-- ============================================================
-- Calls a PostgreSQL function on a schedule.
-- Replace hello_world with the name of your function.
--
-- The function must exist in the database before scheduling.
-- ============================================================

select cron.schedule(
  'call-db-function',  -- job name
  '*/5 * * * *',       -- every 5 minutes
  'SELECT hello_world()'
);
