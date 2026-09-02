-- Example: monthly_signups materialized view
-- Aggregates user sign-ups per month. Refresh manually with REFRESH MATERIALIZED VIEW.
-- Suitable for dashboards or reports where real-time accuracy is not required.

create materialized view if not exists public.monthly_signups as
select
  date_trunc('month', created_at) as month,
  count(*) as signups
from users
group by 1
order by 1;

-- To refresh after data changes:
-- REFRESH MATERIALIZED VIEW public.monthly_signups;
