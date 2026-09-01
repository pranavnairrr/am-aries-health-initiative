import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations";
import { generateVoucherId } from "@/lib/generateVoucherId";
import { pushToCrm } from "@/lib/pushToCrm";

export const dynamic = "force-dynamic";

// Every voucher issued by this campaign is worth the same fixed amount.
const VOUCHER_AMOUNT = 1000;
const VOUCHER_CURRENCY = "AED";

// Google Ads ValueTrack attribution params the client may attach to the registration payload.
// All optional — pulled straight through to the CRM webhook.
const TRACKING_KEYS = [
  "landing_page", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "device", "creative", "adgroup", "placement", "target", "targetid", "adposition",
  "network", "matchtype", "loc_physical_ms", "loc_interest_ms", "utm_country",
  "gclid", "gad_source", "gad_campaignid",
] as const;

function extractTracking(body: Record<string, unknown>) {
  const out: Record<string, string | undefined> = {};
  for (const key of TRACKING_KEYS) {
    const value = body[key];
    if (typeof value === "string" && value) out[key] = value;
  }
  return out;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, code: "INVALID_JSON" }, { status: 400 });
  }

  // 1. Validate
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, code: "VALIDATION_ERROR", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { fullName, email, phone, emiratesId, preferredLanguage } = parsed.data;

  // 2. Normalize phone
  let normalizedPhone = phone.trim();
  if (normalizedPhone.startsWith("00971")) {
    normalizedPhone = "+971" + normalizedPhone.slice(5);
  } else if (normalizedPhone.startsWith("0")) {
    normalizedPhone = "+971" + normalizedPhone.slice(1);
  } else if (!normalizedPhone.startsWith("+971")) {
    normalizedPhone = "+971" + normalizedPhone;
  }

  // 3. Issue the voucher and push the lead straight to the CRM — the CRM is
  // the sole system of record now, so its response drives the outcome.
  const voucherId = generateVoucherId();

  const crmResult = await pushToCrm({
    first_name: fullName,
    phone: normalizedPhone,
    email,
    primary_condition: "1000 Aries Dental Voucher",
    country: "United Arab Emirates",
    preferred_language: preferredLanguage,
    emirates_id: emiratesId || undefined,
    voucher_id: voucherId,
    voucher_amount: VOUCHER_AMOUNT,
    voucher_currency: VOUCHER_CURRENCY,
    ...extractTracking(body as Record<string, unknown>),
  });

  if (!crmResult.ok) {
    return NextResponse.json({ success: false, code: "CRM_ERROR" }, { status: 502 });
  }

  if (crmResult.duplicate) {
    return NextResponse.json({ success: false, code: "DUPLICATE" });
  }

  return NextResponse.json({ success: true, voucherId });
}
