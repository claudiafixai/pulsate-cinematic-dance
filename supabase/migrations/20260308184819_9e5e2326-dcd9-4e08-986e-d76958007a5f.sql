
-- Create dancer-videos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('dancer-videos', 'dancer-videos', true);

-- Allow anonymous uploads to dancer-videos bucket
CREATE POLICY "Allow public uploads to dancer-videos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'dancer-videos');

-- Allow public reads from dancer-videos bucket
CREATE POLICY "Allow public reads from dancer-videos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'dancer-videos');
