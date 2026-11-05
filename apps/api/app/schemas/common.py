from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ApiResponse(BaseModel):
    success: bool = True
    message: str = "Operação realizada com sucesso"
    data: Optional[Any] = None

class GtmProvisionRequest(BaseModel):
    client_id: str = Field(..., description="UUID do cliente")
    client_name: str = Field(..., description="Nome fantasia do cliente")
    website_url: str = Field(..., description="URL do site ou landing page")
    google_ads_id: Optional[str] = Field(None, description="AW-123456789 ou Conversion ID")
    conversion_labels: List[str] = Field(
        default_factory=lambda: ["lead_submission", "whatsapp_click", "phone_call", "form_error"],
        description="Gatilhos de conversão primários"
    )
    consent_mode_v2: bool = True
    enhanced_conversions: bool = True

class CwvAuditRequest(BaseModel):
    url: str = Field(..., description="URL completa da Landing Page para auditoria")
    check_mobile: bool = True
    detect_anti_spam: bool = True
    expected_cnpj: Optional[str] = None
