"use client";

import { motion } from "framer-motion";
import LogoLockup from "./ui/LogoLockup";
import SectionDivider from "./ui/SectionDivider";
import GeometricCorner from "./ui/GeometricCorner";
import ScallopBorder from "./ui/ScallopBorder";
import { LinkButton } from "./ui/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

function LeafOrnament({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="56"
      height="36"
      viewBox="0 0 56 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      {/* Main stem */}
      <path
        d="M 4,32 C 14,22 28,18 52,4"
        stroke="#C5A55A"
        strokeWidth="1.4"
        fill="none"
      />
      {/* Leaf 1 */}
      <ellipse
        cx="18"
        cy="26"
        rx="8"
        ry="3.5"
        transform="rotate(-35 18 26)"
        fill="#C5A55A"
        opacity="0.85"
      />
      {/* Leaf 2 */}
      <ellipse
        cx="32"
        cy="17"
        rx="8"
        ry="3.5"
        transform="rotate(-48 32 17)"
        fill="#C5A55A"
        opacity="0.85"
      />
      {/* Leaf 3 */}
      <ellipse
        cx="46"
        cy="9"
        rx="7"
        ry="3"
        transform="rotate(-58 46 9)"
        fill="#C5A55A"
        opacity="0.85"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream flex items-center justify-center overflow-hidden">
      {/* Geometric corner ornaments — desktop only */}
      <div className="hidden lg:block">
        <GeometricCorner position="tl" size={220} />
        <GeometricCorner position="tr" size={220} />
        <GeometricCorner position="bl" size={220} />
        <GeometricCorner position="br" size={220} />
      </div>

      {/* Scalloped border frame — desktop only */}
      <div className="hidden lg:block">
        <ScallopBorder />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28 lg:pb-32 max-w-3xl mx-auto"
      >
        {/* Logo lockup */}
        <motion.div variants={item} className="mb-4">
          <LogoLockup width={300} />
        </motion.div>

        {/* Powered by */}
        <motion.p
          variants={item}
          className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-medium mb-5"
        >
          Powered by Aries &amp; Macins Group
        </motion.p>

        {/* Invite text */}
        <motion.p
          variants={item}
          className="text-[11px] uppercase tracking-[0.2em] text-text-muted mb-3"
        >
          You are cordially invited to our
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="font-cormorant font-bold text-4xl sm:text-5xl lg:text-6xl text-text-dark leading-tight mb-2"
        >
          Community Appreciation
          <br />
          <span className="font-cormorant font-bold text-5xl sm:text-6xl lg:text-7xl">
            Initiative
          </span>
        </motion.h1>

        <motion.div variants={item} className="my-5">
          <SectionDivider />
        </motion.div>

        {/* AED headline with leaf ornaments */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 sm:gap-5 mb-2"
        >
          <span className="hidden sm:block"><LeafOrnament /></span>
          <h2 className="font-cormorant font-bold text-4xl sm:text-5xl lg:text-6xl gold-gradient-text leading-none whitespace-nowrap">
            AED 2.5 MILLION
          </h2>
          <span className="hidden sm:block"><LeafOrnament flip /></span>
        </motion.div>

        {/* Community health sub */}
        <motion.p
          variants={item}
          className="text-sm uppercase tracking-[0.2em] text-forest-green font-medium mb-4"
        >
          Community Health Initiative
        </motion.p>

        {/* Body copy */}
        <motion.p
          variants={item}
          className="text-base text-text-body max-w-md leading-relaxed mb-2"
        >
          Together, we&apos;re building a healthier, happier community.
        </motion.p>

        {/* Arabic tagline */}
        <motion.p
          variants={item}
          className="arabic-text text-base text-text-muted mb-6"
        >
          معاً لمجتمع أكثر صحة وسعادة
        </motion.p>

        <motion.div variants={item} className="mb-8">
          <SectionDivider />
        </motion.div>

        {/* CTA */}
        <motion.div variants={item}>
          <LinkButton href="#register" size="lg">
            Register Now — Claim Your Health Credits
          </LinkButton>
        </motion.div>

        {/* Social proof line */}
        <motion.p
          variants={item}
          className="mt-5 text-xs text-text-muted tracking-wide"
        >
          2,500 community members &nbsp;·&nbsp; 100% free &nbsp;·&nbsp; No obligations
        </motion.p>
      </motion.div>
    </section>
  );
}
