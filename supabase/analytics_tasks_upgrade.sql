-- Run in Supabase SQL Editor (required for task order + analytics)

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

ALTER TABLE lockers ADD COLUMN IF NOT EXISTS unlocks integer NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX IF NOT EXISTS analytics_events_locker_session_dedup
  ON analytics_events (locker_id, event_type, ip_address)
  WHERE ip_address IS NOT NULL AND ip_address <> '';

CREATE OR REPLACE FUNCTION increment_unlocks(locker_id_input uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE lockers
  SET unlocks = COALESCE(unlocks, 0) + 1
  WHERE id = locker_id_input;
END;
$$;

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners read own analytics events" ON analytics_events;
CREATE POLICY "Owners read own analytics events"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());
