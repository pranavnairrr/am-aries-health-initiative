import LogoLockup from "./ui/LogoLockup";
import SectionDivider from "./ui/SectionDivider";

export default function Footer() {
  return (
    <footer className="bg-deep-evergreen text-cream py-16 px-6">
      <div className="content-max flex flex-col items-center text-center gap-6">
        {/* Logo */}
        <LogoLockup variant="light" width={280} />

        {/* Main tagline */}
        <p className="font-cormorant text-2xl font-medium text-cream opacity-90 max-w-md leading-snug">
          Honoring the Spirit of Inclusion, Unity, and Support
        </p>

        <SectionDivider className="opacity-40" />

        {/* Arabic tagline */}
        <p className="arabic-text text-base opacity-70">
          معاً لمجتمع أكثر صحة وسعادة
        </p>
        <p className="text-[10px] uppercase tracking-[0.18em] opacity-50 -mt-4">
          Together for a Healthier, Happier Community
        </p>

        {/* Contact */}
        <a
          href="tel:+971554560554"
          className="text-sm opacity-70 hover:opacity-100 transition-opacity tracking-wide"
        >
          +971 554 560 554
        </a>

        <div className="w-full h-px bg-cream opacity-10" />

        {/* Copyright */}
        <div className="flex flex-col gap-1 opacity-50 text-[11px] tracking-wide">
          <p>
            © 2026 Aries Dental and Aesthetic Clinic &amp; AM Health Hub. All rights reserved.
          </p>
          <p>Powered by Aries &amp; Macins Group</p>
        </div>
      </div>
    </footer>
  );
}
