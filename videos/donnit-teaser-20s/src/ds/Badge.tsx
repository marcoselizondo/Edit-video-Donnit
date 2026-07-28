import React from "react";

// Portado de Badge.jsx (Donnit DS).
const TONES: Record<string, { bg: string; fg: string; border: string }> = {
  available: { bg: "var(--brand)", fg: "var(--white)", border: "transparent" },
  new: { bg: "var(--brand)", fg: "var(--white)", border: "transparent" },
  premium: { bg: "var(--warning)", fg: "#5A3210", border: "transparent" },
  popular: { bg: "transparent", fg: "var(--danger)", border: "var(--danger)" },
  mint: { bg: "var(--brand-mint)", fg: "var(--brand-deep)", border: "transparent" },
  info: { bg: "var(--info-soft)", fg: "var(--info)", border: "transparent" },
  success: { bg: "var(--success-soft)", fg: "var(--success)", border: "transparent" },
  neutral: { bg: "var(--surface-sunken)", fg: "var(--text-secondary)", border: "transparent" },
  reserved: { bg: "var(--amber-soft)", fg: "#8A5A20", border: "transparent" },
  rent: { bg: "var(--rent)", fg: "var(--on-rent)", border: "transparent" },
};

export const Badge: React.FC<{
  children: React.ReactNode;
  tone?: string;
  dot?: boolean;
  style?: React.CSSProperties;
}> = ({ children, tone = "neutral", dot = false, style }) => {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        height: 26,
        padding: "0 11px",
        background: t.bg,
        color: t.fg,
        border: `1.5px solid ${t.border}`,
        borderRadius: "var(--radius-pill)",
        font: "var(--fw-semibold) 13px var(--font-body)",
        whiteSpace: "nowrap",
        lineHeight: 1,
        ...style,
      }}
    >
      {dot && (
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
      )}
      {children}
    </span>
  );
};
