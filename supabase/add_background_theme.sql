-- Run this in Supabase SQL Editor if background themes are not saving.
ALTER TABLE lockers
ADD COLUMN IF NOT EXISTS background_theme text DEFAULT 'violet';
