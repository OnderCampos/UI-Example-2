-- Example: log_user_action function
-- Logs user actions into a `user_actions` table.

create or replace function public.log_user_action(user_id uuid, action text)
returns void
language plpgsql
as $$
begin
  insert into user_actions(user_id, action, created_at)
  values (user_id, action, now());
end;
$$;

