-- supabase/migrations/001_apex_schema_rls.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Enums de controle de estado
CREATE TYPE agency_plan AS ENUM ('starter', 'growth', 'scale', 'enterprise');
CREATE TYPE gbp_verification_status AS ENUM ('unverified', 'warming_up', 'pending_pin', 'pending_video', 'verified', 'suspended');
CREATE TYPE audit_status AS ENUM ('pending', 'healthy', 'warning', 'critical', 'spam_risk');
CREATE TYPE consent_status AS ENUM ('not_configured', 'basic_v2', 'advanced_v2');

-- 1. AGENCIES (Tenant Raiz)
CREATE TABLE public.agencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    plano agency_plan NOT NULL DEFAULT 'starter',
    whitelabel_config JSONB NOT NULL DEFAULT '{
        "primary_color": "#0F172A",
        "accent_color": "#10B981",
        "custom_domain": null,
        "support_email": null,
        "hide_powered_by": false
    }'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela auxiliar de vínculo Usuário <-> Agência/Cliente (Supabase Auth)
CREATE TABLE public.tenant_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    client_id UUID, -- NULL se for membro da agência; preenchido se for usuário de cliente final (Portal)
    role VARCHAR(30) NOT NULL CHECK (role IN ('agency_owner', 'agency_manager', 'client_viewer')),
    UNIQUE(user_id, agency_id)
);

-- 2. CLIENTS (Organizações Locais geridas pela Agência)
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    nome_fantasia VARCHAR(150) NOT NULL,
    razao_social VARCHAR(200) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(30) NOT NULL, -- Formato E.164 (+5511999999999)
    endereco_completo JSONB NOT NULL DEFAULT '{
        "streetAddress": "",
        "neighborhood": "",
        "addressLocality": "",
        "addressRegion": "",
        "postalCode": "",
        "addressCountry": "BR"
    }'::jsonb,
    latitude DOUBLE PRECISION NOT NULL CHECK (latitude BETWEEN -90 AND 90),
    longitude DOUBLE PRECISION NOT NULL CHECK (longitude BETWEEN -180 AND 180),
    website_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.tenant_memberships
    ADD CONSTRAINT fk_membership_client
    FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE;

-- 3. GBP ACCOUNTS (Google Business Profile)
CREATE TABLE public.gbp_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    gbp_location_id VARCHAR(120) UNIQUE,
    status_verificacao gbp_verification_status NOT NULL DEFAULT 'warming_up',
    categoria_primaria VARCHAR(120) NOT NULL,
    categorias_secundarias TEXT[] DEFAULT '{}',
    rating_medio NUMERIC(3,2) DEFAULT 0.00 CHECK (rating_medio BETWEEN 0.00 AND 5.00),
    total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),
    nap_consistency_score INTEGER DEFAULT 0 CHECK (nap_consistency_score BETWEEN 0 AND 100),
    warmup_checklist JSONB NOT NULL DEFAULT '{
        "aged_google_account": false,
        "cnpj_active_receita": false,
        "facade_photo_ready": false,
        "website_footer_nap_match": false,
        "search_console_verified": false
    }'::jsonb,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. LANDING PAGES (On-Page, Schema & Core Web Vitals)
CREATE TABLE public.landing_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title_tag VARCHAR(70) NOT NULL,
    meta_description VARCHAR(160) NOT NULL,
    h1 VARCHAR(120) NOT NULL,
    core_web_vitals_score JSONB NOT NULL DEFAULT '{
        "performance_score": 0,
        "lcp_ms": null,
        "inp_ms": null,
        "cls": null,
        "hero_preloaded": false,
        "spam_compliance": {
            "has_cnpj_footer": false,
            "has_privacy_policy": false,
            "no_back_button_hijack": true,
            "unique_local_content_ratio": 1.0
        }
    }'::jsonb,
    schema_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    status_auditoria audit_status NOT NULL DEFAULT 'pending',
    last_audited_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. GTM CONTAINERS (Tracking, Consent Mode v2 & Quality Score)
CREATE TABLE public.gtm_containers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    gtm_account_id VARCHAR(64),
    gtm_container_id VARCHAR(32) NOT NULL, -- Ex: GTM-XXXXXXX
    google_ads_conversion_id VARCHAR(64),  -- Ex: AW-123456789/AbCdEfGhIjK
    consent_mode_status consent_status NOT NULL DEFAULT 'advanced_v2',
    enhanced_conversions_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    datalayer_triggers TEXT[] DEFAULT ARRAY['lead_submission', 'whatsapp_click', 'form_error', 'scroll_depth_75'],
    landing_page_experience_score VARCHAR(30) DEFAULT 'ABOVE_AVERAGE', -- BELOW_AVERAGE, AVERAGE, ABOVE_AVERAGE
    provisioned_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RANKINGS HISTORY (Local 3-Pack Geo-Grid)
CREATE TABLE public.rankings_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    keyword VARCHAR(150) NOT NULL,
    grid_size VARCHAR(10) NOT NULL DEFAULT '5x5',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    ranking_position INTEGER, -- NULL se > 20
    local_pack_status BOOLEAN NOT NULL DEFAULT FALSE, -- TRUE se ranking_position <= 3
    competitors_top3 JSONB DEFAULT '[]'::jsonb,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. UGC REVIEWS (Provas Sociais & Fresh Data)
CREATE TABLE public.ugc_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    autor VARCHAR(120) NOT NULL,
    nota INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
    depoimento TEXT NOT NULL,
    servico_prestado VARCHAR(120) NOT NULL,
    bairro_atendimento VARCHAR(100),
    foto_url TEXT,
    ai_reply_draft TEXT,
    published_on_lp BOOLEAN NOT NULL DEFAULT TRUE,
    data_coleta TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices de Performance
CREATE INDEX idx_clients_agency ON public.clients(agency_id);
CREATE INDEX idx_rankings_client_keyword_date ON public.rankings_history(client_id, keyword, captured_at DESC);
CREATE INDEX idx_ugc_client_published ON public.ugc_reviews(client_id, published_on_lp);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) MULTI-TENANT
-- ============================================================================
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gbp_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gtm_containers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rankings_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ugc_reviews ENABLE ROW LEVEL SECURITY;

-- Função Helper Security Definer para obter agency_id do usuário autenticado
CREATE OR REPLACE FUNCTION public.get_user_agency_ids()
RETURNS SETOF UUID AS $$
    SELECT agency_id FROM public.tenant_memberships WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Função Helper para checar acesso de cliente específico (Agência vê todos; Cliente vê apenas o próprio)
CREATE OR REPLACE FUNCTION public.can_access_client(target_client_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.clients c
        JOIN public.tenant_memberships tm ON tm.agency_id = c.agency_id
        WHERE c.id = target_client_id
          AND tm.user_id = auth.uid()
          AND (tm.client_id IS NULL OR tm.client_id = target_client_id)
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Políticas de Isolamento
CREATE POLICY "Agencies: Membros acessam sua agência"
    ON public.agencies FOR ALL
    USING (id IN (SELECT public.get_user_agency_ids()));

CREATE POLICY "Clients: Isolamento por Agência e Portal"
    ON public.clients FOR ALL
    USING (public.can_access_client(id));

CREATE POLICY "GBP: Isolamento por Cliente"
    ON public.gbp_accounts FOR ALL
    USING (public.can_access_client(client_id));

CREATE POLICY "LandingPages: Isolamento por Cliente"
    ON public.landing_pages FOR ALL
    USING (public.can_access_client(client_id));

CREATE POLICY "GTM: Isolamento por Cliente"
    ON public.gtm_containers FOR ALL
    USING (public.can_access_client(client_id));

CREATE POLICY "Rankings: Isolamento por Cliente"
    ON public.rankings_history FOR ALL
    USING (public.can_access_client(client_id));

CREATE POLICY "UGC: Isolamento por Cliente"
    ON public.ugc_reviews FOR ALL
    USING (public.can_access_client(client_id));
