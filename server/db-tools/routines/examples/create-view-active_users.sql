-- Example: active_users view
-- Shows users who have logged in within the last 30 days.

create or replace view public.active_users as
select *
from users
where last_login_at > now() - interval '30 days';

