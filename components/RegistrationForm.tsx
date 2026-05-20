"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Share2 } from "lucide-react";
import { registrationSchema, type RegistrationInput } from "@/lib/validations";
import Button from "./ui/Button";
import Input from "./ui/Input";
import VoucherCard from "./ui/VoucherCard";
import SpotCounter from "./ui/SpotCounter";
import SectionDivider from "./ui/SectionDivider";

type FormState = "idle" | "submitting" | "success" | "duplicate" | "cap_reached" | "error";

export default function RegistrationForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [voucherId, setVoucherId] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: { preferredLanguage: "en" },
  });

  async function onSubmit(data: RegistrationInput) {
    setFormState("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        setVoucherId(json.voucherId);
        setSubmittedName(data.fullName);
        setFormState("success");
      } else if (json.code === "DUPLICATE") {
        setVoucherId(json.voucherId ?? "");
        setSubmittedName(data.fullName);
        setFormState("duplicate");
      } else if (json.code === "CAP_REACHED") {
        setFormState("cap_reached");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  function handleWhatsAppShare() {
    const text = encodeURIComponent(
      `I just claimed my AED 1,000 Health Credits from Aries Dental & AM Health Hub! Register now at ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  function handleSharePage() {
    const text = encodeURIComponent(
      `Claim your FREE AED 1,000 Health Credits from Aries Dental & AM Health Hub. 2,500 spots available — register here: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  const showForm = formState !== "success" && formState !== "duplicate";
  const showSuccess = formState === "success" || formState === "duplicate";

  return (
    <section id="register" className="bg-cream section-pad">
      <div className="content-max px-6">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark mb-3">
            Free Registration
          </p>
          <h2 className="font-cormorant font-bold text-4xl md:text-5xl text-text-dark mb-4">
            Claim Your Health Credits
          </h2>
          <SectionDivider />
          <p className="text-sm text-text-muted mt-4 max-w-md mx-auto">
            Fill in your details to receive your unique AED 1,000 Health Credit voucher. Limited to 2,500 beneficiaries.
          </p>
        </div>

        {/* Form card */}
        <div className="max-w-lg mx-auto relative">
          {/* Urgency badge */}
          <div
            className="absolute -top-3 right-4 z-20"
            style={{
              background: "#E8735A",
              color: "#fff",
              padding: "4px 14px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: 4,
            }}
          >
            Limited Availability
          </div>

          <div className="bg-white border-2 border-gold-primary p-8 relative overflow-hidden" style={{ borderRadius: 14 }}>
            <AnimatePresence mode="wait">
              {showForm && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {formState === "cap_reached" ? (
                    <div className="text-center py-8">
                      <p className="font-cormorant font-bold text-2xl text-text-dark mb-3">
                        All Spots Claimed
                      </p>
                      <p className="text-sm text-text-body">
                        All 2,500 health credit spots have been claimed. Follow us for future initiatives.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      {formState === "error" && (
                        <div className="bg-red-50 border border-coral text-coral text-xs p-3 mb-4">
                          Something went wrong. Please try again.
                        </div>
                      )}

                      <Input
                        label="Full Name"
                        placeholder="Your full name"
                        error={errors.fullName?.message}
                        required
                        {...register("fullName")}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="your@email.com"
                        error={errors.email?.message}
                        required
                        {...register("email")}
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="501234567"
                        prefix="+971"
                        error={errors.phone?.message}
                        required
                        {...register("phone")}
                      />

                      <Input
                        label="Emirates ID (Optional)"
                        placeholder="784-XXXX-XXXXXXX-X"
                        error={errors.emiratesId?.message}
                        {...register("emiratesId")}
                      />

                      {/* Language select */}
                      <div className="flex flex-col gap-1.5 mb-6">
                        <label className="text-xs font-medium uppercase tracking-widest text-forest-green">
                          Preferred Language
                        </label>
                        <select
                          className="form-input"
                          {...register("preferredLanguage")}
                        >
                          <option value="en">English</option>
                          <option value="ar">العربية (Arabic)</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        loading={formState === "submitting"}
                        className="w-full"
                      >
                        Claim Your AED 1,000 Health Credits
                      </Button>

                      <SpotCounter className="mt-4 text-center" />

                      {/* Share page with friends */}
                      <div className="mt-4 pt-4 border-t border-gold-light/30 text-center">
                        <p className="text-[11px] text-text-muted mb-2">Know someone who'd benefit?</p>
                        <button
                          type="button"
                          onClick={handleSharePage}
                          className="inline-flex items-center gap-2 text-[11px] font-semibold text-white px-4 py-2"
                          style={{ background: "#25D366", borderRadius: 4 }}
                        >
                          <Share2 size={13} />
                          Share with Friends on WhatsApp
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}

              {showSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center text-center gap-5 py-4"
                >
                  {/* Check icon */}
                  <div className="w-16 h-16 rounded-full bg-forest-green flex items-center justify-center">
                    <CheckCircle2 size={36} color="#FDF6EC" />
                  </div>

                  <div>
                    <h3 className="font-cormorant font-bold text-3xl text-text-dark mb-1">
                      {formState === "duplicate" ? "Already Registered!" : "You're In!"}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {formState === "duplicate"
                        ? "You've already registered. Here's your existing voucher:"
                        : "Your Health Credit has been reserved. Your voucher ID:"}
                    </p>
                  </div>

                  {/* Voucher ID display */}
                  {voucherId && (
                    <div className="font-cormorant font-bold text-4xl gold-gradient-text tracking-widest">
                      {voucherId}
                    </div>
                  )}

                  {/* Voucher card */}
                  <div className="w-full max-w-xs">
                    <VoucherCard
                      voucherId={voucherId}
                      holderName={submittedName}
                    />
                  </div>

                  {/* Instructions */}
                  <p className="text-xs text-text-body max-w-xs leading-relaxed">
                    Show this ID along with a{" "}
                    <strong>valid ID</strong> at{" "}
                    <strong>Aries Dental and Aesthetic Clinic</strong> to redeem
                    your AED 1,000 health credits.
                  </p>

                  {/* WhatsApp share */}
                  <button
                    onClick={handleWhatsAppShare}
                    className="flex items-center gap-2 text-xs font-semibold text-white px-5 py-3"
                    style={{ background: "#25D366" }}
                  >
                    <Share2 size={14} />
                    Share with Friends on WhatsApp
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust signals */}
          <div className="text-center mt-4 flex flex-col items-center gap-1">
            <p className="text-xs text-text-muted tracking-wide">
              No payment required &nbsp;·&nbsp; Instant confirmation &nbsp;·&nbsp; Redeemable immediately
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold-dark font-medium">
              For UAE Nationals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
