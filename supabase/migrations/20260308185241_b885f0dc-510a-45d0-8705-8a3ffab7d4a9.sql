
-- Add new columns to dancers table
ALTER TABLE public.dancers ADD COLUMN IF NOT EXISTS parent_guardian_name text;
ALTER TABLE public.dancers ADD COLUMN IF NOT EXISTS parent_guardian_email text;
ALTER TABLE public.dancers ADD COLUMN IF NOT EXISTS group_name text;
ALTER TABLE public.dancers ADD COLUMN IF NOT EXISTS pass_type text;
ALTER TABLE public.dancers ADD COLUMN IF NOT EXISTS pass_price integer;

-- The dancer-videos bucket already exists as public; update it to private
UPDATE storage.buckets SET public = false WHERE id = 'dancer-videos';
