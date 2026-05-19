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

  // 3. Check duplicate
  const { data: existing } = await getSupabaseAdmin()
    .from("registrations")
    .select("voucher_id")
    .or(`email.eq.${email},phone.eq.${normalizedPhone}`)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({
      success: false,
      code: "DUPLICATE",
      voucherId: existing.voucher_id,
    });
  }

  // 4. Check cap
  const { count } = await getSupabaseAdmin()
    .from("registrations")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) >= 2500) {
    return NextResponse.json({ success: false, code: "CAP_REACHED" }, { status: 409 });
  }

  // 5. Generate voucher ID via Supabase RPC
  const { data: seqData, error: seqError } = await getSupabaseAdmin().rpc(
    "get_next_voucher_seq"
  );
  if (seqError || seqData === null) {
    return NextResponse.json({ success: false, code: "SEQ_ERROR" }, { status: 500 });
  }

  const voucherId = generateVoucherId(seqData as number);

  // 6. Insert
  const { error: insertError } = await getSupabaseAdmin().from("registrations").insert({
    voucher_id: voucherId,
    full_name: fullName,
    email,
    phone: normalizedPhone,
    emirates_id: emiratesId || null,
    preferred_language: preferredLanguage,
  });

  if (insertError) {
    // Handle race condition on unique voucher_id
    if (insertError.code === "23505") {
      return NextResponse.json({ success: false, code: "DUPLICATE" });
    }
    return NextResponse.json({ success: false, code: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ success: true, voucherId });
}
