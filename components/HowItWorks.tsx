"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionDivider from "./ui/SectionDivider";

const steps = [
  {
    num: "01",
    title: "Register",
    desc: "Fill in your details — takes less than 60 seconds. No payment required.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <rect x="3" y="2" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="6" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="6" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M16 16 L21 11 L23 13 L18 18 L15 19 Z" stroke="#C5A55A" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(197,165,90,0.12)" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Receive Your ID",
    desc: "Get your unique Health Credit ID instantly — shown on screen right after registration.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <rect x="1" y="6" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <line x1="1" y1="11" x2="25" y2="11" stroke="currentColor" strokeWidth="1.2" />
        <rect x="4" y="14" width="5" height="2.5" rx="0.5" stroke="#C5A55A" strokeWidth="1" />
        <path d="M17 15 L18.5 16.5 L21 13.5" stroke="#C5A55A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Redeem",
    desc: "Visit Aries Dental & Aesthetic Clinic, show your ID, and enjoy AED 1,000 in health credits.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path
          d="M13 2C9.8 2 6.5 4.2 6.5 8.5C6.5 11 7.4 13 8.3 15.8C9.2 18.6 10 23 11.5 23C12.4 23 12.8 20.8 13 18.5C13.2 20.8 13.6 23 14.5 23C16 23 16.8 18.6 17.7 15.8C18.6 13 19.5 11 19.5 8.5C19.5 4.2 16.2 2 13 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <path d="M9.5 6.5C10.4 5.6 12 5.5 13 6" stroke="#C5A55A" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-cream-dark section-pad">
      <div className="content-max px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark mb-3">
            Simple Process
          </p>
          <h2 className="font-cormorant font-bold text-4xl md:text-5xl text-text-dark mb-4">
            How It Works
          </h2>
          <SectionDivider />
        </div>

        {/* Steps */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.13 }}
              className="bg-cream border border-gold-light p-5 flex flex-col gap-3 card-fluid"
            >
              {/* Step number row */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium tracking-[0.22em] text-gold-dark shrink-0">
                  {step.num}
                </span>
                <div className="h-px flex-1 bg-gold-primary opacity-25" />
              </div>

              {/* Icon + Title on same row */}
              <div className="flex items-center gap-3">
                <span className="text-forest-green shrink-0">{step.icon}</span>
                <h3 className="font-cormorant font-bold text-xl leading-tight text-text-dark">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[13px] text-text-body leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a href="#register" className="btn-cta inline-flex">
            Start Now — Register Free
          </a>
        </div>
      </div>
    </section>
  );
}
