// apps/web/src/components/seo/local-pack-grid-card.tsx
'use client';

import React from 'react';
import { MapPin, ShieldCheck, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

export interface GridPointMetric {
  id: string;
  row: number;
  col: number;
  lat: number;
  lng: number;
  rank: number | null; // null = > 20
}

interface LocalPackDashboardProps {
  clientName: string;
  keyword: string;
  gridPoints: GridPointMetric[];
  cwvMetrics: {
    lcpMs: number;
    inpMs: number;
    cls: number;
    hasCnpjFooter: boolean;
    noBackButtonHijack: boolean;
    lpExperienceAds: 'ABOVE_AVERAGE' | 'AVERAGE' | 'BELOW_AVERAGE';
  };
}

function getRankBadgeColor(rank: number | null): string {
  if (rank === null) return 'bg-white/[0.04] text-slate-400 border-white/[0.06]';
  if (rank <= 3) return 'bg-teal-500/20 text-teal-200 border-teal-500/50 shadow-sm shadow-teal-500/20';
  if (rank <= 10) return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
  return 'bg-rose-500/20 text-rose-300 border-rose-500/50';
}

export function LocalPackAndAuditDashboard({
  clientName,
  keyword,
  gridPoints,
  cwvMetrics,
}: LocalPackDashboardProps) {
  const top3Count = gridPoints.filter((p) => p.rank !== null && p.rank <= 3).length;
  const shareOfLocalVoice = Math.round((top3Count / (gridPoints.length || 1)) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-[#0f1118]/85 backdrop-blur-md text-slate-100 rounded-2xl border border-white/[0.08]">
      {/* Coluna Esquerda: Matriz 5x5 Local 3-Pack */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-[#08090e]/70 p-5 rounded-xl border border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold">
              Local 3-Pack Geo-Grid (Raio 1.5km)
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {clientName} — <span className="text-slate-400 font-normal">&ldquo;{keyword}&rdquo;</span>
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Domínio do 3-Pack (SoLV)</span>
            <span className="text-2xl font-black text-teal-300">{shareOfLocalVoice}%</span>
          </div>
        </div>

        {/* Grid 5x5 */}
        <div className="grid grid-cols-5 gap-3 my-auto py-4">
          {gridPoints.map((point) => (
            <div
              key={point.id}
              title={`Coord: ${point.lat}, ${point.lng}`}
              className={`flex flex-col items-center justify-center h-16 rounded-lg border transition-transform hover:scale-105 cursor-pointer ${getRankBadgeColor(
                point.rank
              )}`}
            >
              <span className="text-xs opacity-75 flex items-center gap-0.5">
                <MapPin className="w-3 h-3" /> #{point.row + 1}.{point.col + 1}
              </span>
              <span className="text-lg font-bold">
                {point.rank !== null ? `${point.rank}º` : '20+'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/[0.06]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" /> Top 1–3 (Local Pack)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Posição 4–10
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" /> Posição 11+
          </span>
        </div>
      </div>

      {/* Coluna Direita: Auditoria Core Web Vitals, Quality Score & Anti-Spam */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-[#08090e]/70 p-5 rounded-xl border border-white/[0.06] space-y-5">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Core Web Vitals & Google Ads Quality
          </span>
          <h4 className="text-base font-semibold text-white mt-1">Saúde Técnica da Landing Page</h4>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs text-slate-400 block">LCP (Hero)</span>
            <span className={`text-lg font-bold ${cwvMetrics.lcpMs <= 2500 ? 'text-teal-300' : 'text-rose-400'}`}>
              {(cwvMetrics.lcpMs / 1000).toFixed(2)}s
            </span>
            <span className="text-[11px] text-slate-500 block">Meta: até 2.5s</span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs text-slate-400 block">INP (JS Form)</span>
            <span className={`text-lg font-bold ${cwvMetrics.inpMs <= 200 ? 'text-teal-300' : 'text-amber-400'}`}>
              {cwvMetrics.inpMs}ms
            </span>
            <span className="text-[11px] text-slate-500 block">Meta: até 200ms</span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs text-slate-400 block">CLS (Layout)</span>
            <span className={`text-lg font-bold ${cwvMetrics.cls <= 0.1 ? 'text-teal-300' : 'text-rose-400'}`}>
              {cwvMetrics.cls.toFixed(3)}
            </span>
            <span className="text-[11px] text-slate-500 block">Meta: até 0.10</span>
          </div>
        </div>

        {/* Checklist Anti-Spam & Google Ads LP Experience */}
        <div className="space-y-2.5 pt-2 border-t border-white/[0.06] text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Transparência Rodapé (CNPJ + Políticas)
            </span>
            {cwvMetrics.hasCnpjFooter ? (
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Sem Back-Button Hijacking / Cloaking
            </span>
            {cwvMetrics.noBackButtonHijack ? (
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">Google Ads LP Experience:</span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
              {cwvMetrics.lpExperienceAds}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
