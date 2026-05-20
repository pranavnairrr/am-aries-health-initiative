import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { generateVoucherId } from "@/lib/generateVoucherId";

export const dynamic = "force-dynamic";

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

  // 3. Check duplicate — match on phone only, or phone + emirates ID if provided
  let dupFilter = `phone.eq.${normalizedPhone}`;
  if (emiratesId) dupFilter += `,emirates_id.eq.${emiratesId}`;

  const { data: existing } = await getSupabaseAdmin()
    .from("registrations")
    .select("voucher_id")
    .or(dupFilter)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({
      success: false,
      code: "DUPLICATE",
      voucherId: existing.voucher_id,
    });
  }

  // 4. Generate unique voucher ID — retry up to 5 times on collision (astronomically rare)
  let voucherId = "";
  for (let attempt = 0; attempt < 5; attempt++) {
    voucherId = generateVoucherId();

    const { error: insertError } = await getSupabaseAdmin()
      .from("registrations")
      .insert({
        voucher_id: voucherId,
        full_name: fullName,
        email,
        phone: normalizedPhone,
        emirates_id: emiratesId || null,
        preferred_language: preferredLanguage,
        registered_at: new Date().toISOString(),
      });

    if (!insertError) {
      return NextResponse.json({ success: true, voucherId });
    }

    // 23505 = unique_violation — either voucher_id collision or duplicate email/phone
    if (insertError.code === "23505") {
      // If it's email/phone duplicate (race condition), return DUPLICATE
      const isVoucherCollision = insertError.message?.includes("voucher_id");
      if (!isVoucherCollision) {
        return NextResponse.json({ success: false, code: "DUPLICATE" });
      }
      // Otherwise retry with a new voucher ID
      continue;
    }

    return NextResponse.json({ success: false, code: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ success: false, code: "DB_ERROR" }, { status: 500 });
}
