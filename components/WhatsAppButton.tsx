"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "971554560554";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'd like to learn more about the AED 2.5 Million Community Health Initiative."
);

const BTN_SIZE = 44;

const btnStyle: React.CSSProperties = {
  width: BTN_SIZE,
  height: BTN_SIZE,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  cursor: "pointer",
  border: "none",
  position: "relative",
};

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "AED 2.5 Million Community Health Initiative",
        text: "Claim your FREE AED 1,000 Health Credits from Aries Dental & AM Health Hub!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <div
      className="float-btns"
      style={{
        position: "fixed",
        right: 20,
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.6)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Share button */}
      <button
        onClick={handleShare}
        aria-label={copied ? "Link copied!" : "Share this page"}
        style={{
          ...btnStyle,
          background: "#1B4D3E",
          boxShadow: "0 4px 16px rgba(15,58,46,0.45)",
          border: "1px solid rgba(197,165,90,0.35)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {copied ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5A55A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5A55A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        )}
      </button>

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          ...btnStyle,
          background: "#25D366",
          boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Pulse ring */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid #25D366",
            animation: "wa-pulse 2s ease-out infinite",
          }}
        />
      </a>

      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.7); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
