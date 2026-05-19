"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, BadgeCheck, MapPin } from "lucide-react";
import SectionDivider from "./ui/SectionDivider";

const steps = [
  {
    number: "1",
    icon: <ClipboardList size={32} className="text-forest-green" />,
    title: "Register",
    desc: "Fill in your details below — takes less than 60 seconds. No payment required.",
  },
  {
    number: "2",
    icon: <BadgeCheck size={32} className="text-forest-green" />,
    title: "Receive",
    desc: "Get your unique Health Credit ID (e.g. AM-0142) instantly upon registration.",
  },
  {
    number: "3",
    icon: <MapPin size={32} className="text-forest-green" />,
    title: "Redeem",
    desc: "Visit Aries Dental & Aesthetic Clinic and present your ID to use AED 1,000 in credits.",
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
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col md:flex-row items-stretch">
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-4 bg-cream border border-gold-light p-8 flex-1 card-fluid"
              >
                {/* Number badge */}
                <div className="step-number">{step.number}</div>

                {/* Icon */}
                {step.icon}

                {/* Text */}
                <div>
                  <h3 className="font-cormorant font-bold text-2xl text-text-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>

              {/* Separator between steps */}
              {i < steps.length - 1 && (
                <div className="flex md:flex-col items-center justify-center py-4 md:py-0 md:px-0">
                  {/* Mobile: horizontal */}
                  <div className="flex md:hidden items-center gap-2 py-2">
                    <SectionDivider />
                  </div>
                  {/* Desktop: vertical arrow */}
                  <div className="hidden md:flex flex-col items-center justify-center h-full px-3 gap-1">
                    <div className="w-px flex-1 bg-gold-primary opacity-30" />
                    <span className="text-gold-primary text-sm">◆</span>
                    <div className="w-px flex-1 bg-gold-primary opacity-30" />
                  </div>
                </div>
              )}
            </div>
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
