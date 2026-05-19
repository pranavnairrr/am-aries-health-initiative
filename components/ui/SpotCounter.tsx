"use client";

import { useEffect, useState } from "react";

const TOTAL_SPOTS = 2500;

export default function SpotCounter({ className = "" }: { className?: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) return;

    fetch(`${supabaseUrl}/rest/v1/registrations?select=count`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "count=exact",
        Range: "0-0",
      },
    })
      .then((res) => {
        const rangeHeader = res.headers.get("Content-Range");
        if (rangeHeader) {
          const total = parseInt(rangeHeader.split("/")[1], 10);
          if (!isNaN(total)) setRemaining(TOTAL_SPOTS - total);
        }
      })
      .catch(() => {});
  }, []);

  if (remaining === null) {
    return (
      <p className={`text-xs text-text-muted ${className}`}>
        Limited to 2,500 beneficiaries
      </p>
    );
  }

  const isUrgent = remaining < 500;
  const colorClass = isUrgent ? "text-coral font-semibold" : "text-text-muted";

  return (
    <p className={`text-xs ${colorClass} ${className}`}>
      {remaining > 0 ? (
        <>
          <span className="font-bold">{remaining.toLocaleString()}</span> of{" "}
          {TOTAL_SPOTS.toLocaleString()} spots remaining
        </>
      ) : (
        "All 2,500 spots have been claimed"
      )}
    </p>
  );
}
