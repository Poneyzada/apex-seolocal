// apps/web/src/lib/tracking/apex-datalayer.ts

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Normaliza e gera hash SHA-256 compatível com Google Ads Enhanced Conversions
 */
export async function sha256GoogleNormalized(value: string, type: 'email' | 'phone'): Promise<string> {
  let clean = value.trim().toLowerCase();

  if (type === 'phone') {
    // Mantém apenas dígitos e prefixo '+' no padrão E.164 (ex: +5521999999999)
    const digits = clean.replace(/\D/g, '');
    clean = digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
  }

  const msgBuffer = new TextEncoder().encode(clean);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function initApexConsentModeV2(defaultGranted = false) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const state = defaultGranted ? 'granted' : 'denied';

  window.dataLayer.push({
    event: 'consent_default_init',
    consent_mode_v2: {
      ad_storage: state,
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      wait_for_update: 500,
    },
  });
}

export async function pushLeadSubmissionConversion(payload: {
  email: string;
  phone: string;
  serviceInterested: string;
  neighborhood?: string;
}) {
  const [emailHash, phoneHash] = await Promise.all([
    sha256GoogleNormalized(payload.email, 'email'),
    sha256GoogleNormalized(payload.phone, 'phone'),
  ]);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'lead_submission',
    user_data: {
      sha256_email_address: emailHash,
      sha256_phone_number: phoneHash,
    },
    lead_context: {
      service_category: payload.serviceInterested,
      neighborhood: payload.neighborhood ?? 'not_specified',
      timestamp_iso: new Date().toISOString(),
    },
  });
}
