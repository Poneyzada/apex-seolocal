'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  PhoneCall,
  Navigation,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Calendar,
  ShieldCheck,
  Building,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ClientTenant } from '@/types';

interface Module6Props {
  client: ClientTenant;
}

export function Module6ClientPortal({ client }: Module6Props) {
  const [period, setPeriod] = useState<'30d' | '90d' | '12m'>('30d');

  const stats = {
    totalCalls: 142,
    routeRequests: 89,
    whatsappLeads: 215,
    estimatedRevenue: 'R$ 84.500,00',
    adSpend: 'R$ 3.800,00',
    costPerLead: 'R$ 8,52',
    roiMultiplier: '22.2x',
  };

  return (
    <div className="space-y-6">
      {/* Top Banner White-Label Custom Domain Preview */}
      <div className="p-4 rounded-xl bg-[#0f121a]/85 backdrop-blur-md border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          <span>Portal do Cliente Ativo em:</span>
          <strong className="text-teal-300 font-mono">
            portal.{client.website.replace(/^https?:\/\//, '')}
          </strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]">
            White-Label: Powered by Apex Oculto
          </span>
          <button className="px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 font-semibold flex items-center gap-1 border border-teal-500/30">
            <Share2 className="w-3.5 h-3.5" /> Compartilhar Link do Cliente
          </button>
        </div>
      </div>

      {/* Header do Portal com Identidade Visual Limpa */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0f121b]/90 via-[#131722]/80 to-[#0e2220]/75 border border-white/[0.08] shadow-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-black text-xl shadow-inner">
            {client.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">{client.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-[10px] font-bold border border-teal-500/20">
                Relatório de Performance
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Resultados consolidados de Chamadas Telefônicas, Rotas no Google Maps e Mensagens de WhatsApp.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/[0.08] text-xs self-start md:self-auto">
          {(['30d', '90d', '12m'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                period === p
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p === '30d' ? 'Últimos 30 Dias' : p === '90d' ? 'Últimos 90 Dias' : 'Ano Atual'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de ROI & Métricas Financeiras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: ROI Multiplier */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-teal-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Retorno sobre Investimento (ROI)</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-teal-300">{stats.roiMultiplier}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Estimativa baseada em ticket médio do segmento</p>
        </div>

        {/* Card 2: Receita Gerada */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Receita Estimada de Leads</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">{stats.estimatedRevenue}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Conversão média de 35% de fechamento</p>
        </div>

        {/* Card 3: Custo por Lead */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Custo por Lead Qualificado</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-300 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">{stats.costPerLead}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">446 contatos totais no período</p>
        </div>

        {/* Card 4: Investimento em Tráfego Local */}
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Investimento em Google Ads</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">{stats.adSpend}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Quality Score Médio: 9.4/10</p>
        </div>
      </div>

      {/* Origem das Conversões Locais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-500/15 text-teal-300 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Ligações Telefônicas Diretas</span>
            <p className="text-2xl font-bold text-white mt-0.5">{stats.totalCalls}</p>
            <span className="text-[10px] text-teal-300 font-medium">Origem: Google Maps & LP</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center flex-shrink-0">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Solicitações de Rota (GPS)</span>
            <p className="text-2xl font-bold text-white mt-0.5">{stats.routeRequests}</p>
            <span className="text-[10px] text-cyan-300 font-medium">Clientes se deslocando ao local</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Conversas WhatsApp Iniciadas</span>
            <p className="text-2xl font-bold text-white mt-0.5">{stats.whatsappLeads}</p>
            <span className="text-[10px] text-purple-300 font-medium">Enhanced Conversions rastreadas</span>
          </div>
        </div>
      </div>

      {/* Histórico Recente de Ocorrências */}
      <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          Últimas Interações Registradas em Tempo Real
        </h3>

        <div className="space-y-2 text-xs">
          {[
            {
              type: 'WhatsApp Click',
              time: 'Há 12 minutos',
              location: `${client.neighborhood}, ${client.city}`,
              channel: 'Google Ads (Campanha Local 3-Pack)',
            },
            {
              type: 'Ligação Telefônica',
              time: 'Há 38 minutos',
              location: `${client.city}`,
              channel: 'Google Maps Profile (Botão Ligar)',
            },
            {
              type: 'Solicitação de Rota',
              time: 'Há 1 hora',
              location: `${client.neighborhood}`,
              channel: 'Waze / Google Maps Navigation',
            },
            {
              type: 'Formulário de Pré-Agendamento',
              time: 'Há 2 horas',
              location: `${client.neighborhood}`,
              channel: 'Landing Page Hero 300px Form',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <div>
                  <p className="font-semibold text-white">{item.type}</p>
                  <p className="text-[11px] text-slate-400">{item.channel}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[11px] block">{item.time}</span>
                <span className="text-slate-500 text-[10px]">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
