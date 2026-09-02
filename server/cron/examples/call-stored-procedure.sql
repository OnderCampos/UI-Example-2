-- ============================================================
-- EXAMPLE: Call a stored procedure every 5 minutes
-- ============================================================
-- Use CALL (not SELECT) for stored procedures.
-- Replace my_procedure with the name of your procedure.
--
-- The procedure must exist in the database before scheduling.
-- ============================================================

select cron.schedule(
  'call-db-procedure',  -- job name
  '*/5 * * * *',        -- every 5 minutes
  'CALL my_procedure()'
);
