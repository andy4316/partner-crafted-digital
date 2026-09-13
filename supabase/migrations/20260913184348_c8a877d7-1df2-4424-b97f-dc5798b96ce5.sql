ALTER TABLE public.contact_enquiries
  ADD COLUMN IF NOT EXISTS service_type TEXT NOT NULL DEFAULT 'website'
  CHECK (service_type IN ('website', 'iso', 'other'));