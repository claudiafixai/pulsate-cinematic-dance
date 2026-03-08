ALTER TABLE public.dancers ADD COLUMN IF NOT EXISTS language text DEFAULT 'fr';
ALTER TABLE public.judges ADD COLUMN IF NOT EXISTS language text DEFAULT 'fr';
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS language text DEFAULT 'fr';