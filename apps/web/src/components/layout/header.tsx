'use client';

import React from 'react';
import { Building2, ChevronDown, Check, ShieldCheck, Activity, Bell, Plus, Menu } from 'lucide-react';
import { ClientTenant } from '@/types';

interface HeaderProps {
  clients: ClientTenant[];
  selectedClient: ClientTenant;
  onSelectClient: (client: ClientTenant) => void;
  onAddClient: () => void;
  onToggleMobileSidebar?: () => void;
}

export function Header({
  clients,
  selectedClient,
  onSelectClient,
  onAddClient,
  onToggleMobileSidebar,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#0c0e15]/80 backdrop-blur-xl px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Hamburger (Mobile) + Tenant Selector */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {/* Botão Hamburger apenas no Mobile */}
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] transition-colors flex-shrink-0"
            aria-label="Abrir Menu de Módulos"
          >
            <Menu className="w-5 h-5 text-teal-400" />
          </button>
        )}

        {/* Tenant Selector */}
        <div className="relative min-w-0">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] transition-all text-left shadow-sm max-w-[160px] xs:max-w-[210px] sm:max-w-xs"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight truncate block">
                  {selectedClient.name}
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 flex-shrink-0">
                  {selectedClient.city}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block truncate">
                {selectedClient.cnpj}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 sm:ml-1 flex-shrink-0" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 sm:w-80 rounded-xl bg-[#0f121a] border border-white/[0.1] shadow-2xl p-2 z-50 backdrop-blur-xl">
              <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Clientes Gerenciados ({clients.length})
              </div>
              <div className="space-y-1 my-1 max-h-60 overflow-y-auto">
                {clients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectClient(c);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors ${
                      c.id === selectedClient.id
                        ? 'bg-teal-500/15 text-teal-200 border border-teal-500/30'
                        : 'hover:bg-white/[0.04] text-slate-200'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {c.primaryService} • {c.neighborhood}, {c.city}
                      </p>
                    </div>
                    {c.id === selectedClient.id && (
                      <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onAddClient();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 text-xs font-semibold transition-all border border-teal-500/30"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Nova Empresa Local
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Indicators (Ocultos em telas pequenas para não poluir) */}
        <div className="hidden xl:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
            <span className="font-medium text-teal-300">FastAPI Engine:</span>
            <span className="text-slate-400 font-mono">Port 8000</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>RLS Multi-Tenant: <strong className="text-teal-300">Isolado</strong></span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          onClick={onAddClient}
          className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Novo Cliente</span>
        </button>

        <div className="hidden sm:flex w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] items-center justify-center text-slate-300 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
        </div>

        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-white/[0.08]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-400 to-amber-400 flex items-center justify-center text-slate-950 font-extrabold text-xs shadow-sm">
            AP
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-white leading-none">Apex Agency HQ</p>
            <p className="text-[10px] text-teal-400 font-medium">Enterprise Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
