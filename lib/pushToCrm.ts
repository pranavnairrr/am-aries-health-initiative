// Pushes a lead to the Aries CRM lead-intake webhook. This is now the sole
// system of record for registrations — a failed call means the lead is lost,
// so the caller must surface failure to the user rather than swallowing it.
type CrmResult =
  | { ok: true; duplicate: boolean; leadId?: string }
  | { ok: false; duplicate: false };

export async function pushToCrm(
  payload: Record<string, string | number | undefined>
): Promise<CrmResult> {
  const url = process.env.ARIES_CRM_WEBHOOK_URL;
  const apiKey = process.env.ARIES_CRM_API_KEY;
  if (!url || !apiKey) {
    console.error("pushToCrm: ARIES_CRM_WEBHOOK_URL / ARIES_CRM_API_KEY not configured");
    return { ok: false, duplicate: false };
  }

  // Drop empty/undefined optional fields rather than sending blanks
  const body: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== "") body[key] = value;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const json: unknown = await res.json().catch(() => null);

    if (!res.ok) {
      console.error(`pushToCrm: CRM webhook returned ${res.status}`, json);
      return { ok: false, duplicate: false };
    }

    const data = (json ?? {}) as { duplicate?: unknown; lead_id?: unknown };
    return {
      ok: true,
      duplicate: data.duplicate === true,
      leadId: typeof data.lead_id === "string" ? data.lead_id : undefined,
    };
  } catch (err) {
    console.error("pushToCrm: CRM webhook request failed", err);
    return { ok: false, duplicate: false };
  }
}
