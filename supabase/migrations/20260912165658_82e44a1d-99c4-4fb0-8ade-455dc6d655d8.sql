ALTER TABLE public.contact_enquiries
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS enquiry_type text NOT NULL DEFAULT 'enquiry';

ALTER TABLE public.contact_enquiries
  ADD CONSTRAINT contact_enquiries_enquiry_type_check
  CHECK (enquiry_type IN ('enquiry', 'sample_request'));