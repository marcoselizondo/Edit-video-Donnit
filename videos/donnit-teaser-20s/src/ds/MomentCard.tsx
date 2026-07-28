import React from "react";
import { Icon } from "./Icon";

// Portado de MomentCard.jsx (Donnit DS) — estilos inline con tokens var(--).
const MOMENTS: Record<string, { emoji: string; from: string; to: string }> = {
  playa: { emoji: "🏖️", from: "#52B788", to: "#2E9E8C" },
  noche: { emoji: "🌙", from: "#6C7BD6", to: "#4D5BB0" },
  montana: { emoji: "⛰️", from: "#2D6A4F", to: "#1B4332" },
  fiesta: { emoji: "🎉", from: "#F4A261", to: "#E07B4A" },
  camping: { emoji: "🏕️", from: "#52B788", to: "#1F7E70" },
  default: { emoji: "✨", from: "#52B788", to: "#2E9E8C" },
};

export const MomentCard: React.FC<{
  moment?: string;
  name: string;
  count?: number;
  locked?: boolean;
  style?: React.CSSProperties;
}> = ({ moment = "default", name, count, locked = false, style }) => {
  const m = MOMENTS[moment] || MOMENTS.default;
  const bg = locked
    ? "linear-gradient(160deg, #E7EAE8 0%, #D6DCD8 100%)"
    : `linear-gradient(160deg, ${m.from} 0%, ${m.to} 100%)`;

  return (
    <div
      style={{
        position: "relative",
        textAlign: "left",
        aspectRatio: "1 / 1",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        padding: 16,
        background: bg,
        boxShadow: locked ? "none" : "var(--shadow-low)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: '"Noto Color Emoji"',
          fontSize: 38,
          lineHeight: 1,
          filter: locked ? "grayscale(1) opacity(0.55)" : "none",
        }}
      >
        {m.emoji}
      </span>
      <div>
        <div
          style={{
            font: "var(--fw-bold) 19px var(--font-display)",
            color: locked ? "var(--text-secondary)" : "var(--white)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            font: "var(--fw-medium) 13px var(--font-body)",
            color: locked ? "var(--text-muted)" : "rgba(255,255,255,0.9)",
            marginTop: 2,
          }}
        >
          {locked ? "Próximamente" : `${count} objetos disponibles`}
        </div>
      </div>
      {locked && (
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            borderRadius: "var(--radius-pill)",
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="lock-simple" size={15} color="var(--text-secondary)" />
        </span>
      )}
    </div>
  );
};
