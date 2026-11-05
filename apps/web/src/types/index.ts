export interface ClientTenant {
  id: string;
  name: string;
  corporateName: string;
  cnpj: string;
  phone: string;
  email: string;
  website: string;
  primaryService: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  primaryKeyword: string;
  gbpStatus: 'verified' | 'warming_up' | 'pending_pin';
  rating: number;
  totalReviews: number;
}

export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'attended' | 'won' | 'lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  value: number;
  status: LeadStatus;
  source: 'Google Maps' | 'Google Ads' | 'WhatsApp Direto' | 'Orgânico';
  neighborhood: string;
  createdAt: string;
  reviewRequested?: boolean;
}

export type ActiveModule = 
  | 'overview'
  | 'gbp'
  | 'auditor'
  | 'topical'
  | 'gtm'
  | 'geogrid'
  | 'crm'
  | 'portal';
