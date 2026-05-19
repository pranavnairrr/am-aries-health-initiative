"use client";

import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let heroHeight = window.innerHeight;

    function onScroll() {
      setVisible(window.scrollY > heroHeight * 0.8);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <a
        href="#register"
        className="btn-cta w-full justify-center text-xs py-4"
        style={{ display: "flex", borderRadius: 0, borderLeft: "none", borderRight: "none", borderBottom: "none" }}
      >
        Register Free — Claim AED 1,000 Credits
      </a>
    </div>
  );
}
