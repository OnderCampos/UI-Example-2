-- ============================================================
-- EXAMPLE: Delete old data every week
-- ============================================================
-- Deletes rows from a table every Saturday at 3:30 AM (GMT).
-- Adapt table name, column, and interval as needed.
-- ============================================================

select cron.schedule(
  'saturday-cleanup',         -- job name
  '30 3 * * 6',               -- every Saturday at 3:30 AM GMT
  $$
    delete from events
    where event_time < now() - interval '1 week'
  $$
);
