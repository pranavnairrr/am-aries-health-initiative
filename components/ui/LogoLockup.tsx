import Image from "next/image";

interface LogoLockupProps {
  variant?: "dark" | "light";
  width?: number;
  className?: string;
}

export default function LogoLockup({
  variant = "dark",
  width = 340,
  className = "",
}: LogoLockupProps) {
  const height = Math.round(width * (113 / 340));

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Aries Dental and AM Health Hub — Powered by Aries & Macins Group"
        width={width}
        height={height}
        priority
        style={
          variant === "light"
            ? { filter: "brightness(0) invert(1)" }
            : { mixBlendMode: "multiply" }
        }
      />
    </div>
  );
}
