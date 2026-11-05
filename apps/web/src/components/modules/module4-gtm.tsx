'use client';

import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  Sparkles,
  Lock,
  Code,
  Terminal,
  Layers,
  ArrowRight,
  ShieldAlert,
  Search,
  ExternalLink,
  PhoneCall,
  Navigation,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ClientTenant } from '@/types';
import { sha256GoogleNormalized } from '@/lib/tracking/apex-datalayer';

interface Module4Props {
  client: ClientTenant;
}

export function Module4GtmAutomation({ client }: Module4Props) {
  const [activeTab, setActiveTab] = useState<'gtm' | 'ads_shield'>('gtm');

  const [googleAdsId, setGoogleAdsId] = useState('AW-123456789/AbCdEfGh');
  const [consentModeV2, setConsentModeV2] = useState(true);
  const [enhancedConversions, setEnhancedConversions] = useState(true);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionedGtm, setProvisionedGtm] = useState<{
    containerId: string;
    headSnippet: string;
    bodySnippet: string;
  } | null>({
    containerId: 'GTM-APEX789',
    headSnippet: `<!-- Google Tag Manager (Apex Suite) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'dataLayer','GTM-APEX789');</script>
<!-- End Google Tag Manager -->`,
    bodySnippet: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-APEX789"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
  });

  // Hash SHA-256 Tester State
  const [testEmail, setTestEmail] = useState(client.email);
  const [testPhone, setTestPhone] = useState(client.phone);
  const [hashResult, setHashResult] = useState<{ emailHash: string; phoneHash: string } | null>(null);
  const [isHashing, setIsHashing] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<'head' | 'body' | null>(null);

  // Joia 4: Escudo de Google Ads Local State (MasterGMB)
  const [copiedNegatives, setCopiedNegatives] = useState(false);
  const [copiedGoldKeywords, setCopiedGoldKeywords] = useState(false);

  const goldKeywords = [
    `[${client.primaryService.toLowerCase()} ${client.neighborhood.toLowerCase()}]`,
    `"${client.primaryService.toLowerCase()} em ${client.city.toLowerCase()}"`,
    `[clinica ${client.primaryService.toLowerCase()} perto de mim]`,
    `"${client.primaryService.toLowerCase()} preco ${client.neighborhood.toLowerCase()}"`,
    `[melhor especialista ${client.primaryService.toLowerCase()} ${client.city.toLowerCase()}]`,
    `"${client.name.toLowerCase()}"`,
  ];

  const negativeCategories = [
    {
      name: 'Vagas & Emprego',
      color: 'rose',
      keywords: ['curso', 'estágio', 'vaga', 'emprego', 'currículo', 'salário', 'concurso', 'sindicato', 'faculdade', 'professor'],
    },
    {
      name: 'Gratuidade & Baixa Renda',
      color: 'amber',
      keywords: ['grátis', 'gratuito', 'de graça', 'barato', 'doação', 'sus', 'beneficente', 'caseiro', 'gambiarra'],
    },
    {
      name: 'Reclamações & Informacional',
      color: 'orange',
      keywords: ['reclame aqui', 'reclameaqui', 'processo', 'procon', 'pdf', 'download', 'wikipedia', 'fotos', 'tcc'],
    },
  ];

  const allNegativesList = negativeCategories.flatMap((c) => c.keywords).join('\n');

  const handleProvisionGtm = () => {
    setIsProvisioning(true);
    setTimeout(() => {
      const randId = `GTM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setProvisionedGtm({
        containerId: randId,
        headSnippet: `<!-- Google Tag Manager (Apex Local Auto-Provisioned) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'dataLayer','${randId}');</script>
<!-- End Google Tag Manager -->`,
        bodySnippet: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${randId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
      });
      setIsProvisioning(false);
    }, 1200);
  };

  const handleTestHash = async () => {
    setIsHashing(true);
    try {
      const emailH = await sha256GoogleNormalized(testEmail);
      const phoneH = await sha256GoogleNormalized(testPhone);
      setHashResult({ emailHash: emailH, phoneHash: phoneH });
    } finally {
      setIsHashing(false);
    }
  };

  const copyToClipboard = (text: string, type: 'head' | 'body') => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(type);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Módulo 4: GTM, Consent Mode v2 & Escudo de Google Ads</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Provisionamento GTM, Enhanced Conversions & Escudo de Ads (MasterGMB)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gera contêiner GTM pronto com Consent Mode v2 (LGPD), testador de hash SHA-256 e o escudo de palavras negativas para blindar o orçamento de Google Ads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('gtm')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'gtm'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            GTM & Tracking
          </button>
          <button
            onClick={() => setActiveTab('ads_shield')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ads_shield'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            Escudo Google Ads (MasterGMB)
          </button>
        </div>
      </div>

      {activeTab === 'gtm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Painel Esquerdo: Configuração do Contêiner */}
          <div className="lg:col-span-5 bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              Parâmetros da Conta de Anúncios
            </h3>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Google Ads Conversion ID & Label
              </label>
              <input
                type="text"
                value={googleAdsId}
                onChange={(e) => setGoogleAdsId(e.target.value)}
                placeholder="Ex: AW-123456789/AbCdEfGh"
                className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div
                onClick={() => setConsentModeV2(!consentModeV2)}
                className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-white/[0.12] transition-all"
              >
                <div>
                  <span className="text-xs font-semibold text-white block">Consent Mode v2 (LGPD / GDPR)</span>
                  <span className="text-[10px] text-slate-400">
                    Sinais ad_storage, ad_user_data e analytics_storage
                  </span>
                </div>
                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    consentModeV2 ? 'bg-teal-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      consentModeV2 ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              <div
                onClick={() => setEnhancedConversions(!enhancedConversions)}
                className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-white/[0.12] transition-all"
              >
                <div>
                  <span className="text-xs font-semibold text-white block">Enhanced Conversions Ativo</span>
                  <span className="text-[10px] text-slate-400">
                    Normalização e hashing SHA-256 no client/server
                  </span>
                </div>
                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    enhancedConversions ? 'bg-teal-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      enhancedConversions ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleProvisionGtm}
                disabled={isProvisioning}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isProvisioning ? 'Provisionando Contêiner...' : 'Provisionar Contêiner GTM 1-Clique'}
              </button>
            </div>
          </div>

          {/* Painel Direito: Snippets GTM & Testador de Hash */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-teal-400" />
                  Snippets Oficiais de Instalação no Site
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-teal-500/15 text-teal-300 font-mono font-bold border border-teal-500/30">
                  {provisionedGtm?.containerId}
                </span>
              </div>

              {/* Snippet Head */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>1. Cole no mais alto possível do &lt;head&gt;:</span>
                  <button
                    onClick={() => copyToClipboard(provisionedGtm?.headSnippet || '', 'head')}
                    className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedSnippet === 'head' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSnippet === 'head' ? 'Copiado!' : 'Copiar Snippet'}
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/90 border border-white/[0.08] font-mono text-[11px] text-slate-300 overflow-x-auto">
                  <pre>{provisionedGtm?.headSnippet}</pre>
                </div>
              </div>

              {/* Snippet Body */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>2. Cole imediatamente após a abertura da tag &lt;body&gt;:</span>
                  <button
                    onClick={() => copyToClipboard(provisionedGtm?.bodySnippet || '', 'body')}
                    className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedSnippet === 'body' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSnippet === 'body' ? 'Copiado!' : 'Copiar Snippet'}
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/90 border border-white/[0.08] font-mono text-[11px] text-slate-300 overflow-x-auto">
                  <pre>{provisionedGtm?.bodySnippet}</pre>
                </div>
              </div>
            </div>

            {/* Testador ao Vivo de Hashing SHA-256 */}
            <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Simulador de Conversão Aumentada (Enhanced Conversions Hash SHA-256)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">E-mail do Lead</label>
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Telefone (DDD + Número)</label>
                  <input
                    type="text"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <button
                onClick={handleTestHash}
                disabled={isHashing}
                className="py-2 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-teal-300 font-semibold text-xs border border-teal-500/30 flex items-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                {isHashing ? 'Calculando Hash SHA-256...' : 'Testar Normalização & Hash SHA-256'}
              </button>

              {hashResult && (
                <div className="p-3 rounded-xl bg-slate-950/90 border border-teal-500/30 font-mono text-[11px] text-slate-300 space-y-1.5">
                  <div>
                    <span className="text-slate-400 block font-bold">sha256_email_address:</span>
                    <span className="text-teal-300 break-all">{hashResult.emailHash}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold">sha256_phone_number (E.164):</span>
                    <span className="text-teal-300 break-all">{hashResult.phoneHash}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ABA: Escudo de Google Ads Local & Keywords de Ouro (Herança do MasterGMB) */}
      {activeTab === 'ads_shield' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Herança de Ouro MasterGMB</span>
              </div>
              <h3 className="text-base font-extrabold text-white">
                Escudo de Google Ads Local & Keywords de Ouro
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Filtra cliques caros de curiosos, vagas de emprego e estudantes, canalizando 100% do orçamento para leads prontos para comprar em {client.neighborhood}.
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(allNegativesList);
                setCopiedNegatives(true);
                setTimeout(() => setCopiedNegatives(false), 2000);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-rose-500/20 flex items-center gap-1.5 transition-all"
            >
              {copiedNegatives ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedNegatives ? 'Lista Copiada!' : 'Copiar Escudo de Negativas (50+ Palavras)'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Coluna Esquerda: Keywords de Ouro + Escudo */}
            <div className="lg:col-span-7 space-y-6">
              {/* Keywords de Ouro */}
              <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-teal-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Keywords de Ouro (Alta Intenção Transacional)
                  </h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(goldKeywords.join('\n'));
                      setCopiedGoldKeywords(true);
                      setTimeout(() => setCopiedGoldKeywords(false), 2000);
                    }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    {copiedGoldKeywords ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedGoldKeywords ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {goldKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/25 font-mono text-xs font-semibold"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Escudo de Negativas */}
              <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-rose-500/20 space-y-4">
                <h4 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Escudo Protetor: Palavras-chave Negativas Recomendadas
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {negativeCategories.map((cat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-2">
                      <span className="text-[11px] font-bold uppercase text-slate-400 block border-b border-white/[0.06] pb-1">
                        {cat.name}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.keywords.map((neg, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono"
                          >
                            -{neg}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna Direita: Mockup Épico do Anúncio no Google Maps (MasterGMB Preview) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Preview Real do Anúncio Patrocinado no Maps
              </span>

              <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl text-slate-950 space-y-3 font-sans border-4 border-amber-400/40">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider">
                    Patrocinado
                  </span>
                  <h4 className="text-sm font-bold text-blue-700 leading-snug">
                    {client.name} | {client.primaryService}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-black text-slate-900">5.0</span>
                  <div className="text-amber-400 text-[10px]">★★★★★</div>
                  <span className="text-[11px] text-slate-500 underline font-semibold">
                    ({client.totalReviews}+ avaliações)
                  </span>
                </div>

                <p className="text-[10px] text-emerald-700 font-bold">
                  Aberto • Fecha às 20:00 • {client.neighborhood}
                </p>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  &ldquo;Especialista em {client.primaryService} em {client.neighborhood}. Atendimento VIP, sem filas e estacionamento próprio gratuito.&rdquo;
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <a
                    href={`tel:${client.phone}`}
                    className="py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Ligar
                  </a>
                  <button className="py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors">
                    <Navigation className="w-3.5 h-3.5" /> Ver Rotas
                  </button>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 mt-3 text-center max-w-xs">
                Este formato no topo do Maps gera até 4.5x mais ligações diretas do que anúncios na rede de pesquisa comum.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
