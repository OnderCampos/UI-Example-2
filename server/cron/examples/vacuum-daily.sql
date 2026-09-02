-- ============================================================
-- EXAMPLE: Run VACUUM every night
-- ============================================================
-- Reclaims storage and updates table statistics every day
-- at 3:00 AM (GMT). Helps maintain database performance.
-- ============================================================

select cron.schedule(
  'nightly-vacuum',  -- job name
  '0 3 * * *',       -- every day at 3:00 AM GMT
  'VACUUM'
);
