import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Vercel sets this header on every request with the visitor's ISO 3166-1
// alpha-2 country code. Empty locally / off Vercel — callers should fall
// back to a sensible default (this campaign defaults to "AE").
export async function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") || "";
  return NextResponse.json({ country });
}
