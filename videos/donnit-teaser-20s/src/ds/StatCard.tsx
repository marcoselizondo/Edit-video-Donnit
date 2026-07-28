import React from "react";
import { Icon } from "./Icon";

// Portado de StatCard.jsx (Donnit DS) — tile de impacto (perfil).
export const StatCard: React.FC<{
  value: React.ReactNode;
  label: string;
  icon?: string; // nombre de Icon
  tone?: "neutral" | "mint";
  style?: React.CSSProperties;
}> = ({ value, label, icon, tone = "neutral", style }) => {
  const tones = {
    neutral: { bg: "var(--surface)", fg: "var(--text-strong)", accent: "var(--brand)" },
    mint: { bg: "var(--brand-mint)", fg: "var(--brand-deep)", accent: "var(--brand-deep)" },
  } as const;
  const t = tones[tone] || tones.neutral;
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: t.bg,
        borderRadius: "var(--radius-lg)",
        padding: "16px 14px",
        boxShadow: tone === "neutral" ? "var(--shadow-low)" : "none",
        ...style,
      }}
    >
      {icon && (
        <div style={{ marginBottom: 8 }}>
          <Icon name={icon} size={22} color={t.accent} />
        </div>
      )}
      <div style={{ font: "var(--fw-bold) 26px var(--font-display)", color: t.fg }}>{value}</div>
      <div style={{ font: "var(--type-caption)", color: "var(--text-secondary)", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
};
