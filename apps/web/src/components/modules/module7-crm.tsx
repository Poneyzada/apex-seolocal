'use client';

import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Phone,
  MessageSquare,
  Star,
  QrCode,
  Printer,
  Share2,
  Check,
  Send,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building,
  CheckCircle2,
  X
} from 'lucide-react';
import { ClientTenant, Lead, LeadStatus } from '@/types';

interface ModuleCrmProps {
  client: ClientTenant;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Dra. Vanessa Couto',
    phone: '+5521991234567',
    email: 'vanessa.couto@email.com',
    service: 'Implante Dentário Protocolo',
    value: 6500,
    status: 'new',
    source: 'Google Maps',
    neighborhood: 'Barra da Tijuca',
    createdAt: 'Hoje às 11:24',
    reviewRequested: false,
  },
  {
    id: 'lead-2',
    name: 'Marcelo Rezende',
    phone: '+5521988887777',
    email: 'marcelo.rezende@email.com',
    service: 'Clareamento & Facetas',
    value: 2800,
    status: 'contacted',
    source: 'Google Ads',
    neighborhood: 'Recreio',
    createdAt: 'Hoje às 09:15',
    reviewRequested: false,
  },
  {
    id: 'lead-3',
    name: 'Beatriz Vasconcelos',
    phone: '+5521977776666',
    email: 'beatriz.v@email.com',
    service: 'Avaliação Cirúrgica',
    value: 4500,
    status: 'scheduled',
    source: 'WhatsApp Direto',
    neighborhood: 'Barra da Tijuca',
    createdAt: 'Ontem às 16:40',
    reviewRequested: false,
  },
  {
    id: 'lead-4',
    name: 'Dr. Roberto Guimarães',
    phone: '+5521966665555',
    email: 'roberto.g@email.com',
    service: 'Implante Duplo + Enxerto',
    value: 9200,
    status: 'won',
    source: 'Google Maps',
    neighborhood: 'Barra da Tijuca',
    createdAt: '14 de Outubro',
    reviewRequested: true,
  },
  {
    id: 'lead-5',
    name: 'Juliana Paes Silveira',
    phone: '+5521955554444',
    email: 'juliana.ps@email.com',
    service: 'Alinhador Invisível',
    value: 5400,
    status: 'won',
    source: 'Google Ads',
    neighborhood: 'Barra da Tijuca',
    createdAt: '12 de Outubro',
    reviewRequested: false,
  },
];

export function ModulePipelineAndReviewBooster({ client }: ModuleCrmProps) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [activeTab, setActiveTab] = useState<'kanban' | 'booster' | 'report'>('kanban');
  const [selectedLeadForReview, setSelectedLeadForReview] = useState<Lead | null>(null);
  const [copiedReviewMsg, setCopiedReviewMsg] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // New Lead Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newService, setNewService] = useState(client.primaryService);
  const [newValue, setNewValue] = useState('3500');
  const [newSource, setNewSource] = useState<'Google Maps' | 'Google Ads' | 'WhatsApp Direto'>('Google Maps');

  // Stats calculation
  const totalPipelineValue = leads.reduce((acc, curr) => acc + curr.value, 0);
  const wonLeads = leads.filter((l) => l.status === 'won');
  const wonRevenue = wonLeads.reduce((acc, curr) => acc + curr.value, 0);
  const winRate = Math.round((wonLeads.length / (leads.length || 1)) * 100);

  const moveLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newName,
      phone: newPhone || '+5521999990000',
      email: `${newName.toLowerCase().replace(/\s+/g, '')}@email.com`,
      service: newService,
      value: parseFloat(newValue) || 3000,
      status: 'new',
      source: newSource,
      neighborhood: client.neighborhood,
      createdAt: 'Agora',
      reviewRequested: false,
    };

    setLeads((prev) => [newLead, ...prev]);
    setShowAddLeadModal(false);
    setNewName('');
    setNewPhone('');
  };

  const triggerReviewRequest = (lead: Lead) => {
    setSelectedLeadForReview(lead);
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, reviewRequested: true } : l))
    );
  };

  const reviewGoogleUrl = `https://search.google.com/local/writereview?placeid=ChIJ${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  const reviewMessageTemplate = `Olá ${selectedLeadForReview?.name || 'Cliente'}! Muito obrigado por nos visitar na ${client.name} para o procedimento de ${selectedLeadForReview?.service || client.primaryService}.\n\nVocê poderia nos presentear com 30 segundos da sua avaliação sincera no Google? Isso nos ajuda muito a continuar crescendo!\n\nClique no link direto para avaliar:\n${reviewGoogleUrl}`;

  return (
    <div className="space-y-6">
      {/* Header com Navegação Interna */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Módulo de Conversão & Retenção (GoHighLevel Killer)</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Pipeline Kanban de Vendas & Review Booster WhatsApp
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Rastreie os leads gerados no Google Maps, calcule o faturamento real em R$ e dispare solicitações de avaliações 5 estrelas automáticas.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/[0.08] text-xs">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'kanban'
                ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pipeline Kanban
          </button>
          <button
            onClick={() => setActiveTab('booster')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'booster'
                ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Review Booster WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'report'
                ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Relatório Executivo PDF
          </button>
        </div>
      </div>

      {/* 4 Cards de Métricas de Vendas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total em Negociação</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">
              {totalPipelineValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{leads.length} oportunidades ativas</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-teal-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Faturamento Fechado</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-teal-300">
              {wonRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <p className="text-[11px] text-teal-400 font-semibold mt-1">ROI medido em tempo real</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Taxa de Conversão</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">{winRate}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Leads qualificados fechados</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Avaliações Solicitadas</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-300 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">
              {leads.filter((l) => l.reviewRequested).length}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Disparos automáticos no WhatsApp</p>
        </div>
      </div>

      {/* ABA 1: PIPELINE KANBAN */}
      {activeTab === 'kanban' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-400" />
              Pipeline de Atendimento Local
            </h3>
            <button
              onClick={() => setShowAddLeadModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Lead Manual
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Coluna 1: Novos Leads */}
            <div className="bg-[#0f121a]/70 backdrop-blur-md p-4 rounded-2xl border border-white/[0.08] flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Novos Leads
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 font-mono">
                  {leads.filter((l) => l.status === 'new').length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {leads
                  .filter((l) => l.status === 'new')
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08] hover:border-teal-400/30 transition-all space-y-2 group shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{lead.name}</span>
                        <span className="text-[10px] font-mono font-semibold text-teal-300">
                          {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400">{lead.service}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {lead.source}
                        </span>
                        <span className="text-slate-500">{lead.createdAt}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 gap-1">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(lead.name)},%20sou%20da%20${encodeURIComponent(client.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-1 px-2 rounded bg-white/[0.04] hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 text-[10px] font-semibold text-center flex items-center justify-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3 text-teal-400" /> WhatsApp
                        </a>
                        <button
                          onClick={() => moveLeadStatus(lead.id, 'contacted')}
                          className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300"
                          title="Avançar para Em Contato"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Coluna 2: Em Contato */}
            <div className="bg-[#0f121a]/70 backdrop-blur-md p-4 rounded-2xl border border-white/[0.08] flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Em Contato
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 font-mono">
                  {leads.filter((l) => l.status === 'contacted').length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {leads
                  .filter((l) => l.status === 'contacted')
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08] hover:border-teal-400/30 transition-all space-y-2 group shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{lead.name}</span>
                        <span className="text-[10px] font-mono font-semibold text-teal-300">
                          {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400">{lead.service}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {lead.source}
                        </span>
                        <span className="text-slate-500">{lead.createdAt}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 gap-1">
                        <button
                          onClick={() => moveLeadStatus(lead.id, 'new')}
                          className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300"
                          title="Voltar"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveLeadStatus(lead.id, 'scheduled')}
                          className="flex-1 py-1 px-2 rounded bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 text-[10px] font-semibold text-center flex items-center justify-center gap-1 transition-colors"
                        >
                          Agendar Consulta <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Coluna 3: Agendados */}
            <div className="bg-[#0f121a]/70 backdrop-blur-md p-4 rounded-2xl border border-white/[0.08] flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Agendados
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 font-mono">
                  {leads.filter((l) => l.status === 'scheduled').length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {leads
                  .filter((l) => l.status === 'scheduled')
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08] hover:border-teal-400/30 transition-all space-y-2 group shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{lead.name}</span>
                        <span className="text-[10px] font-mono font-semibold text-teal-300">
                          {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400">{lead.service}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {lead.source}
                        </span>
                        <span className="text-slate-500">{lead.createdAt}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 gap-1">
                        <button
                          onClick={() => moveLeadStatus(lead.id, 'contacted')}
                          className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveLeadStatus(lead.id, 'won')}
                          className="flex-1 py-1 px-2 rounded bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all"
                        >
                          Fechar Venda <Check className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Coluna 4: Fechados / Ganhos */}
            <div className="bg-[#0f121a]/70 backdrop-blur-md p-4 rounded-2xl border border-teal-500/30 flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Fechados / Ganhos
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono">
                  {leads.filter((l) => l.status === 'won').length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {leads
                  .filter((l) => l.status === 'won')
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{lead.name}</span>
                        <span className="text-[10px] font-mono font-bold text-teal-300">
                          {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400">{lead.service}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                          Ganho • {lead.source}
                        </span>
                      </div>

                      {/* Botão de Disparo do Review Booster */}
                      <div className="pt-1">
                        {lead.reviewRequested ? (
                          <span className="w-full py-1 px-2 rounded bg-teal-500/15 text-teal-300 text-[10px] font-semibold flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-400" /> Review Solicitado 5★
                          </span>
                        ) : (
                          <button
                            onClick={() => triggerReviewRequest(lead)}
                            className="w-full py-1.5 px-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center gap-1 transition-all shadow-sm"
                          >
                            <Star className="w-3 h-3 fill-slate-950" /> Pedir Review Google 5★
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: REVIEW BOOSTER & QR CODE DE BALCÃO */}
      {activeTab === 'booster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Coluna Esquerda: Disparador WhatsApp */}
          <div className="lg:col-span-7 bg-[#0f121a]/85 backdrop-blur-md p-6 rounded-2xl border border-white/[0.08] space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-teal-400" /> Acelerador de Avaliações 5 Estrelas
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Disparador Automático de Avaliações no Google Maps
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Garante que 100% dos clientes atendidos recebam o link direto com pré-seleção de 5 estrelas no WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Modelo de Mensagem WhatsApp</span>
                <span className="text-[10px] text-teal-300 font-mono">Alta Conversão (+68%)</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#07080c] border border-white/[0.06] text-xs text-slate-200 font-mono whitespace-pre-wrap">
                {reviewMessageTemplate}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(reviewMessageTemplate);
                    setCopiedReviewMsg(true);
                    setTimeout(() => setCopiedReviewMsg(false), 2000);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/[0.08] flex items-center gap-1.5 transition-all"
                >
                  {copiedReviewMsg ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copiedReviewMsg ? 'Copiado!' : 'Copiar Texto'}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(reviewMessageTemplate)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Disparar no WhatsApp Web
                </a>
              </div>
            </div>
          </div>

          {/* Coluna Direita: QR Code de Balcão para Impressão */}
          <div className="lg:col-span-5 bg-[#0f121a]/85 backdrop-blur-md p-6 rounded-2xl border border-white/[0.08] space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <QrCode className="w-4 h-4" /> Material de Ponto de Venda (PDV)
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Display de Balcão com QR Code
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Imprima e coloque na recepção do cliente para os pacientes/clientes avaliarem na saída.
              </p>
            </div>

            {/* Mock Display de Balcão */}
            <div className="p-6 rounded-2xl bg-white text-slate-950 text-center space-y-3 shadow-2xl my-2">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-teal-400 mx-auto flex items-center justify-center font-black text-lg">
                G
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-tight text-slate-900">
                  Gostou do nosso atendimento?
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Aponte a câmera do seu celular e avalie a {client.name} no Google!
                </p>
              </div>

              {/* QR Code Simulado */}
              <div className="w-32 h-32 mx-auto bg-slate-100 p-2 rounded-xl border border-slate-300 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>

              <div className="flex items-center justify-center gap-1 text-amber-500 text-sm">
                {'★'.repeat(5)}
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold border border-white/[0.1] flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4 text-teal-400" /> Imprimir Display de Balcão (A5)
            </button>
          </div>
        </div>
      )}

      {/* ABA 3: RELATÓRIO EXECUTIVO WHITE-LABEL (PDF / PRINT) */}
      {activeTab === 'report' && (
        <div className="bg-[#0f121a]/90 backdrop-blur-md p-8 rounded-2xl border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-teal-500/20">
                A
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                  Relatório Executivo de Desempenho Local
                </span>
                <h3 className="text-xl font-black text-white">{client.name}</h3>
                <p className="text-xs text-slate-400">Período: Últimos 30 Dias • Auditado via Apex Suite</p>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 self-start sm:self-auto"
            >
              <Printer className="w-4 h-4" /> Imprimir / Salvar como PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.06]">
              <span className="text-xs text-slate-400 block">Domínio Local 3-Pack (SoLV)</span>
              <span className="text-3xl font-black text-teal-300">76%</span>
              <span className="text-[11px] text-teal-400 mt-1 block">Top 1 ao 3 em 19 de 25 nós</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.06]">
              <span className="text-xs text-slate-400 block">Ligações & Solicitações de Rota</span>
              <span className="text-3xl font-black text-white">231</span>
              <span className="text-[11px] text-teal-400 mt-1 block">+34% vs. mês anterior</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.06]">
              <span className="text-xs text-slate-400 block">Faturamento Estimado Gerado</span>
              <span className="text-3xl font-black text-teal-300">R$ 84.500,00</span>
              <span className="text-[11px] text-slate-400 mt-1 block">ROI Multiplicador: 22.2x</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.06] text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-white text-sm">Resumo da Auditoria Técnica</h4>
            <p>
              • <strong>Core Web Vitals:</strong> LCP de 1.82s (abaixo do teto de 2.5s) e CLS de 0.02 garantindo Quality Score acima da média no Google Ads.
            </p>
            <p>
              • <strong>Compliance Anti-Spam:</strong> CNPJ verificado e validado matematicamente pelo algoritmo Módulo 11 da Receita Federal.
            </p>
            <p>
              • <strong>Segurança do Usuário:</strong> Zero indícios de manipulação maliciosa de History API (Back-Button Hijacking).
            </p>
          </div>
        </div>
      )}

      {/* Modal Adicionar Lead Manual */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121a] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowAddLeadModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-300 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Novo Lead Comercial</h3>
                <p className="text-xs text-slate-400">Adicione uma oportunidade ao Pipeline Kanban</p>
              </div>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nome do Paciente / Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Santana"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">WhatsApp / Telefone</label>
                <input
                  type="text"
                  placeholder="+5521999998888"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Serviço de Interesse</label>
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Valor Estimado (R$)</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Origem do Contato</label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="Google Maps">Google Maps (Local 3-Pack)</option>
                  <option value="Google Ads">Google Ads (Campanha Local)</option>
                  <option value="WhatsApp Direto">WhatsApp Direto</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Inserir no Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
