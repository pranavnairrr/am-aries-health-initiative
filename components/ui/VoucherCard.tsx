import LogoLockup from "./LogoLockup";

interface VoucherCardProps {
  voucherId?: string;
  holderName?: string;
  className?: string;
  patternId?: string;
}

/* Physical loyalty-card dimensions: ~16:9.5 aspect ratio */
export default function VoucherCard({
  voucherId,
  holderName,
  className = "",
  patternId = "vc-geo",
}: VoucherCardProps) {
  return (
    <div
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        aspectRatio: "1.7 / 1",
        borderRadius: 18,
        background: "linear-gradient(135deg, #0F3A2E 0%, #1B4D3E 45%, #163D31 100%)",
        boxShadow: "0 20px 60px rgba(15,58,46,0.45), 0 4px 16px rgba(0,0,0,0.3)",
        border: "1px solid rgba(197,165,90,0.25)",
      }}
    >
      {/* Holographic shimmer overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, transparent 30%, rgba(197,165,90,0.06) 50%, transparent 70%)",
          borderRadius: "inherit",
          pointerEvents: "none",
        }}
      />

      {/* Subtle geometric pattern bg */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id={patternId} x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <polygon
              points="11,0 25,0 36,11 36,25 25,36 11,36 0,25 0,11"
              fill="none"
              stroke="#C5A55A"
              strokeWidth="0.6"
            />
            <line x1="18" y1="0" x2="18" y2="36" stroke="#C5A55A" strokeWidth="0.3" />
            <line x1="0" y1="18" x2="36" y2="18" stroke="#C5A55A" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Gold arc accent — top right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: "1px solid rgba(197,165,90,0.18)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "1px solid rgba(197,165,90,0.12)",
          pointerEvents: "none",
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6">
        {/* Top row: logo + chip */}
        <div className="flex items-start justify-between">
          <LogoLockup variant="light" width={160} className="opacity-90" />

          {/* Credit card chip */}
          <div
            style={{
              width: 36,
              height: 28,
              borderRadius: 5,
              background: "linear-gradient(135deg, #D4B96E 0%, #C5A55A 50%, #A8883D 100%)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden>
              <rect x="1" y="5" width="20" height="8" rx="1" fill="none" stroke="rgba(15,58,46,0.6)" strokeWidth="0.8" />
              <line x1="1" y1="8" x2="21" y2="8" stroke="rgba(15,58,46,0.5)" strokeWidth="0.6" />
              <line x1="1" y1="11" x2="21" y2="11" stroke="rgba(15,58,46,0.5)" strokeWidth="0.6" />
              <line x1="8" y1="5" x2="8" y2="13" stroke="rgba(15,58,46,0.5)" strokeWidth="0.6" />
              <line x1="14" y1="5" x2="14" y2="13" stroke="rgba(15,58,46,0.5)" strokeWidth="0.6" />
            </svg>
          </div>
        </div>

        {/* Centre: amount */}
        <div className="flex flex-col gap-0.5">
          <p
            className="text-[10px] uppercase tracking-[0.22em] font-medium"
            style={{ color: "rgba(212,185,110,0.7)" }}
          >
            Health Credits Value
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="font-cormorant font-bold leading-none"
              style={{
                fontSize: "clamp(2rem, 6vw, 3rem)",
                background: "linear-gradient(135deg, #D4B96E 0%, #C5A55A 40%, #A8883D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AED 1,000
            </span>
          </div>
          <p
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "rgba(253,246,236,0.5)" }}
          >
            Community Appreciation Initiative
          </p>
        </div>

        {/* Bottom row: tagline + voucher ID */}
        <div className="flex items-end justify-between gap-6">
          {/* Left: Arabic + English taglines */}
          <div className="flex-1 min-w-0">
            <p
              className="arabic-text text-xs mb-1"
              style={{ color: "rgba(253,246,236,0.6)" }}
            >
              معاً لمجتمع أكثر صحة وسعادة
            </p>
            {/* Only show English line when no holder name (preview mode) */}
            {!holderName && (
              <p
                className="text-[9px] uppercase tracking-[0.15em]"
                style={{ color: "rgba(253,246,236,0.35)" }}
              >
                Together for a Healthier, Happier Community
              </p>
            )}
          </div>

          {/* Right: name + voucher ID / contactless icon */}
          <div className="text-right shrink-0">
            {voucherId ? (
              <div>
                {holderName && (
                  <p
                    className="text-[9px] uppercase tracking-wider mb-1"
                    style={{ color: "rgba(212,185,110,0.7)", letterSpacing: "0.12em" }}
                  >
                    {holderName}
                  </p>
                )}
                <p
                  className="font-cormorant font-bold tracking-[0.15em]"
                  style={{
                    fontSize: "1.1rem",
                    background: "linear-gradient(135deg, #D4B96E 0%, #C5A55A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {voucherId}
                </p>
              </div>
            ) : (
              /* NFC / contactless wave */
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                <path d="M14 14 C14 14 18 10 22 14" stroke="rgba(197,165,90,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M14 14 C14 14 20 7 26 14" stroke="rgba(197,165,90,0.35)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <circle cx="14" cy="14" r="2" fill="rgba(197,165,90,0.6)" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
