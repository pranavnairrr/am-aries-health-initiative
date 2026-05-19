import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
}

export default function Input({
  label,
  error,
  prefix,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label
        htmlFor={inputId}
        className="text-xs font-medium uppercase tracking-widest text-forest-green"
      >
        {label}
        {props.required && <span className="text-coral ml-1">*</span>}
      </label>
      <div className="flex">
        {prefix && (
          <div className="flex items-center px-3 bg-cream-dark border border-r-0 border-gold-light text-text-body text-sm font-medium shrink-0" style={{ borderRadius: "6px 0 0 6px" }}>
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          className={`form-input ${error ? "input-error" : ""} ${className}`}
          style={prefix ? { borderRadius: "0 6px 6px 0" } : undefined}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-coral mt-0.5">{error}</p>
      )}
    </div>
  );
}
