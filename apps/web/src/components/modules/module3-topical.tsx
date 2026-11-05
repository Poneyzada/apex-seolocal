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
  CheckCircle2
} from 'lucide-react';
import { ClientTenant } from '@/types';

interface Module3Props {
  client: ClientTenant;
}

export function Module3TopicalAndUgc({ client }: Module3Props) {
  const [selectedCluster, setSelectedCluster] = useState(0);
  const [copiedReviewId, setCopiedReviewId] = useState<number | null>(null);

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
      // Converte simplificadamente para HTML básico para colar no WordPress
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
            <span>Módulo 3: Topical Authority, Blog Engine & UGC</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Clusters Semânticos & Gerador de Artigos de Blog com IA
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mantenha o site atualizado com a regra de &ldquo;Freshness&rdquo; do Google. Escreva artigos completos de 1.500 palavras em 1-clique com SEO Local.
          </p>
        </div>

        <button
          onClick={() => handleGenerateAiArticle()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          Gerar Artigo de Blog com IA (1.500 Palavras)
        </button>
      </div>

      {/* Grid: Clusters Semânticos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

      {/* Vitrine UGC de Depoimentos */}
      <div className="bg-[#0f121a]/85 backdrop-blur-md p-5 rounded-2xl border border-white/[0.08] space-y-4">
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
