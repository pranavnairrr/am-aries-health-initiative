"use client";

import { useState } from "react";
import { X } from "lucide-react";

const instagramIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const linkedInIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socials = [
  {
    name: "AM Health Hub — Instagram",
    href: "https://www.instagram.com/amhealthhub/",
    label: "AM",
    icon: instagramIcon,
  },
  {
    name: "Aries Clinic — Instagram",
    href: "https://www.instagram.com/ariesclinicdubai/",
    label: "Aries",
    icon: instagramIcon,
  },
  {
    name: "AM Health Hub — LinkedIn",
    href: "https://www.linkedin.com/company/a-m-health-hub",
    label: "LinkedIn",
    icon: linkedInIcon,
  },
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="sticky top-0 z-50 w-full"
      style={{
        background: "linear-gradient(90deg, #0F3A2E 0%, #1B4D3E 50%, #0F3A2E 100%)",
        borderBottom: "1px solid rgba(197,165,90,0.3)",
      }}
    >
      <div className="content-max px-4 py-1.5 flex items-center justify-center gap-2 flex-wrap">
        {/* Star icon — desktop only */}
        <span className="hidden sm:inline text-gold-primary text-xs shrink-0">✦</span>

        {/* Text */}
        <p className="text-[11px] tracking-wide text-center leading-none">
          <span className="text-gold-light font-semibold">Follow us</span>
          <span className="text-cream opacity-70"> — win extra Health Credits</span>
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex items-center gap-1 text-cream opacity-60 hover:opacity-100 hover:text-gold-light transition-all"
            >
              {s.icon}
              {"label" in s && (
                <span className="text-[10px] font-medium tracking-wide">{s.label}</span>
              )}
            </a>
          ))}
        </div>

        <span className="hidden sm:inline text-gold-primary text-sm shrink-0">✦</span>
      </div>

      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-cream opacity-40 hover:opacity-80 transition-opacity p-2"
      >
        <X size={14} />
      </button>
    </div>
  );
}
