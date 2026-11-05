import os
from fastapi import APIRouter, HTTPException, status
import httpx

from app.schemas.audit_schema import LandingPageAuditRequest, LandingPageAuditResult
from app.services.cwv_auditor_worker import run_full_landing_page_audit

router = APIRouter(prefix="/seo/auditor", tags=["Módulo 2: Auditor Core Web Vitals & Anti-Spam"])


async def persist_audit_to_supabase(result: LandingPageAuditResult) -> None:
    """Atualiza o registro da Landing Page no Supabase via PostgREST com Service Role Key."""
    supabase_url = os.getenv("SUPABASE_URL")
    service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_key:
        return

    endpoint = f"{supabase_url}/rest/v1/landing_pages?id=eq.{result.landing_page_id}"
    headers = {
        "apikey": service_key,
        "Authorization": f"Bearer {service_key}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    cwv_payload = {
        "performance_score": result.cwv.performance_score,
        "lcp_ms": result.cwv.lcp_ms,
        "inp_ms": result.cwv.inp_ms,
        "cls": result.cwv.cls,
        "hero_preloaded": result.cwv.hero_preloaded,
        "images_missing_dimensions": result.cwv.images_missing_dimensions,
        "answer_first": result.answer_first.model_dump(),
        "spam_compliance": {
            "has_cnpj_footer": result.spam_compliance.has_valid_cnpj_footer,
            "detected_cnpjs": result.spam_compliance.detected_cnpjs,
            "has_privacy_policy": result.spam_compliance.has_privacy_policy_link,
            "has_terms_of_use": result.spam_compliance.has_terms_of_use_link,
            "no_back_button_hijack": result.spam_compliance.no_back_button_hijack,
            "hijack_evidence": result.spam_compliance.hijack_evidence,
            "unique_local_content_ratio": result.spam_compliance.unique_local_content_ratio,
        },
        "recommendations": result.actionable_recommendations,
    }

    update_body = {
        "core_web_vitals_score": cwv_payload,
        "status_auditoria": result.status_auditoria.value,
        "last_audited_at": result.audited_at.isoformat(),
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            await client.patch(endpoint, headers=headers, json=update_body)
    except Exception:
        pass


@router.post(
    "/inspect-landing-page",
    response_model=LandingPageAuditResult,
    summary="Audita Core Web Vitals (LCP, INP, CLS), regra dos 300px, CNPJ no rodapé e Back-Button Hijacking",
)
async def audit_landing_page_endpoint(payload: LandingPageAuditRequest):
    try:
        audit_result = await run_full_landing_page_audit(payload)
        await persist_audit_to_supabase(audit_result)
        return audit_result
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Falha ao executar auditoria Playwright/Lighthouse na URL informada: {str(exc)}",
        ) from exc
