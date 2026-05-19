"use client";

import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const sizeClass = size === "lg" ? "py-5 px-10 text-sm" : "py-4 px-10 text-sm";
  const variantClass = variant === "ghost" ? "btn-ghost" : "";

  return (
    <button
      className={`btn-cta ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
}: {
  href: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
}) {
  const sizeClass = size === "lg" ? "py-5 px-10 text-sm" : "py-4 px-10 text-sm";
  const variantClass = variant === "ghost" ? "btn-ghost" : "";

  return (
    <a href={href} className={`btn-cta ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </a>
  );
}
