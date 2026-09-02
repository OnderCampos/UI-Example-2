-- ============================================================
-- EXAMPLE: Invoke a Supabase Edge Function every 30 seconds
-- ============================================================
-- Makes a POST request to a Supabase Edge Function on a schedule.
--
-- Requirements:
--   - Replace PROJECT_REF with your Supabase project reference
--   - Replace FUNCTION_NAME with your Edge Function name
--   - Replace YOUR_ANON_KEY with your project's anon key
-- ============================================================

select cron.schedule(
  'invoke-function-every-half-minute',  -- job name
  '30 seconds',                          -- every 30 seconds
  $$
    select net.http_post(
      url     := 'https://PROJECT_REF.supabase.co/functions/v1/FUNCTION_NAME',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer YOUR_ANON_KEY'
      ),
      body    := jsonb_build_object('time', now()),
      timeout_milliseconds := 5000
    ) as request_id;
  $$
);
