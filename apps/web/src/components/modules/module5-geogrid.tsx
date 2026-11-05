'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Flame,
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  Share2,
  Compass,
  Trophy,
  ExternalLink
} from 'lucide-react';
import { ClientTenant } from '@/types';
import { GridPointMetric } from '@/components/seo/local-pack-grid-card';

interface Module5Props {
  client: ClientTenant;
}

export function Module5GeoGrid({ client }: Module5Props) {
  const [keyword, setKeyword] = useState(client.primaryKeyword);
  const [stepKm, setStepKm] = useState(1.5);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<GridPointMetric | null>(null);

  // Gera 25 pontos (5x5) dinamicamente baseados na coordenada do cliente
  const [gridPoints, setGridPoints] = useState<GridPointMetric[]>(() => {
    return Array.from({ length: 25 }, (_, idx) => {
      const row = Math.floor(idx / 5);
      const col = idx % 5;
      const dist = Math.abs(row - 2) + Math.abs(col - 2);
      let rank: number | null = 1;
      if (dist === 0) rank = 1;
      else if (dist === 1) rank = 2;
      else if (dist === 2) rank = 3;
      else if (dist === 3) rank = Math.random() > 0.3 ? 5 : 8;
      else rank = Math.random() > 0.4 ? 12 : null;

      return {
        id: `grid-${idx}`,
        row,
        col,
        lat: Number((client.latitude + (2 - row) * 0.0135).toFixed(6)),
        lng: Number((client.longitude + (col - 2) * 0.014).toFixed(6)),
        rank,
      };
    });
  });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setGridPoints((prev) =>
        prev.map((pt) => {
          const dist = Math.abs(pt.row - 2) + Math.abs(pt.col - 2);
          let rank: number | null = 1;
          if (dist === 0) rank = 1;
          else if (dist === 1) rank = Math.random() > 0.2 ? 2 : 1;
          else if (dist === 2) rank = 3;
          else if (dist === 3) rank = Math.random() > 0.5 ? 4 : 7;
          else rank = Math.random() > 0.6 ? 11 : null;
          return { ...pt, rank };
        })
      );
      setIsScanning(false);
    }, 1200);
  };

  const top3Count = gridPoints.filter((p) => p.rank !== null && p.rank <= 3).length;
  const shareOfVoice = Math.round((top3Count / gridPoints.length) * 100);

  const getRankBadgeColor = (rank: number | null) => {
    if (rank === null) return 'bg-white/[0.04] text-slate-400 border-white/[0.06]';
    if (rank <= 3) return 'bg-teal-500/20 text-teal-200 border-teal-500/50 shadow-md shadow-teal-500/20';
    if (rank <= 10) return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
    return 'bg-rose-500/20 text-rose-300 border-rose-500/50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Módulo 5: Monitor Local 3-Pack & Mapa de Calor SERP</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Geo-Grid 5x5: Varredura de Posicionamento Geográfico
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simula buscas georreferenciadas via UULE em uma malha 5x5 de coordenadas para mapear o raio exato de visibilidade no Google Maps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-white/[0.08] text-white w-56 focus:outline-none focus:border-teal-400"
          />
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Varrendo SERP...' : 'Executar Varredura'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Matriz 5x5 Interativa */}
        <div className="lg:col-span-8 bg-[#0f121a]/85 backdrop-blur-md p-6 rounded-2xl border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold">
                Matriz 5x5 • Raio de {stepKm * 2} km coberto
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {client.name} — <span className="text-slate-400 font-normal">&ldquo;{keyword}&rdquo;</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">SoLV (Share of Local Voice)</span>
              <span className="text-2xl font-black text-teal-300">{shareOfVoice}%</span>
            </div>
          </div>

          {/* Grid Interativo */}
          <div className="grid grid-cols-5 gap-3 py-4">
            {gridPoints.map((point) => (
              <div
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                className={`flex flex-col items-center justify-center h-20 rounded-xl border transition-all cursor-pointer transform hover:scale-105 ${getRankBadgeColor(
                  point.rank
                )} ${selectedPoint?.id === point.id ? 'ring-2 ring-teal-300 ring-offset-2 ring-offset-slate-950' : ''}`}
              >
                <span className="text-[10px] opacity-75 flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" /> P{point.row + 1}.{point.col + 1}
                </span>
                <span className="text-xl font-extrabold mt-0.5">
                  {point.rank !== null ? `${point.rank}º` : '20+'}
                </span>
                {point.row === 2 && point.col === 2 && (
                  <span className="text-[9px] font-bold text-teal-300 uppercase tracking-tighter">
                    Sede
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/[0.08]">
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

        {/* Coluna Direita: Detalhes do Ponto & Concorrentes */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card Detalhes do Nó Selecionado */}
          <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-400" />
              Nó Geográfico Inspecionado
            </h4>

            {selectedPoint ? (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/90 border border-white/[0.08] font-mono text-slate-300 space-y-1">
                  <div>
                    <strong className="text-slate-400">Coordenadas:</strong> {selectedPoint.lat}, {selectedPoint.lng}
                  </div>
                  <div>
                    <strong className="text-slate-400">Posição Atual:</strong>{' '}
                    <span className="text-teal-300 font-bold">
                      {selectedPoint.rank ? `${selectedPoint.rank}º lugar` : '> 20º (Fora do Pack)'}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-400">Simulação UULE:</strong> lat:{selectedPoint.lat},lng:{selectedPoint.lng},r:500m
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Clique em qualquer ponto do mapa 5x5 para visualizar as coordenadas exatas e o ranking local.
              </p>
            )}
          </div>

          {/* Top 3 Concorrentes Locais */}
          <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Concorrentes no Top 3 do Bairro
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-teal-500/30 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">1. {client.name} (Você)</p>
                  <p className="text-[10px] text-slate-400">Rating {client.rating} • {client.totalReviews} avaliações</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-200 font-bold font-mono text-[10px]">
                  LÍDER
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/90 border border-white/[0.08] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-300">2. Centro Odonto Premium</p>
                  <p className="text-[10px] text-slate-500">Rating 4.7 • 89 avaliações</p>
                </div>
                <span className="text-slate-400 font-mono text-[10px]">2º</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/90 border border-white/[0.08] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-300">3. Dr. Roberto & Equipe</p>
                  <p className="text-[10px] text-slate-500">Rating 4.6 • 64 avaliações</p>
                </div>
                <span className="text-slate-400 font-mono text-[10px]">3º</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
