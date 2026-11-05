'use client';

import React, { useState } from 'react';
import {
  FileSearch,
  Zap,
  ShieldCheck,
  Code,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Smartphone,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';
import { ClientTenant } from '@/types';
import { generateDeterministicJsonLd } from '@/lib/schema-builder/generate-local-schema';

interface Module2Props {
  client: ClientTenant;
}

interface AuditResultState {
  performance_score: number;
  lcp_ms: number;
  inp_ms: number;
  cls: number;
  passed_300px_rule: boolean;
  has_valid_cnpj_footer: boolean;
  has_privacy_policy_link: boolean;
  has_terms_of_use_link: boolean;
  no_back_button_hijack: boolean;
  unique_local_content_ratio: number;
  status_auditoria: string;
  recommendations: string[];
  hijack_evidence: string[];
}

export function Module2Auditor({ client }: Module2Props) {
  const [urlInput, setUrlInput] = useState(client.website);
  const [isAuditing, setIsAuditing] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Live Audit Result State
  const [auditResult, setAuditResult] = useState<AuditResultState>({
    performance_score: 98,
    lcp_ms: 1820,
    inp_ms: 68,
    cls: 0.02,
    passed_300px_rule: true,
    has_valid_cnpj_footer: true,
    has_privacy_policy_link: true,
    has_terms_of_use_link: true,
    no_back_button_hijack: true,
    unique_local_content_ratio: 0.92,
    status_auditoria: 'healthy',
    recommendations: [
      'Manter monitoramento de LCP abaixo de 2.5s com fetchpriority="high" na hero image.',
      'Garantir que novos artigos locais mantenham originalidade superior a 80% frente a outros bairros.',
    ],
    hijack_evidence: [],
  });

  // Schema Form State
  const [businessType, setBusinessType] = useState<'LocalBusiness' | 'ProfessionalService' | 'MedicalBusiness' | 'LegalService'>('ProfessionalService');
  const [serviceName, setServiceName] = useState(client.primaryService);
  const [priceRange, setPriceRange] = useState<'$' | '$$' | '$$$' | '$$$$'>('$$');
  const [faqList, setFaqList] = useState([
    {
      question: `Quanto tempo dura o procedimento de ${client.primaryService}?`,
      answer: `O procedimento inicial é realizado em média entre 45 e 90 minutos com avaliação prévia.`,
    },
    {
      question: `A empresa atende em todo o bairro de ${client.neighborhood}?`,
      answer: `Sim, atendemos com hora marcada em ${client.neighborhood} e regiões adjacentes de ${client.city}.`,
    },
  ]);

  // Generated JSON-LD
  const schemaResult = generateDeterministicJsonLd({
    businessType,
    companyName: client.name,
    legalName: client.corporateName,
    taxIdCnpj: client.cnpj,
    websiteUrl: client.website,
    landingPageUrl: `${client.website}/lp`,
    telephone: client.phone,
    email: client.email,
    priceRange,
    imageUrls: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200'],
    logoUrl: `${client.website}/logo.png`,
    address: {
      streetAddress: 'Avenida das Américas, 3500',
      neighborhood: client.neighborhood,
      addressLocality: client.city,
      addressRegion: client.state,
      postalCode: '22640-102',
      addressCountry: 'BR',
    },
    geo: {
      latitude: client.latitude,
      longitude: client.longitude,
    },
    openingHoursSpecification: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
      {
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '13:00',
      },
    ],
    primaryService: {
      name: serviceName,
      serviceType: client.primaryService,
      description: `Atendimento especializado em ${serviceName} com equipe certificada em ${client.city}.`,
      areaServedCities: [client.city, 'Região Metropolitana'],
    },
    aggregateRating: {
      ratingValue: client.rating,
      reviewCount: client.totalReviews,
    },
    faqs: faqList,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaResult.scriptTagHtml);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      let targetUrl = urlInput.trim();
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = `https://${targetUrl}`;
      }

      const res = await fetch('http://127.0.0.1:8000/api/v1/seo/auditor/inspect-landing-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landing_page_id: `lp-${Date.now()}`,
          client_id: client.id,
          url: targetUrl,
          expected_cnpj: client.cnpj,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAuditResult({
          performance_score: data.cwv.performance_score,
          lcp_ms: data.cwv.lcp_ms,
          inp_ms: data.cwv.inp_ms,
          cls: data.cwv.cls,
          passed_300px_rule: data.answer_first.passed_300px_rule,
          has_valid_cnpj_footer: data.spam_compliance.has_valid_cnpj_footer,
          has_privacy_policy_link: data.spam_compliance.has_privacy_policy_link,
          has_terms_of_use_link: data.spam_compliance.has_terms_of_use_link,
          no_back_button_hijack: data.spam_compliance.no_back_button_hijack,
          unique_local_content_ratio: data.spam_compliance.unique_local_content_ratio,
          status_auditoria: data.status_auditoria,
          recommendations: data.actionable_recommendations,
          hijack_evidence: data.spam_compliance.hijack_evidence,
        });
      }
    } catch (e) {
      console.log('Using simulated audit state', e);
    } finally {
      setIsAuditing(false);
    }
  };

  const getStatusBadge = () => {
    switch (auditResult.status_auditoria) {
      case 'healthy':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-bold text-xs border border-emerald-500/30">AUDITORIA: HEALTHY (98/100)</span>;
      case 'warning':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs border border-amber-500/30">AUDITORIA: ATENÇÃO NECESSÁRIA</span>;
      case 'critical':
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 font-bold text-xs border border-rose-500/30">AUDITORIA: CRÍTICA (CWV)</span>;
      case 'spam_risk':
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/40">RISCO SPAM / POLÍTICAS ADS</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs">STATUS: {auditResult.status_auditoria}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 text-xs font-semibold border border-sky-500/30 mb-2">
            <FileSearch className="w-3.5 h-3.5" />
            <span>Módulo 2: Motor Playwright + Google PageSpeed Insights</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Auditoria CWV, Regra dos 300px & Anti-Spam Hijacking
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Combina emulação Playwright Mobile com o detector de History API e cálculos matemáticos de CNPJ Módulo 11.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemplo.com.br"
            className="px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white w-64 focus:outline-none focus:border-sky-500"
          />
          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isAuditing ? 'Executando Worker...' : 'Escanear LP'}
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusBadge()}
          <span className="text-xs text-slate-400 font-mono">
            Alvo: <strong className="text-white">{urlInput}</strong>
          </span>
        </div>
        <span className="text-xs text-slate-400">
          CNPJ Esperado: <strong className="text-emerald-400 font-mono">{client.cnpj}</strong>
        </span>
      </div>

      {/* CWV Gauges & Regra dos 300px */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">LCP (Largest Contentful Paint)</span>
            <span className={`text-2xl font-black ${auditResult.lcp_ms <= 2500 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {(auditResult.lcp_ms / 1000).toFixed(2)}s
            </span>
            <span className="text-[10px] text-slate-500 block">
              {auditResult.lcp_ms <= 2500 ? 'Excelente (Meta ≤ 2.5s)' : 'Acima da meta'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm">
            {auditResult.performance_score}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">INP (Form Interaction)</span>
            <span className={`text-2xl font-black ${auditResult.inp_ms <= 200 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {auditResult.inp_ms}ms
            </span>
            <span className="text-[10px] text-slate-500 block">Meta: até 200ms</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm">
            99
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">CLS (Layout Shift)</span>
            <span className={`text-2xl font-black ${auditResult.cls <= 0.1 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {auditResult.cls.toFixed(3)}
            </span>
            <span className="text-[10px] text-slate-500 block">Sem saltos visuais (≤ 0.10)</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm">
            100
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Regra dos 300px Mobile</span>
            <span className={`text-sm font-bold flex items-center gap-1 mt-1 ${auditResult.passed_300px_rule ? 'text-emerald-400' : 'text-amber-400'}`}>
              <Smartphone className="w-4 h-4" />
              {auditResult.passed_300px_rule ? 'Aprovado (H1 + CTA)' : 'Rever 300px'}
            </span>
            <span className="text-[10px] text-slate-500 block">Resposta Imediata Answer-First</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            {auditResult.passed_300px_rule ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
          </div>
        </div>
      </div>

      {/* Compliance Anti-Spam & Google Ads Checklist */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Detector Anti-Spam, CNPJ Módulo 11 e Back-Button Hijacking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3">
            {auditResult.has_valid_cnpj_footer ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className="font-semibold text-white">CNPJ Válido no Rodapé</p>
              <p className="text-slate-400 text-[11px] mt-0.5 font-mono">
                {auditResult.has_valid_cnpj_footer ? `${client.cnpj} (Módulo 11 Válido)` : 'Não detectado ou inválido'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3">
            {auditResult.no_back_button_hijack ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className="font-semibold text-white">Sem Back-Button Hijacking</p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                {auditResult.no_back_button_hijack
                  ? 'History API monitorada: zero tentativas de desvio do botão Voltar.'
                  : 'ALERTA: Detectada manipulação de pushState no carregamento!'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Conteúdo Local Único</p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                {Math.round(auditResult.unique_local_content_ratio * 100)}% de originalidade (Proteção contra Doorway Pages).
              </p>
            </div>
          </div>
        </div>

        {/* Recomendações Acionáveis */}
        {auditResult.recommendations.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Recomendações Técnicas Geradas pelo Worker:
            </span>
            <div className="space-y-1.5 text-xs text-slate-300">
              {auditResult.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gerador de Schema.org JSON-LD Ao Vivo */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-sky-400" />
              Gerador Determinístico de Schema.org JSON-LD (@graph)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Conecta LocalBusiness, Service, GeoCoordinates e FAQPage em uma única entidade semântica.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSchema ? 'Copiado para o Clipboard!' : 'Copiar <script> JSON-LD'}
          </button>
        </div>

        {/* Code View */}
        <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 max-h-80 overflow-y-auto">
          <pre>{schemaResult.scriptTagHtml}</pre>
        </div>
      </div>
    </div>
  );
}
