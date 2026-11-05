from datetime import datetime
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field, HttpUrl


class AuditStatusEnum(str, Enum):
    PENDING = "pending"
    HEALTHY = "healthy"
    WARNING = "warning"
    CRITICAL = "critical"
    SPAM_RISK = "spam_risk"


class LandingPageAuditRequest(BaseModel):
    landing_page_id: str = Field(..., description="UUID do registro na tabela public.landing_pages")
    client_id: str = Field(..., description="UUID do cliente proprietário da página")
    url: HttpUrl = Field(..., description="URL completa da Landing Page a ser auditada")
    expected_cnpj: Optional[str] = Field(
        default=None,
        description="CNPJ esperado do cliente para confronto no rodapé (apenas dígitos ou formatado)",
    )
    sibling_urls_texts: List[str] = Field(
        default_factory=list,
        description="Textos extraídos de outras LPs de bairros do mesmo cliente para cálculo de conteúdo duplicado (Doorway Pages)",
    )


class AnswerFirstCheck(BaseModel):
    has_single_h1: bool
    h1_text: Optional[str] = None
    h1_top_px: Optional[float] = Field(None, description="Posição Y do H1 em relação ao topo da viewport mobile")
    subtitle_top_px: Optional[float] = Field(None, description="Posição Y do subtítulo factual")
    passed_300px_rule: bool = Field(..., description="True se H1 e subtítulo iniciam nos primeiros 300px")


class CoreWebVitalsMetrics(BaseModel):
    performance_score: int = Field(..., ge=0, le=100)
    lcp_ms: float = Field(..., description="Largest Contentful Paint em milissegundos (Meta <= 2500ms)")
    inp_ms: float = Field(..., description="Interaction to Next Paint / latência de formulário em ms (Meta <= 200ms)")
    cls: float = Field(..., description="Cumulative Layout Shift (Meta <= 0.10)")
    hero_preloaded: bool = Field(..., description="True se a imagem LCP possui fetchpriority='high' ou preload")
    images_missing_dimensions: int = Field(..., description="Quantidade de tags <img> sem width/height explícitos")


class SpamComplianceReport(BaseModel):
    has_valid_cnpj_footer: bool = Field(..., description="CNPJ presente no rodapé e válido pelo cálculo módulo 11")
    detected_cnpjs: List[str] = Field(default_factory=list)
    has_privacy_policy_link: bool
    has_terms_of_use_link: bool
    no_back_button_hijack: bool = Field(..., description="False se detectar manipulação abusiva de history.pushState/popstate")
    hijack_evidence: List[str] = Field(default_factory=list)
    unique_local_content_ratio: float = Field(
        ..., ge=0.0, le=1.0, description="Índice de originalidade textual frente a outras páginas de bairros (1.0 = 100% único)"
    )


class LandingPageAuditResult(BaseModel):
    landing_page_id: str
    url: str
    status_auditoria: AuditStatusEnum
    cwv: CoreWebVitalsMetrics
    answer_first: AnswerFirstCheck
    spam_compliance: SpamComplianceReport
    actionable_recommendations: List[str]
    audited_at: datetime
