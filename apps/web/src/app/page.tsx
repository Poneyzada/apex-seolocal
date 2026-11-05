'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { ExecutiveOverview } from '@/components/modules/overview';
import { Module1GbpFastTrack } from '@/components/modules/module1-gbp';
import { Module2Auditor } from '@/components/modules/module2-auditor';
import { Module3TopicalAndUgc } from '@/components/modules/module3-topical';
import { Module4GtmAutomation } from '@/components/modules/module4-gtm';
import { Module5GeoGrid } from '@/components/modules/module5-geogrid';
import { Module6ClientPortal } from '@/components/modules/module6-portal';
import { ModulePipelineAndReviewBooster } from '@/components/modules/module7-crm';
import { ClientTenant, ActiveModule } from '@/types';
import {
  Plus,
  X,
  Building,
  Check,
  LayoutDashboard,
  Flame,
  BookOpenCheck,
  MapPin,
  Users,
  Menu
} from 'lucide-react';

const INITIAL_CLIENTS: ClientTenant[] = [
  {
    id: 'client-1',
    name: 'Clínica Odontológica Sorriso Real',
    corporateName: 'Sorriso Real Odontologia Especializada LTDA',
    cnpj: '34.892.109/0001-44',
    phone: '+5521998877665',
    email: 'contato@sorrisoreal.com.br',
    website: 'https://sorrisoreal.com.br',
    primaryService: 'Implante Dentário & Protocolo',
    neighborhood: 'Barra da Tijuca',
    city: 'Rio de Janeiro',
    state: 'RJ',
    latitude: -23.000371,
    longitude: -43.365894,
    primaryKeyword: 'implante dentario barra da tijuca',
    gbpStatus: 'verified',
    rating: 4.9,
    totalReviews: 128,
  },
  {
    id: 'client-2',
    name: 'Silveira & Associados Advocacia',
    corporateName: 'Silveira e Associados Sociedade de Advogados',
    cnpj: '18.442.901/0001-82',
    phone: '+5511987654321',
    email: 'contato@silveiraadv.com.br',
    website: 'https://silveiraadv.com.br',
    primaryService: 'Direito do Trabalho & Empresarial',
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    state: 'SP',
    latitude: -23.583921,
    longitude: -46.678412,
    primaryKeyword: 'advogado trabalhista itaim bibi',
    gbpStatus: 'verified',
    rating: 4.8,
    totalReviews: 94,
  },
  {
    id: 'client-3',
    name: 'HidroExpress Desentupidora 24h',
    corporateName: 'HidroExpress Servicos de Saneamento LTDA',
    cnpj: '26.113.884/0001-09',
    phone: '+5531991234567',
    email: 'urgencia@hidroexpress.com.br',
    website: 'https://hidroexpress.com.br',
    primaryService: 'Desentupimento e Hidrojateamento 24h',
    neighborhood: 'Savassi',
    city: 'Belo Horizonte',
    state: 'MG',
    latitude: -19.938612,
    longitude: -43.934167,
    primaryKeyword: 'desentupidora 24 horas savassi bh',
    gbpStatus: 'warming_up',
    rating: 4.7,
    totalReviews: 62,
  },
];

export default function DashboardPage() {
  const [clients, setClients] = useState<ClientTenant[]>(INITIAL_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<ClientTenant>(INITIAL_CLIENTS[0]);
  const [currentModule, setCurrentModule] = useState<ActiveModule>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // New Client Form State
  const [newClientName, setNewClientName] = useState('');
  const [newCnpj, setNewCnpj] = useState('');
  const [newService, setNewService] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newCnpj) return;

    const newTenant: ClientTenant = {
      id: `client-${Date.now()}`,
      name: newClientName,
      corporateName: `${newClientName} LTDA`,
      cnpj: newCnpj,
      phone: '+5511999998888',
      email: `contato@${newClientName.toLowerCase().replace(/\s+/g, '')}.com.br`,
      website: `https://${newClientName.toLowerCase().replace(/\s+/g, '')}.com.br`,
      primaryService: newService || 'Serviços Especializados',
      neighborhood: newNeighborhood || 'Centro',
      city: newCity || 'São Paulo',
      state: 'SP',
      latitude: -23.55052,
      longitude: -46.633308,
      primaryKeyword: newKeyword || `${newService} ${newNeighborhood}`,
      gbpStatus: 'warming_up',
      rating: 5.0,
      totalReviews: 1,
    };

    setClients((prev) => [newTenant, ...prev]);
    setSelectedClient(newTenant);
    setShowAddModal(false);
    setNewClientName('');
    setNewCnpj('');
    setNewService('');
    setNewNeighborhood('');
    setNewCity('');
    setNewKeyword('');
  };

  return (
    <div className="flex min-h-screen bg-transparent text-slate-100 relative">
      {/* Sidebar de Navegação dos Módulos (Desktop + Drawer Mobile) */}
      <Sidebar
        currentModule={currentModule}
        onSelectModule={(mod) => setCurrentModule(mod)}
        clientCount={clients.length}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          clients={clients}
          selectedClient={selectedClient}
          onSelectClient={(c) => setSelectedClient(c)}
          onAddClient={() => setShowAddModal(true)}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        <main className="flex-1 p-3.5 sm:p-5 lg:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-8">
          {currentModule === 'overview' && (
            <ExecutiveOverview
              client={selectedClient}
              onNavigate={(mod) => setCurrentModule(mod)}
            />
          )}

          {currentModule === 'gbp' && (
            <Module1GbpFastTrack client={selectedClient} />
          )}

          {currentModule === 'auditor' && (
            <Module2Auditor client={selectedClient} />
          )}

          {currentModule === 'topical' && (
            <Module3TopicalAndUgc client={selectedClient} />
          )}

          {currentModule === 'gtm' && (
            <Module4GtmAutomation client={selectedClient} />
          )}

          {currentModule === 'geogrid' && (
            <Module5GeoGrid client={selectedClient} />
          )}

          {currentModule === 'crm' && (
            <ModulePipelineAndReviewBooster client={selectedClient} />
          )}

          {currentModule === 'portal' && (
            <Module6ClientPortal client={selectedClient} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (PWA Style - Fixo na base em celulares e tablets) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e15]/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-2 flex items-center justify-around select-none">
        <button
          onClick={() => setCurrentModule('overview')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
            currentModule === 'overview' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] leading-none">Início</span>
        </button>

        <button
          onClick={() => setCurrentModule('gbp')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
            currentModule === 'gbp' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span className="text-[10px] leading-none">GBP</span>
        </button>

        <button
          onClick={() => setCurrentModule('topical')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
            currentModule === 'topical' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpenCheck className="w-5 h-5" />
          <span className="text-[10px] leading-none">GSC/Blog</span>
        </button>

        <button
          onClick={() => setCurrentModule('geogrid')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
            currentModule === 'geogrid' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] leading-none">3-Pack</span>
        </button>

        <button
          onClick={() => setCurrentModule('crm')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
            currentModule === 'crm' ? 'text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] leading-none">CRM</span>
        </button>

        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex flex-col items-center gap-1 p-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Menu className="w-5 h-5 text-teal-300" />
          <span className="text-[10px] leading-none">Módulos</span>
        </button>
      </nav>

      {/* Modal Adicionar Cliente */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0f121a] border border-white/[0.1] rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative animate-fadeIn max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-300 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Cadastrar Nova Empresa Local</h3>
                <p className="text-xs text-slate-400">Novo tenant multi-tenant com isolamento RLS</p>
              </div>
            </div>

            <form onSubmit={handleAddClientSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nome Fantasia da Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Auto Mecânica Pinheiros"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">CNPJ</label>
                <input
                  type="text"
                  required
                  placeholder="00.000.000/0001-00"
                  value={newCnpj}
                  onChange={(e) => setNewCnpj(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Serviço Principal</label>
                  <input
                    type="text"
                    placeholder="Ex: Troca de Óleo e Freios"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Palavra-Chave Foco</label>
                  <input
                    type="text"
                    placeholder="Ex: mecanica pinheiros sp"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Bairro</label>
                  <input
                    type="text"
                    placeholder="Ex: Pinheiros"
                    value={newNeighborhood}
                    onChange={(e) => setNewNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Cidade</label>
                  <input
                    type="text"
                    placeholder="Ex: São Paulo"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Salvar e Ativar Empresa no Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
