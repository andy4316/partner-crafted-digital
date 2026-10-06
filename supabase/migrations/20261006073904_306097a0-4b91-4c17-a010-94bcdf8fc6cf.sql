CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.notify_new_enquiry()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://project--a1f9186a-1dd8-44fb-92f3-600a286312e9.lovable.app/api/public/enquiry-notify',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := jsonb_build_object('id', NEW.id)
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW; -- never block a form submission because of email
END;
$$;
REVOKE EXECUTE ON FUNCTION public.notify_new_enquiry() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER contact_enquiries_notify
AFTER INSERT ON public.contact_enquiries
FOR EACH ROW EXECUTE FUNCTION public.notify_new_enquiry();