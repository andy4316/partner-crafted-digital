
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  points text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are public" ON public.services FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.pricing_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  setup_price text NOT NULL,
  yearly_price text NOT NULL,
  blurb text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  recommended boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pricing_tiers TO anon, authenticated;
GRANT ALL ON public.pricing_tiers TO service_role;
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pricing is public" ON public.pricing_tiers FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQs are public" ON public.faqs FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  sector text NOT NULL,
  problem text NOT NULL,
  built text NOT NULL,
  outcome text NOT NULL,
  is_placeholder boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.case_studies TO anon, authenticated;
GRANT ALL ON public.case_studies TO service_role;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Case studies are public" ON public.case_studies FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business text,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_enquiries TO anon, authenticated;
GRANT ALL ON public.contact_enquiries TO service_role;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send an enquiry" ON public.contact_enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO public.services (title, summary, points, sort_order) VALUES
('Web design & development', 'We design and build the site ourselves. No templates picked off a shelf, no page builder mess left behind.', ARRAY['Written, structured and designed around what your customers actually ask you','Built to load fast on an average phone on an average connection','Clean, semantic code you or anyone else can pick up later'], 1),
('Hosting & domain management', 'Your site has to stay up. We handle the boring part so you never think about it.', ARRAY['Hosting, SSL and renewals managed end to end','Domain registered in your name, not ours','We watch for downtime before your customers tell you'], 2),
('CMS & content updates', 'New prices, new photos, a new branch. Send it across and it goes live.', ARRAY['Minor edits included in your annual plan','Simple editing access if you would rather do it yourself','No ticket queues — you message us directly'], 3),
('SEO & local visibility', 'Most of your customers search before they call. We make sure they find you first.', ARRAY['On-page structure, titles and descriptions done properly','Google Business Profile set up and kept accurate','Local search terms your customers actually type'], 4),
('Ongoing maintenance', 'Websites decay quietly. Ours do not, because someone is looking after them.', ARRAY['Security patches and platform updates','Regular backups you can restore from','Yearly review of what is working and what is not'], 5),
('Digital marketing support', 'Only when it makes sense for you. We would rather say no than sell you ads you do not need.', ARRAY['Landing pages built for a specific campaign','Basic analytics set up so you can see what happened','Honest advice on whether to spend at all'], 6),
('Flyers & print materials', 'The same care, offline. Your website and your shop signage should look like the same business.', ARRAY['Flyers, brochures, visiting cards and standees','Print-ready files handed over to you','Consistent with your online identity'], 7);

INSERT INTO public.pricing_tiers (name, setup_price, yearly_price, blurb, features, recommended, sort_order) VALUES
('Starter', '₹12,000', '₹5,000 / year', 'A clean, credible presence for a business that just needs to be found.', ARRAY['Up to 4 pages','Mobile-first responsive design','Domain & hosting managed','Contact form and WhatsApp button','Basic SEO setup','2 content updates a year'], false, 1),
('Growth', '₹20,000', '₹8,000 / year', 'For a business that wants the website to bring in enquiries, not just exist.', ARRAY['Up to 10 pages','Custom design, no template','Google Business Profile setup','Local SEO and page-level optimisation','Content updates whenever you need them','Analytics and a yearly review'], true, 2),
('Premium', '₹32,000', '₹14,000 / year', 'The full partner arrangement — online and print, handled together.', ARRAY['Unlimited core pages','Bespoke design and copy support','Advanced SEO and ongoing tuning','Priority support on WhatsApp','Print materials designed each year','Campaign landing pages when you need them'], false, 3);

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('How long does a website take?', 'A Starter site is usually ready in two weeks. Growth and Premium take three to five, mostly depending on how quickly we get your photos and content. We will give you a date at the start and tell you early if anything shifts.', 1),
('Who owns the website and the domain?', 'You do. The domain is registered in your name, the content is yours, and the code is yours. We hold nothing hostage.', 2),
('What happens if I decide to leave?', 'We hand over everything — files, domain, hosting access — and help the next person get set up. No lock-in, no exit fee, no awkwardness. Most people stay, but that should be a choice.', 3),
('Is this AI-generated?', 'Honestly: we use AI where it speeds up drafting and cuts busywork. Every design decision, every line of copy and every technical choice is reviewed and made by a person. You are hiring judgement, not a prompt.', 4),
('What counts as a minor edit?', 'Changing prices, swapping a photo, updating hours, adding a paragraph, fixing a typo. New pages, new sections or a redesign are separate work, and we will quote it before we start.', 5),
('Do you work with businesses outside your city?', 'Yes. Most of our work happens over WhatsApp and calls. We have clients we have never met in person and the work is no different.', 6);

INSERT INTO public.case_studies (client_name, sector, problem, built, outcome, is_placeholder, sort_order) VALUES
('Case study slot one', 'Coming soon', 'Reserved for the first client study — the situation they came to us with.', 'What we designed, built and handed over.', 'What changed for the business afterwards.', true, 1),
('Case study slot two', 'Coming soon', 'Reserved for the second client study.', 'What we designed, built and handed over.', 'What changed for the business afterwards.', true, 2),
('Case study slot three', 'Coming soon', 'Reserved for the third client study.', 'What we designed, built and handed over.', 'What changed for the business afterwards.', true, 3);
