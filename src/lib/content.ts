import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  sort_order: number;
};

export type PricingTier = {
  id: string;
  name: string;
  setup_price: string;
  yearly_price: string;
  blurb: string;
  features: string[];
  recommended: boolean;
  sort_order: number;
};

export type Faq = { id: string; question: string; answer: string };

export type CaseStudy = {
  id: string;
  client_name: string;
  sector: string;
  problem: string;
  built: string;
  outcome: string;
  is_placeholder: boolean;
};

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from("services")
      .select("id,title,summary,points,sort_order")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const pricingQuery = queryOptions({
  queryKey: ["pricing_tiers"],
  queryFn: async (): Promise<PricingTier[]> => {
    const { data, error } = await supabase
      .from("pricing_tiers")
      .select("id,name,setup_price,yearly_price,blurb,features,recommended,sort_order")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const faqsQuery = queryOptions({
  queryKey: ["faqs"],
  queryFn: async (): Promise<Faq[]> => {
    const { data, error } = await supabase
      .from("faqs")
      .select("id,question,answer")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const caseStudiesQuery = queryOptions({
  queryKey: ["case_studies"],
  queryFn: async (): Promise<CaseStudy[]> => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("id,client_name,sector,problem,built,outcome,is_placeholder")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});
