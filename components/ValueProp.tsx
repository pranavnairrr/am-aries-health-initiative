"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Leaf, Handshake } from "lucide-react";
import VoucherCard from "./ui/VoucherCard";
import SectionDivider from "./ui/SectionDivider";

const benefits = [
  { icon: <Heart size={22} />, en: "Health", ar: "الصحة" },
  { icon: <Users size={22} />, en: "Family", ar: "العائلة" },
  { icon: <Leaf size={22} />, en: "Wellness", ar: "العافية" },
  { icon: <Handshake size={22} />, en: "Community", ar: "المجتمع" },
];

const services = [
  "Dental treatments & procedures",
  "Aesthetic & cosmetic services",
  "General wellness consultations",
  "Redeemable at Aries Dental & Aesthetic Clinic",
];

export default function ValueProp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white section-pad">
      <div className="content-max px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark mb-3">
            Your Benefit
          </p>
          <h2 className="font-cormorant font-bold text-4xl md:text-5xl text-text-dark mb-4">
            What You Get
          </h2>
          <SectionDivider />
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Voucher card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div
              style={{
                transform: "rotate(2deg)",
                boxShadow: "8px 12px 40px rgba(27, 77, 62, 0.15)",
                maxWidth: 460,
                width: "100%",
              }}
            >
              <VoucherCard />
            </div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Value headline */}
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-cormorant font-bold text-5xl gold-gradient-text leading-none">
                  AED 1,000
                </span>
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-text-muted">
                in Health Credits — per beneficiary
              </p>
            </div>

            {/* Service list */}
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-text-body">
                  <span className="text-gold-primary mt-0.5 shrink-0">◆</span>
                  {s}
                </li>
              ))}
            </ul>

            {/* 4 icon badges */}
            <div className="grid grid-cols-4 gap-3 mt-2">
              {benefits.map((b) => (
                <div
                  key={b.en}
                  className="flex flex-col items-center gap-2 border border-gold-light bg-cream p-3 text-center card-fluid"
                >
                  <span className="text-forest-green">{b.icon}</span>
                  <span className="arabic-text text-xs text-text-muted leading-none">
                    {b.ar}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-text-muted leading-none">
                    {b.en}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA reminder */}
            <a
              href="#register"
              className="btn-cta inline-flex w-fit text-xs"
            >
              Claim Your Free Credits →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
