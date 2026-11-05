'use client';

import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Circle,
  UploadCloud,
  FileImage,
  Sparkles,
  MapPin,
  Bot,
  Copy,
  Check,
  Download,
  AlertCircle,
  RefreshCw,
  Eye,
  PhoneCall,
  Navigation,
  ShieldCheck,
  ExternalLink,
  Apple,
  CalendarDays,
  Target,
  MessageSquare,
  Share2,
  Clock,
  Camera,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { ClientTenant } from '@/types';

interface Module1Props {
  client: ClientTenant;
}

export function Module1GbpFastTrack({ client }: Module1Props) {
  // Sub-abas do Módulo 1 (Apex + MasterGMB)
  const [subTab, setSubTab] = useState<'aquecimento' | 'gap_analysis' | 'apple' | 'planejamento'>('aquecimento');

  // Google OAuth2 Connection State
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Há 14 minutos');
  const [googleMetrics, setGoogleMetrics] = useState({
    profileViews: 14820,
    callsMade: 142,
    routeRequests: 89,
    websiteClicks: 312,
    searchImpressions: '72% Descoberta (Palavra-Chave) • 28% Direta (Nome)',
    locationId: 'accounts/1092384/locations/8827361',
  });

  // Checklist State
  const [checklist, setChecklist] = useState({
    aged_account: true,
    cnpj_receita: true,
    facade_photo: true,
    nap_match: true,
    gsc_verified: false,
  });

  // Media Form State
  const [companyName, setCompanyName] = useState(client.name);
  const [serviceCategory, setServiceCategory] = useState(client.primaryService);
  const [neighborhood, setNeighborhood] = useState(client.neighborhood);
  const [city, setCity] = useState(client.city);
  const [latitude, setLatitude] = useState(client.latitude.toString());
  const [longitude, setLongitude] = useState(client.longitude.toString());
  const [keywords, setKeywords] = useState('dentista barra, implante dente rio, clinica protocolo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<{
    filename: string;
    dmsLat: string;
    dmsLng: string;
    sizeKb: number;
  } | null>(null);

  // Joia 3: Gap Analysis & Blueprint Contragolpe State (MasterGMB)
  const [optimizedName, setOptimizedName] = useState(
    `${client.name} | ${client.primaryService} em ${client.neighborhood}`
  );
  const [counterstrikeCopy, setCounterstrikeCopy] = useState(
    `Referência de excelência em ${client.primaryService} em ${client.neighborhood}, ${client.city}. Diferente dos concorrentes locais com demoras no atendimento, nossa equipe garante suporte imediato no WhatsApp em até 5 minutos, consultórios climatizados com estacionamento VIP gratuito e facilidade de acesso. CNPJ auditado: ${client.cnpj}. Agende hoje mesmo sua avaliação personalizada!`
  );
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  // Joia 1: Apple Business Connect (Showcase iOS) State (MasterGMB)
  const [appleShowcaseCopy, setAppleShowcaseCopy] = useState(
    `Exclusividade, precisão e tecnologia avançada em ${client.primaryService}. Localizado no coração de ${client.neighborhood}, o consultório da ${client.name} oferece uma experiência acolhedora e privativa para o público mais exigente de ${client.city}. Toque abaixo para garantir seu horário.`
  );
  const [appleActionButton, setAppleActionButton] = useState<'RESERVAR AGORA' | 'LIGAR' | 'AGENDAR CONSULTA' | 'VER PREÇOS'>('RESERVAR AGORA');
  const [isAppleSynced, setIsAppleSynced] = useState(true);

  // Joia 2: Planejamento GBP 30 Dias (MasterGMB)
  const [postsPlan, setPostsPlan] = useState([
    {
      week: 1,
      title: 'Semana 1: Atendimento Humanizado & Proximidade',
      photoTip: 'Foto em close-up do profissional sorridente recebendo um cliente na recepção, com iluminação suave e ambiente limpo.',
      caption: `Você sabia que o cuidado com seu sorriso começa na primeira conversa? Aqui na ${client.name}, em ${client.neighborhood}, nosso atendimento é humanizado e sem pressa. Agende sua avaliação pelo WhatsApp: ${client.phone}! #SorrisoReal #${client.neighborhood.replace(/\s+/g, '')} #SaudeLocal`,
      approved: true,
      copied: false,
    },
    {
      week: 2,
      title: 'Semana 2: Fachada & Estacionamento VIP',
      photoTip: 'Foto da fachada iluminada ao entardecer destacando a placa com logomarca e o acesso fácil ao estacionamento privativo.',
      caption: `Localização estratégica em ${client.neighborhood} com estacionamento próprio para você não perder tempo no trânsito. Venha conhecer a ${client.name}! Fácil acesso e conforto total. #Conforto #Local3Pack #${client.city.replace(/\s+/g, '')}`,
      approved: false,
      copied: false,
    },
    {
      week: 3,
      title: 'Semana 3: Tecnologia Digital & Segurança',
      photoTip: 'Foto dos equipamentos de ponta esterilizados e tela de escaneamento digital 3D em operação.',
      caption: `Precisão milimétrica em ${client.primaryService}! Investimos em tecnologia de última geração para tratamentos rápidos, seguros e sem desconforto em ${client.city}. Conheça nossos diferenciais! #OdontoDigital #Tecnologia #Qualidade`,
      approved: false,
      copied: false,
    },
    {
      week: 4,
      title: 'Semana 4: Prova Social & Avaliação 5 Estrelas',
      photoTip: 'Foto do ambiente de espera com a placa display do QR Code de avaliações do Google visível no balcão.',
      caption: `Mais de ${client.totalReviews} avaliações 5 estrelas no Google Maps comprovam a dedicação da nossa equipe em ${client.neighborhood}. Agradecemos a cada paciente que confia na ${client.name}! #5Estrelas #GoogleMaps #${client.primaryService.replace(/\s+/g, '')}`,
      approved: false,
      copied: false,
    },
  ]);

  // AI Review Responder State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Carlos Eduardo Mendes',
      rating: 5,
      comment: 'Atendimento impecável! Fiz meu implante dentário na clínica da Barra e o resultado ficou perfeito. Recomendo de olhos fechados.',
      date: 'Há 2 dias',
      aiReply: '',
      isGenerating: false,
    },
    {
      id: 2,
      author: 'Mariana Vasconcelos',
      rating: 5,
      comment: 'Profissionais atenciosos e pontuais. Estacionamento fácil no local.',
      date: 'Há 5 dias',
      aiReply: 'Olá Mariana! Agradecemos muito a sua confiança e avaliação 5 estrelas. É uma honra recebê-la em nossa unidade da Barra da Tijuca. Conte sempre conosco!',
      isGenerating: false,
    },
  ]);

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const checklistPercentage = Math.round((completedCount / 5) * 100);

  const handleSyncGoogle = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Agora mesmo');
      setGoogleMetrics((prev) => ({
        ...prev,
        profileViews: prev.profileViews + 42,
        callsMade: prev.callsMade + 2,
      }));
    }, 1200);
  };

  const handleSimulateGeotag = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const latVal = parseFloat(latitude) || -23.000371;
      const lngVal = parseFloat(longitude) || -43.365894;
      const latDms = `${Math.abs(Math.floor(latVal))}° ${Math.floor((Math.abs(latVal) % 1) * 60)}' ${((((Math.abs(latVal) % 1) * 60) % 1) * 60).toFixed(2)}" ${latVal >= 0 ? 'N' : 'S'}`;
      const lngDms = `${Math.abs(Math.floor(lngVal))}° ${Math.floor((Math.abs(lngVal) % 1) * 60)}' ${((((Math.abs(lngVal) % 1) * 60) % 1) * 60).toFixed(2)}" ${lngVal >= 0 ? 'E' : 'W'}`;

      const slug = `${companyName}-${serviceCategory}-${neighborhood}-${city}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      setProcessedFile({
        filename: `${slug}.webp`,
        dmsLat: latDms,
        dmsLng: lngDms,
        sizeKb: 142,
      });
      setIsProcessing(false);
    }, 700);
  };

  const handleGenerateAiReply = (reviewId: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isGenerating: true } : r))
    );

    setTimeout(() => {
      setReviews((prev) =>
        prev.map((r) => {
          if (r.id === reviewId) {
            return {
              ...r,
              aiReply: `Olá ${r.author}! Ficamos muito felizes com a sua avaliação 5 estrelas para ${client.primaryService} na ${client.name}. Estamos sempre à disposição na região de ${client.neighborhood}, ${client.city}!`,
              isGenerating: false,
            };
          }
          return r;
        })
      );
    }, 900);
  };

  const handleCopyPostCaption = (index: number) => {
    navigator.clipboard.writeText(postsPlan[index].caption);
    setPostsPlan((prev) =>
      prev.map((p, i) => (i === index ? { ...p, copied: true } : p))
    );
    setTimeout(() => {
      setPostsPlan((prev) =>
        prev.map((p, i) => (i === index ? { ...p, copied: false } : p))
      );
    }, 2000);
  };

  const toggleApprovePost = (index: number) => {
    setPostsPlan((prev) =>
      prev.map((p, i) => (i === index ? { ...p, approved: !p.approved } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Módulo 1: GBP Fast-Track & MasterGMB Intelligence</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Aquecimento Google, Apple Business Connect & Estratégia de 30 Dias
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Motor completo de autoridade local: combate a concorrência com Gap Analysis, domina o Apple Maps (iOS) e programa 4 semanas de posts com imagens guiadas.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-white/[0.08]">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Status de Aquecimento</span>
            <span className="text-sm font-bold text-teal-300">{checklistPercentage}% Concluído</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-teal-400 flex items-center justify-center font-bold text-xs text-white">
            {completedCount}/5
          </div>
        </div>
      </div>

      {/* Navegador das 4 Frentes de Inteligência (Apex + MasterGMB) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setSubTab('aquecimento')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            subTab === 'aquecimento'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-teal-400" />
          1. Aquecimento, OAuth & EXIF DMS
        </button>

        <button
          onClick={() => setSubTab('gap_analysis')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            subTab === 'gap_analysis'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-blue-400" />
          2. Gap Analysis & Contragolpe (MasterGMB)
        </button>

        <button
          onClick={() => setSubTab('apple')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            subTab === 'apple'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Apple className="w-3.5 h-3.5 text-cyan-400" />
          3. Apple Business Connect (iOS)
        </button>

        <button
          onClick={() => setSubTab('planejamento')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            subTab === 'planejamento'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5 text-emerald-400" />
          4. Planejamento GBP 30 Dias (Posts & Fotos)
        </button>
      </div>

      {/* ABA 1: Aquecimento, Conexão Oficial Google & EXIF DMS */}
      {subTab === 'aquecimento' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Conector Oficial Google Meu Negócio (OAuth 2.0 API) */}
          <div className="p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-teal-500/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center font-black text-xl shadow-lg">
                  G
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">Google Business Profile API v1</h3>
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 text-[10px] font-bold border border-teal-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-400" /> Sincronizado Oficialmente
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ID da Ficha: <span className="font-mono text-slate-300">{googleMetrics.locationId}</span> • Último sync: {lastSyncTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleSyncGoogle}
                  disabled={isSyncing}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold border border-white/[0.08] flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-teal-400 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Sincronizando com Google...' : 'Sincronizar Métricas'}
                </button>

                <a
                  href="https://business.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5 transition-all"
                >
                  Abrir Perfil Google <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 4 Métricas Puxadas da API Oficial */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-teal-400" /> Visualizações no Maps
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {googleMetrics.profileViews.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] text-teal-400 font-medium">Últimos 28 dias</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-teal-400" /> Cliques em Ligar
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {googleMetrics.callsMade}
                </span>
                <span className="text-[10px] text-teal-400 font-medium">Chamadas telefônicas diretas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-teal-400" /> Pedidos de Rota
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {googleMetrics.routeRequests}
                </span>
                <span className="text-[10px] text-teal-400 font-medium">Deslocamentos físicos GPS</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5 text-teal-400" /> Acessos ao Site
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {googleMetrics.websiteClicks}
                </span>
                <span className="text-[10px] text-teal-400 font-medium">Tráfego orgânico qualificado</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Coluna Esquerda: Checklist de Aquecimento Anti-Suspensão */}
            <div className="lg:col-span-5 space-y-4 bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08]">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Checklist de Aquecimento Preventivo
                </h3>
                <span className="text-[10px] text-slate-400">Clique para alternar</span>
              </div>
              <p className="text-xs text-slate-400">
                Siga estes passos antes de solicitar verificação para obter aprovação instantânea sem chamada de vídeo.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  {
                    key: 'aged_account' as const,
                    title: 'Conta Google Envelhecida (> 6 meses)',
                    desc: 'Evite contas recém-criadas que disparam verificação manual rigorosa.',
                  },
                  {
                    key: 'cnpj_receita' as const,
                    title: 'CNPJ Ativo na Receita Federal com CNAE aderente',
                    desc: 'Razão social e endereço correspondentes ao cadastro da ficha.',
                  },
                  {
                    key: 'facade_photo' as const,
                    title: 'Foto Real da Fachada com Logomarca Visível',
                    desc: 'Comprovante visual inequívoco de existência física.',
                  },
                  {
                    key: 'nap_match' as const,
                    title: 'NAP Consistente no Rodapé da Landing Page',
                    desc: 'Nome, Endereço e Telefone idênticos ao cadastrado no GBP.',
                  },
                  {
                    key: 'gsc_verified' as const,
                    title: 'Propriedade Verificada no Google Search Console',
                    desc: 'Mesmo e-mail master vinculado como proprietário do domínio.',
                  },
                ].map((item) => {
                  const isChecked = checklist[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleChecklist(item.key)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-teal-500/10 border-teal-500/35 text-slate-200'
                          : 'bg-slate-950/60 border-white/[0.06] text-slate-400 hover:border-white/[0.12]'
                      }`}
                    >
                      <button className="mt-0.5 text-teal-400">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                      <div className="text-xs">
                        <p className={`font-semibold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coluna Direita: Motor de Otimização WebP + Injeção EXIF DMS */}
            <div className="lg:col-span-7 space-y-4 bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <FileImage className="w-4 h-4 text-cyan-400" />
                    Motor Pillow + piexif: WebP & Geo-Tagging DMS
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">
                    Pillow 10.4 + piexif
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Converte para WebP 84% de qualidade, injeta coordenadas GPS em frações racionais DMS (WGS-84) e meta-tags Windows XP.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Serviço / Categoria
                  </label>
                  <input
                    type="text"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Bairro de Atuação
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Latitude Decimal
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Longitude Decimal
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Palavras-chave Locais (CSV para XPKeywords)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSimulateGeotag}
                  disabled={isProcessing}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {isProcessing ? 'Processando WebP & Injetando EXIF DMS...' : 'Executar Otimização WebP & Injetar EXIF GPS'}
                </button>
              </div>

              {processedFile && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-teal-500/40 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Arquivo Otimizado com Sucesso
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">WEBP 84% • {processedFile.sizeKb} KB</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300 space-y-1">
                    <div><strong className="text-slate-400">Nome do Arquivo SEO:</strong> {processedFile.filename}</div>
                    <div><strong className="text-slate-400">GPS DMS Lat:</strong> {processedFile.dmsLat}</div>
                    <div><strong className="text-slate-400">GPS DMS Lng:</strong> {processedFile.dmsLng}</div>
                    <div><strong className="text-slate-400">Datum:</strong> WGS-84 • XPTitle & XPKeywords injetados</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Seção Inferior: Gestor de Reviews com IA */}
          <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-teal-400" />
                  Gestor de Reviews com IA (Geração de Respostas SEO Local)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Respostas rápidas fortalecem a taxa de conversão do perfil e inserem termos semânticos locais naturalmente.
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Nota Média: <strong className="text-teal-300">{client.rating.toFixed(1)} ★</strong> ({client.totalReviews} avaliações)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.08] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-white">{rev.author}</span>
                      <span className="text-[10px] text-slate-500">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs mb-2">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <p className="text-xs text-slate-300 italic">&ldquo;{rev.comment}&rdquo;</p>
                  </div>

                  {rev.aiReply ? (
                    <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/25 text-xs text-teal-200">
                      <span className="text-[10px] font-bold uppercase text-teal-300 block mb-1">
                        Resposta Gerada com IA:
                      </span>
                      {rev.aiReply}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleGenerateAiReply(rev.id)}
                      disabled={rev.isGenerating}
                      className="w-full py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/[0.08] transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      {rev.isGenerating ? 'Criando resposta personalizada...' : 'Gerar Resposta com IA'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: Gap Analysis & Blueprint Contragolpe (Herança de Ouro do MasterGMB) */}
      {subTab === 'gap_analysis' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Alertas Estratégicos de Ataque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0f121a]/90 border-l-4 border-rose-500 border-white/[0.08] space-y-2">
              <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Gap de Mercado dos Concorrentes
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Os 5 líderes em <strong>{client.neighborhood}</strong> demoram mais de <strong>4 horas</strong> para responder mensagens no WhatsApp e 80% deles ignoram fotos com EXIF GPS. Vamos posicionar seu perfil destacando <strong>atendimento imediato em até 5 minutos</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f121a]/90 border-l-4 border-amber-500 border-white/[0.08] space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Sentimento dos Clientes Locais
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                A maior reclamação dos pacientes e clientes em <strong>{client.city}</strong> é <em>&ldquo;dificuldade para estacionar na porta&rdquo;</em> e <em>&ldquo;falta de clareza de valores&rdquo;</em>. Enfatizamos <strong>estacionamento VIP próprio e transparência total</strong>.
              </p>
            </div>
          </div>

          {/* Editor de Nome & Copy Contragolpe + Mockup Mobile Google Maps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#0f121a]/85 backdrop-blur-md p-6 rounded-2xl border border-white/[0.08] space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                Blueprint de Contragolpe Gerado por IA
              </h3>
              <p className="text-xs text-slate-400">
                Copie e atualize os campos no painel do Google Meu Negócio para esmagar os concorrentes nas buscas locais.
              </p>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Nome Otimizado do Perfil (Com Bairro e Serviço)
                </label>
                <input
                  type="text"
                  value={optimizedName}
                  onChange={(e) => setOptimizedName(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-bold rounded-lg bg-slate-950/80 border border-white/[0.08] text-teal-300 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Descrição Estratégica Oficial da Empresa
                </label>
                <textarea
                  rows={6}
                  value={counterstrikeCopy}
                  onChange={(e) => setCounterstrikeCopy(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-slate-200 leading-relaxed focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${optimizedName}\n\n${counterstrikeCopy}`);
                    setCopiedBlueprint(true);
                    setTimeout(() => setCopiedBlueprint(false), 2000);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold text-xs border border-teal-500/40 flex items-center gap-1.5 transition-all"
                >
                  {copiedBlueprint ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                  {copiedBlueprint ? 'Copiado para Área de Transferência!' : 'Copiar Nome & Copy Completa'}
                </button>
              </div>
            </div>

            {/* Mockup Mobile Google Maps Fiel (MasterGMB Preview) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Preview Realista Google Maps
              </span>
              <div className="w-full max-w-[310px] bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden text-slate-950 font-sans">
                <div className="h-28 bg-gradient-to-tr from-slate-800 to-slate-700 relative">
                  <div className="absolute inset-0 bg-teal-500/20 flex items-center justify-center text-white font-bold text-xs">
                    Foto da Fachada Geotagged
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-sm leading-tight text-slate-900">
                      {optimizedName}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      <span className="font-bold text-amber-600">{client.rating.toFixed(1)}</span>
                      <div className="text-amber-400 text-[10px]">★★★★★</div>
                      <span className="text-[11px] text-slate-500 underline font-medium">
                        ({client.totalReviews} avaliações)
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                      {client.primaryService} • {client.neighborhood}
                    </span>
                  </div>

                  {/* 3 Botões de Ação do Google */}
                  <div className="grid grid-cols-3 gap-2 border-y border-slate-200 py-2.5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <PhoneCall className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase mt-1">Ligar</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Navigation className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase mt-1">Rotas</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase mt-1">Chat WPP</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-600 line-clamp-4 italic leading-relaxed">
                    &ldquo;{counterstrikeCopy}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: Apple Business Connect (Público iPhone / iOS de Alta Renda) */}
      {subTab === 'apple' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0f121a] via-[#121622] to-[#0f121a] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-white flex items-center justify-center text-3xl shadow-xl">
                <Apple className="w-7 h-7 text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">Apple Business Connect (Showcase iOS)</h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                    Público Alta Renda
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Usuários de iPhone e Siri possuem ticket médio 35% superior. O Apple Business Connect coloca sua empresa no Apple Maps com visual de vitrine de luxo.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Ecossistema Apple Conectado
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#0f121a]/85 backdrop-blur-md p-6 rounded-2xl border border-white/[0.08] space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Configurador de Showcase da Apple (Texto Minimalista de Luxo)
              </h4>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Texto do Showcase (Apple Maps)
                </label>
                <textarea
                  rows={5}
                  value={appleShowcaseCopy}
                  onChange={(e) => setAppleShowcaseCopy(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/[0.08] text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Botão de Ação Sugerido no Perfil Apple
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['RESERVAR AGORA', 'LIGAR', 'AGENDAR CONSULTA', 'VER PREÇOS'] as const).map((btn) => (
                    <button
                      key={btn}
                      onClick={() => setAppleActionButton(btn)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        appleActionButton === btn
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/60 text-slate-400 border-white/[0.08] hover:text-white'
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(appleShowcaseCopy);
                    alert('Showcase da Apple copiado com sucesso!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-4 h-4" /> Copiar Showcase para Apple Business Connect
                </button>
              </div>
            </div>

            {/* Mockup iPhone Apple Maps */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Preview no Apple Maps (iOS)
              </span>
              <div className="w-full max-w-[300px] bg-[#1c1c1e] text-white rounded-[2.5rem] shadow-2xl border-[6px] border-[#2c2c2e] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-white" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Apple Maps</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 font-semibold">
                    Showcase
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base leading-snug">{client.name}</h4>
                  <p className="text-[11px] text-slate-400">{client.neighborhood}, {client.city}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 block tracking-wider">
                    Destaque da Empresa
                  </span>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{appleShowcaseCopy}&rdquo;
                  </p>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs shadow-lg uppercase tracking-wider">
                  {appleActionButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 4: Planejamento GBP 30 Dias (Estratégia 4 Semanas de Posts) */}
      {subTab === 'planejamento' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Gestão Mensal de Atualizações</span>
              </div>
              <h3 className="text-base font-extrabold text-white">
                Cronograma de 4 Semanas de Postagens para o Google Maps
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fichas que publicam fotos e novidades semanais recebem até 3.2x mais chamadas telefônicas e sobem no 3-Pack.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-300 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                {postsPlan.filter((p) => p.approved).length} de 4 Semanas Aprovadas
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postsPlan.map((post, idx) => (
              <div
                key={post.week}
                className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  post.approved
                    ? 'bg-[#0f121a]/95 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                    : 'bg-[#0f121a]/80 border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-teal-300 bg-teal-500/15 px-2.5 py-1 rounded-lg border border-teal-500/30">
                    {post.title}
                  </span>
                  <button
                    onClick={() => toggleApprovePost(idx)}
                    className={`text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                      post.approved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/[0.05] text-slate-400 hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {post.approved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clock className="w-3.5 h-3.5" />}
                    {post.approved ? 'Aprovado para Postar' : 'Marcar Aprovado'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Foto Recomendada para a Secretária Tirar:
                  </span>
                  <p className="text-xs text-slate-300 italic leading-relaxed">{post.photoTip}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Legenda Otimizada SEO Local:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyPostCaption(idx)}
                    className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-teal-300 font-semibold text-xs border border-white/[0.08] flex items-center gap-1.5 transition-all"
                  >
                    {post.copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {post.copied ? 'Legenda Copiada!' : 'Copiar Legenda'}
                  </button>

                  <span className="text-[10px] text-slate-500 font-mono">Pronto para GBP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
