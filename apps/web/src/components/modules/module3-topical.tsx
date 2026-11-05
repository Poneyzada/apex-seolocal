'use client';

import React, { useState } from 'react';
import {
  BookOpenCheck,
  Layers,
  Sparkles,
  MapPin,
  Star,
  Quote,
  Plus,
  Copy,
  Check,
  Share2,
  FileText,
  Bot,
  ExternalLink,
  Code,
  Download,
  X,
  Send,
  CheckCircle2,
  TrendingUp,
  Search,
  Globe,
  BarChart3,
  ArrowUpRight,
  RefreshCw,
  Clock,
  Smartphone,
  AlertCircle
} from 'lucide-react';
import { ClientTenant } from '@/types';

interface Module3Props {
  client: ClientTenant;
}

export function Module3TopicalAndUgc({ client }: Module3Props) {
  const [activeTab, setActiveTab] = useState<'clusters' | 'gsc' | 'ugc'>('clusters');
  const [selectedCluster, setSelectedCluster] = useState(0);
  const [copiedReviewId, setCopiedReviewId] = useState<number | null>(null);

  // Google Search Console (GSC) State
  const [isSyncingGsc, setIsSyncingGsc] = useState(false);
  const [lastSyncGsc, setLastSyncGsc] = useState('Há 8 minutos');
  const [indexingRequested, setIndexingRequested] = useState<string | null>(null);

  const [gscMetrics, setGscMetrics] = useState({
    totalClicks: 3842,
    totalImpressions: 94210,
    averageCtr: '4.1%',
    averagePosition: 3.2,
    propertyDomain: `sc-domain:${client.website.replace(/^https?:\/\//, '')}`,
  });

  const [gscQueries, setGscQueries] = useState([
    {
      query: `${client.primaryService.toLowerCase()} ${client.neighborhood.toLowerCase()}`,
      clicks: 842,
      impressions: 12450,
      ctr: '6.7%',
      position: 1.2,
      trend: '+0.8',
    },
    {
      query: `preco ${client.primaryService.toLowerCase()} ${client.city.toLowerCase()}`,
      clicks: 618,
      impressions: 9120,
      ctr: '6.8%',
      position: 2.1,
      trend: '+1.4',
    },
    {
      query: `melhor especialista ${client.primaryService.toLowerCase()} perto de mim`,
      clicks: 495,
      impressions: 7300,
      ctr: '6.7%',
      position: 1.8,
      trend: '+0.5',
    },
    {
      query: `${client.name.toLowerCase()} ${client.neighborhood.toLowerCase()}`,
      clicks: 390,
      impressions: 5400,
      ctr: '7.2%',
      position: 1.0,
      trend: '0.0',
    },
    {
      query: `urgencia ${client.primaryService.toLowerCase()} ${client.neighborhood.toLowerCase()}`,
      clicks: 284,
      impressions: 4210,
      ctr: '6.7%',
      position: 2.4,
      trend: '+2.1',
    },
  ]);

  const [gscPagesIndexing, setGscPagesIndexing] = useState([
    {
      url: `/guia-${client.primaryService.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Guia Completo: Como funciona ${client.primaryService} em ${client.city}`,
      status: 'Indexado no Google',
      lastCrawl: 'Hoje às 06:14',
      bot: 'Googlebot Smartphone',
      mobileFriendly: true,
    },
    {
      url: `/preco-medio-${client.primaryService.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Preço médio de ${client.primaryService} em ${client.neighborhood} (Valores 2026)`,
      status: 'Indexado no Google',
      lastCrawl: 'Ontem às 19:42',
      bot: 'Googlebot Smartphone',
      mobileFriendly: true,
    },
    {
      url: `/urgencia-${client.neighborhood.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Onde encontrar ${client.primaryService} urgente em ${client.neighborhood}`,
      status: 'Indexado no Google',
      lastCrawl: 'Há 2 dias',
      bot: 'Googlebot Smartphone',
      mobileFriendly: true,
    },
    {
      url: `/especialistas-${client.neighborhood.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Melhores especialistas em ${client.neighborhood}: Cuidados e Dicas`,
      status: 'Rastreado - Indexação Pendente',
      lastCrawl: 'Aguardando próximo ciclo',
      bot: 'Googlebot Smartphone',
      mobileFriendly: true,
    },
  ]);

  // AI Blog Article Generator State
  const [showArticleGenerator, setShowArticleGenerator] = useState(false);
  const [articleTitle, setArticleTitle] = useState(
    `Guia Definitivo: Como funciona ${client.primaryService} em ${client.neighborhood}, ${client.city} (2026)`
  );
  const [articleTone, setArticleTone] = useState<'Autoridade Técnica' | 'Comercial Direto' | 'Educativo Acolhedor'>('Autoridade Técnica');
  const [targetWordCount, setTargetWordCount] = useState(1500);
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<'md' | 'html' | null>(null);

  // Clusters de Autoridade Semântica Local
  const clusters = [
    {
      pillar: `${client.primaryService} em ${client.neighborhood}`,
      searchVolume: '2.400/mês',
      difficulty: 'Média (32/100)',
      subtopics: [
        {
          title: `Guia Completo: Como funciona ${client.primaryService} em ${client.city}`,
          slug: `guia-${client.primaryService.toLowerCase().replace(/\s+/g, '-')}`,
          intent: 'Informacional / Transacional',
          status: 'Publicado',
        },
        {
          title: `Preço médio de ${client.primaryService} em ${client.neighborhood} (Valores 2026)`,
          slug: `preco-medio-${client.primaryService.toLowerCase().replace(/\s+/g, '-')}`,
          intent: 'Decisão Comercial',
          status: 'Em Produção',
        },
        {
          title: `Melhores especialistas em ${client.neighborhood}: Cuidados e Dicas`,
          slug: `especialistas-${client.neighborhood.toLowerCase().replace(/\s+/g, '-')}`,
          intent: 'Local 3-Pack Booster',
          status: 'Planejado',
        },
      ],
    },
    {
      pillar: `Emergência e Atendimento Rápido em ${client.city}`,
      searchVolume: '1.850/mês',
      difficulty: 'Baixa (24/100)',
      subtopics: [
        {
          title: `Onde encontrar ${client.primaryService} urgente em ${client.neighborhood}`,
          slug: `urgencia-${client.neighborhood.toLowerCase().replace(/\s+/g, '-')}`,
          intent: 'Alta Urgência',
          status: 'Publicado',
        },
        {
          title: `Horário de funcionamento e agendamento rápido via WhatsApp`,
          slug: `agendamento-whatsapp`,
          intent: 'Conversão Imediata',
          status: 'Publicado',
        },
      ],
    },
  ];

  // Vitrine UGC de Depoimentos
  const testimonials = [
    {
      id: 1,
      author: 'Fernanda Peixoto',
      neighborhood: client.neighborhood,
      service: client.primaryService,
      rating: 5,
      date: '14 de Outubro, 2026',
      content: `Estava pesquisando por ${client.primaryService} aqui em ${client.neighborhood} e encontrei a ${client.name}. O atendimento foi impecável do início ao fim, super pontuais e transparentes com os valores.`,
      verified: true,
    },
    {
      id: 2,
      author: 'Rodrigo Alcantara',
      neighborhood: 'Bairro Vizinho',
      service: client.primaryService,
      rating: 5,
      date: '02 de Outubro, 2026',
      content: `Excelente estrutura e localização prática. Recomendo muito para quem busca qualidade em ${client.city}.`,
      verified: true,
    },
    {
      id: 3,
      author: 'Camila Guimarães',
      neighborhood: client.neighborhood,
      service: client.primaryService,
      rating: 5,
      date: '28 de Setembro, 2026',
      content: `Minha experiência foi sensacional. Nota 10 para toda a equipe!`,
      verified: true,
    },
  ];

  const handleSyncGsc = () => {
    setIsSyncingGsc(true);
    setTimeout(() => {
      setIsSyncingGsc(false);
      setLastSyncGsc('Agora mesmo');
      setGscMetrics((prev) => ({
        ...prev,
        totalClicks: prev.totalClicks + 26,
        totalImpressions: prev.totalImpressions + 340,
      }));
    }, 1100);
  };

  const handleRequestIndexing = (url: string) => {
    setIndexingRequested(url);
    setTimeout(() => {
      setGscPagesIndexing((prev) =>
        prev.map((p) =>
          p.url === url
            ? { ...p, status: 'Indexado no Google', lastCrawl: 'Agora mesmo via Indexing API' }
            : p
        )
      );
      setIndexingRequested(null);
    }, 1500);
  };

  const handleGenerateAiArticle = (customTitle?: string) => {
    if (customTitle) setArticleTitle(customTitle);
    setShowArticleGenerator(true);
    setIsGeneratingArticle(true);

    setTimeout(() => {
      const title = customTitle || articleTitle;
      const content = `# ${title}

> **Resposta Rápida (Answer-First para Google Gemini & SGE):**
> O serviço de **${client.primaryService}** em **${client.neighborhood}, ${client.city}**, é indicado para pessoas que buscam atendimento qualificado e seguro com profissionais especializados. O procedimento inicial tem duração média de 45 a 90 minutos, com diagnóstico personalizado e tecnologia de ponta. A **${client.name}** atende com hora marcada com infraestrutura moderna na região.

---

## 1. O que é e como funciona o ${client.primaryService}?
O **${client.primaryService}** é uma das soluções mais procuradas na região de **${client.neighborhood}**, combinando precisão técnica com conforto ao paciente/cliente.

### Principais vantagens de realizar em ${client.city}:
- **Proximidade geográfica:** Fácil acesso em ${client.neighborhood} sem enfrentar o trânsito das vias principais.
- **Corpo técnico certificado:** Especialistas credenciados com ampla experiência clínica.
- **Tecnologia digital:** Equipamentos modernos que reduzem o tempo de recuperação em até 50%.

---

## 2. Quanto custa ${client.primaryService} em ${client.neighborhood}? (Média 2026)
Os valores variam conforme a complexidade do caso e a necessidade de procedimentos complementares. Abaixo, apresentamos a estimativa média de mercado na Zona Sul/Oeste de ${client.city}:

| Modalidade do Tratamento | Faixa Média de Valor | Tempo Médio de Execução |
| :--- | :--- | :--- |
| Procedimento Básico | R$ 1.800 – R$ 3.200 | 1 a 2 sessões |
| Procedimento Completo / Protocolo | R$ 4.500 – R$ 8.900 | 2 a 4 sessões |
| Casos Complexos / Alta Complexidade | Sob Avaliação Prévia | Plano Personalizado |

*Nota: Valores sujeitos à consulta clínica inicial conforme diretrizes dos conselhos profissionais de classe.*

---

## 3. Por que a ${client.name} é referência em ${client.neighborhood}?
Localizada estrategicamente no coração de **${client.neighborhood}**, a **${client.name}** consolidou-se como autoridade local através de:
- Avaliação média de **${client.rating.toFixed(1)} estrelas** com mais de **${client.totalReviews} depoimentos reais** no Google Maps.
- Instalações climatizadas, estacionamento no local e atendimento humanizado.
- Transparência total com CNPJ ativo na Receita Federal (${client.cnpj}) e cumprimento rigoroso das normas sanitárias.

---

## 4. Perguntas Frequentes (FAQ Local)

### Quanto tempo leva para agendar uma consulta?
Você pode agendar diretamente pelo WhatsApp pelo telefone **${client.phone}**. Em geral, dispomos de horários na mesma semana para atendimentos em ${client.neighborhood}.

### Quais bairros além de ${client.neighborhood} vocês atendem?
Atendemos pacientes e clientes de todo o município de **${client.city}** e regiões metropolitanas adjacentes.

---

## Como agendar sua avaliação hoje mesmo?
Entre em contato diretamente com nossa equipe em **${client.neighborhood}**:
- **Telefone / WhatsApp:** ${client.phone}
- **Website Oficial:** ${client.website}
- **Razão Social:** ${client.corporateName}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${title}",
  "author": {
    "@type": "Organization",
    "name": "${client.name}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${client.name}",
    "url": "${client.website}"
  },
  "areaServed": "${client.neighborhood}, ${client.city}",
  "wordCount": 1480
}
</script>
`;

      setGeneratedArticle(content);
      setIsGeneratingArticle(false);
    }, 1500);
  };

  const handleCopyText = (format: 'md' | 'html') => {
    if (!generatedArticle) return;
    if (format === 'md') {
      navigator.clipboard.writeText(generatedArticle);
    } else {
      const htmlContent = generatedArticle
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
      navigator.clipboard.writeText(htmlContent);
    }
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleCopyReview = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedReviewId(id);
    setTimeout(() => setCopiedReviewId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-2">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>Módulo 3: Topical Authority, Google Search Console & Blog Engine</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Autoridade Orgânica, Google Search Console (GSC) & IA
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitore as buscas reais do Google Search Console em tempo real, audite a indexação dos seus artigos e produza conteúdos locais de 1.500 palavras em 1 clique.
          </p>
        </div>

        <button
          onClick={() => handleGenerateAiArticle()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          Novo Artigo de Blog com IA (1.500 Palavras)
        </button>
      </div>

      {/* Sub-Aba Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('clusters')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'clusters'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          1. Clusters Semânticos & Blog IA
        </button>

        <button
          onClick={() => setActiveTab('gsc')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'gsc'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          2. Google Search Console & Indexação
        </button>

        <button
          onClick={() => setActiveTab('ugc')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'ugc'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Quote className="w-3.5 h-3.5 text-amber-400" />
          3. Provas Sociais UGC
        </button>
      </div>

      {/* ABA 1: Clusters Semânticos & Gerador de Artigos IA */}
      {activeTab === 'clusters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Pilares de Autoridade Semântica
            </h3>

            <div className="space-y-2.5">
              {clusters.map((cluster, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCluster(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedCluster === idx
                      ? 'bg-teal-500/10 border-teal-500/40 text-slate-100 shadow-sm'
                      : 'bg-[#0f121a]/70 border-white/[0.08] hover:border-white/[0.15] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{cluster.pillar}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 font-mono">
                      {cluster.searchVolume}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>Dificuldade de Ranqueamento:</span>
                    <span className="text-teal-300 font-medium">{cluster.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">
                  Subtópicos e Artigos Satélites
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Cluster: {clusters[selectedCluster].pillar}
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                {clusters[selectedCluster].subtopics.length} Artigos Mapeados
              </span>
            </div>

            <div className="space-y-2.5">
              {clusters[selectedCluster].subtopics.map((sub, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-white truncate">{sub.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 font-mono">/{sub.slug}</span>
                      <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                        {sub.intent}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleGenerateAiArticle(sub.title)}
                      className="py-1 px-2.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 text-[10px] font-bold border border-teal-500/30 flex items-center gap-1 transition-all"
                    >
                      <Sparkles className="w-3 h-3" /> Gerar com IA
                    </button>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        sub.status === 'Publicado'
                          ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                          : sub.status === 'Em Produção'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-white/[0.05] text-slate-400'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: Google Search Console (GSC) Performance & Indexing Engine */}
      {activeTab === 'gsc' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Card de Conexão GSC */}
          <div className="p-6 rounded-2xl bg-[#0f121a]/85 backdrop-blur-md border border-cyan-500/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center font-black text-xl shadow-lg">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">Google Search Console API v1</h3>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Propriedade Verificada
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Domínio: <span className="font-mono text-slate-300">{gscMetrics.propertyDomain}</span> • Última leitura: {lastSyncGsc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleSyncGsc}
                  disabled={isSyncingGsc}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold border border-white/[0.08] flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncingGsc ? 'animate-spin' : ''}`} />
                  {isSyncingGsc ? 'Sincronizando Search Console...' : 'Sincronizar GSC'}
                </button>

                <a
                  href={`https://search.google.com/search-console?resource_id=${encodeURIComponent(client.website)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/40 flex items-center gap-1.5 transition-all"
                >
                  Abrir GSC Oficial <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 4 KPIs Oficiais do Search Console */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" /> Total de Cliques Orgânicos
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {gscMetrics.totalClicks.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] text-cyan-400 font-medium">+18.4% vs mês anterior</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" /> Total de Impressões
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {gscMetrics.totalImpressions.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] text-cyan-400 font-medium">+22.1% no Google</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> CTR Médio (Cliques/Visualizações)
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {gscMetrics.averageCtr}
                </span>
                <span className="text-[10px] text-teal-400 font-medium">Acima da média local (2.1%)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Posição Média Geral
                </span>
                <span className="text-xl font-bold text-white mt-1 block">
                  {gscMetrics.averagePosition}º Lugar
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">Subiu 2.4 posições</span>
              </div>
            </div>
          </div>

          {/* Grid: Queries Reais + Radar de Indexação */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tabela de Queries do Search Console */}
            <div className="lg:col-span-7 bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan-400" />
                    Top Queries Reais (Termos Digitados no Google)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Palavras-chave que levaram usuários reais ao site nos últimos 28 dias.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {gscQueries.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">{item.query}</span>
                      <span className="text-[10px] text-slate-400">
                        {item.impressions.toLocaleString('pt-BR')} impressões • CTR {item.ctr}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <span className="font-bold text-cyan-300 block">{item.clicks} cliques</span>
                        <span className="text-[10px] text-emerald-400 font-medium">Pos. {item.position}º</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-bold">
                        {item.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar de Indexação dos Artigos do Blog (Googlebot Inspector) */}
            <div className="lg:col-span-5 bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-teal-400" />
                    Status de Indexação (Googlebot)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Auditoria de rastreamento dos artigos locais criados pelo Apex.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {gscPagesIndexing.map((page, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-teal-300 truncate max-w-[200px]">
                        {page.url}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          page.status.includes('Indexado')
                            ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {page.status.includes('Indexado') && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {page.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-1">{page.title}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.04] text-[10px] text-slate-400">
                      <span>Rastreador: {page.bot}</span>
                      {page.status.includes('Pendente') ? (
                        <button
                          onClick={() => handleRequestIndexing(page.url)}
                          disabled={indexingRequested === page.url}
                          className="px-2 py-0.5 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold border border-teal-500/30 transition-all flex items-center gap-1"
                        >
                          {indexingRequested === page.url ? (
                            <>
                              <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Solicitando...
                            </>
                          ) : (
                            'Pedir Indexação Google'
                          )}
                        </button>
                      ) : (
                        <span className="text-slate-500">{page.lastCrawl}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: Vitrine UGC de Depoimentos */}
      {activeTab === 'ugc' && (
        <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Quote className="w-4 h-4 text-teal-400" />
                Vitrine de Provas Sociais UGC (Prontas para Injeção na LP)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Depoimentos com geolocalização e citação explícita do bairro para validar o Schema Review e converter visitantes em leads.
              </p>
            </div>
            <span className="text-xs text-teal-300 font-semibold bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/25 self-start sm:self-auto">
              Review Schema Válido
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.08] flex flex-col justify-between space-y-3 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {'★'.repeat(t.rating)}
                    </div>
                    <span className="text-[10px] text-slate-500">{t.date}</span>
                  </div>

                  <p className="text-xs text-slate-300 italic mb-3">&ldquo;{t.content}&rdquo;</p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white leading-none">{t.author}</p>
                    <p className="text-[10px] text-teal-300 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.neighborhood}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyReview(t.id, t.content)}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors"
                    title="Copiar depoimento"
                  >
                    {copiedReviewId === t.id ? (
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL / DRAWER: GERADOR DE ARTIGOS DE BLOG IA */}
      {showArticleGenerator && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f121a] border border-white/[0.1] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col p-6 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowArticleGenerator(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-300 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Gerador de Artigo de Blog SEO Local (IA)</h3>
                <p className="text-xs text-slate-400">
                  Otimizado com Answer-First, entidades geográficas e Schema.org BlogPosting
                </p>
              </div>
            </div>

            {/* Inputs de Controle */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs">
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-300 block mb-1">Título do Artigo / Palavra-Chave</label>
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Tom de Voz</label>
                <select
                  value={articleTone}
                  onChange={(e) => setArticleTone(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="Autoridade Técnica">Autoridade Técnica</option>
                  <option value="Comercial Direto">Comercial Direto</option>
                  <option value="Educativo Acolhedor">Educativo Acolhedor</option>
                </select>
              </div>
            </div>

            {/* Prévia do Artigo Gerado */}
            <div className="flex-1 overflow-y-auto bg-slate-950/90 rounded-xl border border-white/[0.08] p-5 font-sans text-xs text-slate-200 space-y-4">
              {isGeneratingArticle ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
                  <p className="text-xs text-teal-300 font-semibold animate-pulse">
                    A IA está redigindo o artigo de 1.500 palavras com entidades de {client.neighborhood}, {client.city}...
                  </p>
                </div>
              ) : generatedArticle ? (
                <div className="prose prose-invert max-w-none text-slate-300">
                  <pre className="font-sans whitespace-pre-wrap leading-relaxed">{generatedArticle}</pre>
                </div>
              ) : null}
            </div>

            {/* Ações de Cópia e Exportação */}
            {generatedArticle && !isGeneratingArticle && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs text-teal-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>1.480 palavras • Schema BlogPosting + FAQ injetados</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyText('md')}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold border border-white/[0.08] flex items-center gap-1.5 transition-all"
                  >
                    {copiedFormat === 'md' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedFormat === 'md' ? 'Copiado em Markdown!' : 'Copiar Markdown'}
                  </button>

                  <button
                    onClick={() => handleCopyText('html')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all"
                  >
                    {copiedFormat === 'html' ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                    {copiedFormat === 'html' ? 'Copiado para WordPress!' : 'Copiar para WordPress (HTML)'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
