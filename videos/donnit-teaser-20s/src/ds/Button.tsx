import React from "react";

// Portado de Button.jsx (Donnit DS).
const SIZES: Record<string, any> = {
  sm: { height: 32, padding: "0 14px", font: 14, radius: "var(--radius-md)", gap: 6 },
  md: { height: 44, padding: "0 20px", font: 15, radius: "var(--radius-md)", gap: 8 },
  lg: { height: 56, padding: "0 28px", font: 17, radius: "var(--radius-md)", gap: 10 },
};

const VARIANTS: Record<string, React.CSSProperties> = {
  primary: {
    background: "var(--brand)",
    color: "var(--text-on-brand)",
    border: "1px solid transparent",
    boxShadow: "0 1px 2px rgba(27,67,50,0.08)",
  },
  secondary: {
    background: "transparent",
    color: "var(--brand-strong)",
    border: "1.5px solid var(--brand-strong)",
  },
  rent: {
    background: "var(--rent)",
    color: "var(--on-rent)",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-med)",
  },
  dark: {
    background: "var(--surface-dark)",
    color: "var(--text-on-dark)",
    border: "1px solid transparent",
  },
};

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: string;
  size?: string;
  block?: boolean;
  pill?: boolean;
  leadingIcon?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, variant = "primary", size = "md", block = false, pill = false, leadingIcon, style }) => {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return (
    <div
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: s.font,
        lineHeight: 1,
        letterSpacing: "0.01em",
        borderRadius: pill ? "var(--radius-pill)" : s.radius,
        boxSizing: "border-box",
        ...v,
        ...style,
      }}
    >
      {leadingIcon && <span style={{ display: "inline-flex", fontSize: "1.15em" }}>{leadingIcon}</span>}
      {children}
    </div>
  );
};
