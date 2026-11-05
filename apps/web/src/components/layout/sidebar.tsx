'use client';

import React from 'react';
import {
  LayoutDashboard,
  Flame,
  FileSearch,
  BookOpenCheck,
  Cpu,
  MapPin,
  ExternalLink,
  Shield,
  Layers,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';
import { ActiveModule } from '@/types';

interface SidebarProps {
  currentModule: ActiveModule;
  onSelectModule: (mod: ActiveModule) => void;
  clientCount: number;
}

export function Sidebar({ currentModule, onSelectModule, clientCount }: SidebarProps) {
  const menuItems = [
    {
      id: 'overview' as ActiveModule,
      name: 'Visão Geral Executiva',
      badge: 'Geral',
      icon: LayoutDashboard,
      description: 'Painel multi-tenant consolidado',
    },
    {
      id: 'gbp' as ActiveModule,
      name: 'M1: GBP Fast-Track',
      badge: 'EXIF + IA',
      icon: Flame,
      description: 'Aquecimento & Injeção GPS DMS',
    },
    {
      id: 'auditor' as ActiveModule,
      name: 'M2: Auditor de LPs & CWV',
      badge: 'LCP/INP',
      icon: FileSearch,
      description: 'Regra dos 300px & JSON-LD',
    },
    {
      id: 'topical' as ActiveModule,
      name: 'M3: Topical & UGC',
      badge: 'Clusters',
      icon: BookOpenCheck,
      description: 'Autoridade Semântica & Reviews',
    },
    {
      id: 'gtm' as ActiveModule,
      name: 'M4: GTM & Ads 1-Clique',
      badge: 'SHA-256',
      icon: Cpu,
      description: 'Consent Mode v2 & Tracking',
    },
    {
      id: 'geogrid' as ActiveModule,
      name: 'M5: Geo-Grid 3-Pack',
      badge: 'Matriz 5x5',
      icon: MapPin,
      description: 'Monitor de SERP e Mapa de Calor',
    },
    {
      id: 'crm' as ActiveModule,
      name: 'M6: Pipeline & Review Booster',
      badge: 'CRM + WPP',
      icon: Users,
      description: 'Kanban, WhatsApp & QR Code',
    },
    {
      id: 'portal' as ActiveModule,
      name: 'M7: Portal White-Label',
      badge: 'Cliente',
      icon: ExternalLink,
      description: 'Visão limpa de ROI e rotas',
    },
  ];

  return (
    <aside className="w-72 bg-[#0c0e15]/90 backdrop-blur-xl border-r border-white/[0.08] flex flex-col h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25 text-slate-950 font-black text-xl tracking-wider">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">APEX</span>
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-teal-500/15 text-teal-300 font-semibold border border-teal-500/30">
                SEO LOCAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Enterprise Growth Suite</p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Módulos de Dominação</span>
          <span className="text-teal-400 font-mono">7/7 ATIVOS</span>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group relative ${
                isActive
                  ? 'bg-teal-500/15 text-teal-200 border border-teal-500/35 shadow-sm shadow-teal-500/10'
                  : 'text-slate-300 hover:bg-white/[0.04] hover:text-white border border-transparent'
              }`}
            >
              <div
                className={`p-2 rounded-lg mt-0.5 transition-colors ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300'
                    : 'bg-white/[0.05] text-slate-400 group-hover:text-teal-300'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className={`font-semibold text-xs tracking-tight truncate ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {item.name}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium ${
                      isActive
                        ? 'bg-teal-400/20 text-teal-300 border border-teal-400/30'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.description}</p>
              </div>

              {isActive && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-gradient-to-b from-teal-400 to-emerald-400 shadow-sm shadow-teal-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Agency Status Footer */}
      <div className="p-4 border-t border-white/[0.08] bg-[#08090e]/80">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Agency Scale Plan</p>
              <p className="text-[10px] text-slate-400">{clientCount} Clientes Conectados</p>
            </div>
          </div>
          <span className="text-xs text-teal-300 font-semibold bg-teal-500/10 px-2 py-1 rounded-md border border-teal-500/25">
            RLS Ativo
          </span>
        </div>
      </div>
    </aside>
  );
}
