'use client';

import React from 'react';
import {
  TrendingUp,
  MapPin,
  Flame,
  Zap,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';
import { ClientTenant, ActiveModule } from '@/types';
import { LocalPackAndAuditDashboard, GridPointMetric } from '@/components/seo/local-pack-grid-card';

interface OverviewProps {
  client: ClientTenant;
  onNavigate: (module: ActiveModule) => void;
}

export function ExecutiveOverview({ client, onNavigate }: OverviewProps) {
  // Mock grid 5x5 data for current client
  const demoGridPoints: GridPointMetric[] = Array.from({ length: 25 }, (_, idx) => {
    const row = Math.floor(idx / 5);
    const col = idx % 5;
    const isCenter = row === 2 && col === 2;
    const distFromCenter = Math.abs(row - 2) + Math.abs(col - 2);
    let rank: number | null = 1;
    if (distFromCenter === 0) rank = 1;
    else if (distFromCenter === 1) rank = 2;
    else if (distFromCenter === 2) rank = 3;
    else if (distFromCenter === 3) rank = 7;
    else rank = null;

    return {
      id: `pt-${idx}`,
      row,
      col,
      lat: Number((client.latitude + (2 - row) * 0.013).toFixed(6)),
      lng: Number((client.longitude + (col - 2) * 0.014).toFixed(6)),
      rank,
    };
  });

  const cwvMetrics = {
    lcpMs: 1840,
    inpMs: 65,
    cls: 0.032,
    hasCnpjFooter: true,
    noBackButtonHijack: true,
    lpExperienceAds: 'ABOVE_AVERAGE' as const,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner com Gradiente Cromático */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f121b]/90 via-[#131722]/80 to-[#0e2220]/75 p-6 border border-teal-500/30 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Painel Executivo Multi-Tenant • Status Operacional Ativo</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {client.name}
            </h1>
            <p className="text-slate-300 text-xs mt-1">
              {client.primaryService} em {client.neighborhood}, {client.city} • Coordenadas: {client.latitude}, {client.longitude}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('portal')}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/[0.08] flex items-center gap-1.5 transition-all"
            >
              Acessar Portal White-Label
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('geogrid')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              Ver Geo-Grid 3-Pack
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Domínio do 3-Pack (SoLV)</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">76%</span>
            <span className="text-xs font-semibold text-teal-300 flex items-center">
              +14% <TrendingUp className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Raio de 5km coberto no Top 3</p>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Ligações & Rotas no GBP</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">142</span>
            <span className="text-xs font-semibold text-teal-300 flex items-center">
              +28% <TrendingUp className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Últimos 30 dias (GTM Enhanced)</p>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Landing Page Performance</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">98<span className="text-sm font-normal text-slate-400">/100</span></span>
            <span className="text-xs font-semibold text-teal-300">LCP 1.8s</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Regra dos 300px + CNPJ Válido</p>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Google Ads LP Experience</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-black text-teal-300">ABOVE AVERAGE</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Menor CPC leilão & Quality Score 9/10</p>
        </div>
      </div>

      {/* Main Grid Card: Geo-Grid 5x5 + Core Web Vitals Auditor */}
      <LocalPackAndAuditDashboard
        clientName={client.name}
        keyword={client.primaryKeyword}
        gridPoints={demoGridPoints}
        cwvMetrics={cwvMetrics}
      />

      {/* Quick Launchpad to All 6 Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('gbp')}
          className="p-5 rounded-2xl bg-[#0f121a]/75 backdrop-blur-md border border-white/[0.08] hover:border-teal-400/40 cursor-pointer transition-all hover:bg-[#141722]/85 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-teal-500/15 text-teal-300 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Módulo 1: GBP Fast-Track</h4>
              <p className="text-xs text-slate-400">Aquecimento & Injeção EXIF DMS</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Simulador de WebP com coordenadas precisas DMS e motor de resposta a avaliações com IA.
          </p>
        </div>

        <div
          onClick={() => onNavigate('auditor')}
          className="p-5 rounded-2xl bg-[#0f121a]/75 backdrop-blur-md border border-white/[0.08] hover:border-teal-400/40 cursor-pointer transition-all hover:bg-[#141722]/85 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-300 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Módulo 2: Auditor LP & CWV</h4>
              <p className="text-xs text-slate-400">Playwright & Regra dos 300px</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Detector de Back-button Hijacking, CNPJ Módulo 11 e gerador determinístico Schema.org.
          </p>
        </div>

        <div
          onClick={() => onNavigate('gtm')}
          className="p-5 rounded-2xl bg-[#0f121a]/75 backdrop-blur-md border border-white/[0.08] hover:border-teal-400/40 cursor-pointer transition-all hover:bg-[#141722]/85 group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-300 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Módulo 4: GTM & Ads 1-Clique</h4>
              <p className="text-xs text-slate-400">Consent Mode v2 & SHA-256</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Provisionamento instantâneo de contêineres Google Tag Manager com Enhanced Conversions ativado.
          </p>
        </div>
      </div>
    </div>
  );
}
