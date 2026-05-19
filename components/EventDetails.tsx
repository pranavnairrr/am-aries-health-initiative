import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import SectionDivider from "./ui/SectionDivider";

const events = [
  {
    icon: <Clock size={22} color="#FDF6EC" />,
    label: "Event Time",
    value: "Wednesday 7 PM",
    sub: "Followed by Dinner",
    subColor: "#E8735A",
  },
  {
    icon: <MapPin size={22} color="#FDF6EC" />,
    label: "Venue",
    value: "HT1, Emirates Hills",
    sub: null,
    subColor: null,
  },
  {
    icon: <Phone size={22} color="#FDF6EC" />,
    label: "RSVP",
    value: "+971 554 560 554",
    href: "tel:+971554560554",
    sub: null,
    subColor: null,
  },
];

export default function EventDetails() {
  return (
    <section className="bg-cream section-pad relative overflow-hidden">
      {/* Botanical leaf decorations */}
      <BotanicalLeaf side="left" />
      <BotanicalLeaf side="right" />

      <div className="content-max px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-dark mb-3">
            In-Person Event
          </p>
          <h2 className="font-cormorant font-bold text-4xl md:text-5xl text-text-dark mb-4">
            Join Us in Person
          </h2>
          <SectionDivider />
          <p className="text-sm text-text-muted mt-4">
            Honoring the Spirit of Inclusion, Unity, and Support
          </p>
        </div>

        {/* 2-column: clinic photo left, event details right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Clinic photo */}
          <div className="relative" style={{ borderRadius: 14, overflow: "hidden" }}>
            {/* Gold border frame */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 14,
                border: "1px solid rgba(197,165,90,0.4)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <Image
              src="/images/clinic.png"
              alt="Aries Dental and Aesthetic Clinic — JBR Dubai"
              width={700}
              height={467}
              className="w-full object-cover"
              style={{
                borderRadius: 14,
                display: "block",
                boxShadow: "0 16px 48px rgba(27,77,62,0.18)",
              }}
            />
            {/* Location caption pill */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                background: "rgba(15,58,46,0.88)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(197,165,90,0.35)",
                borderRadius: 8,
                padding: "7px 14px",
                zIndex: 3,
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold-light font-medium">
                📍 JBR, Dubai
              </p>
              <p className="text-xs text-cream font-cormorant font-semibold">
                Aries Dental &amp; Aesthetic Clinic
              </p>
            </div>
          </div>

          {/* Event details */}
          <div className="flex flex-col gap-7">
            {events.map((ev, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="event-icon-circle shrink-0">{ev.icon}</div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted mb-0.5">
                    {ev.label}
                  </p>
                  {ev.href ? (
                    <a
                      href={ev.href}
                      className="font-cormorant font-bold text-2xl text-text-dark hover:text-forest-green transition-colors"
                    >
                      {ev.value}
                    </a>
                  ) : (
                    <p className="font-cormorant font-bold text-2xl text-text-dark">
                      {ev.value}
                    </p>
                  )}
                  {ev.sub && (
                    <p
                      className="text-xs font-semibold mt-0.5"
                      style={{ color: ev.subColor ?? undefined }}
                    >
                      {ev.sub}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* CTA */}
            <a
              href="tel:+971554560554"
              className="btn-cta inline-flex w-fit mt-2 text-xs"
            >
              RSVP Now — +971 554 560 554
            </a>
          </div>
        </div>

        {/* Bottom taglines */}
        <div className="text-center mt-14">
          <SectionDivider />
          <p className="arabic-text text-base text-text-muted mt-5">
            معاً لمجتمع أكثر صحة وسعادة
          </p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mt-1">
            Together for a Healthier, Happier Community
          </p>
        </div>
      </div>
    </section>
  );
}

function BotanicalLeaf({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <svg
      width="160"
      height="280"
      viewBox="0 0 160 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        bottom: 0,
        [isLeft ? "left" : "right"]: -20,
        opacity: 0.12,
        transform: isLeft ? "none" : "scaleX(-1)",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <path d="M 80,280 C 80,200 40,160 20,60" stroke="#C5A55A" strokeWidth="2" fill="none" />
      {[
        { cx: 60, cy: 220, rx: 30, ry: 10, rot: -20 },
        { cx: 50, cy: 180, rx: 28, ry: 9, rot: -30 },
        { cx: 42, cy: 140, rx: 26, ry: 9, rot: -40 },
        { cx: 36, cy: 100, rx: 22, ry: 8, rot: -48 },
        { cx: 28, cy: 68, rx: 18, ry: 7, rot: -55 },
      ].map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.cx}
          cy={leaf.cy}
          rx={leaf.rx}
          ry={leaf.ry}
          transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
          fill="#C5A55A"
        />
      ))}
    </svg>
  );
}
