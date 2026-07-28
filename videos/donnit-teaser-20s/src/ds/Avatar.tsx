import React from "react";
import { Icon } from "./Icon";

// Portado de Avatar.jsx (Donnit DS).
export const Avatar: React.FC<{
  src?: string;
  name?: string;
  size?: number;
  badge?: "verified" | "online";
  ring?: boolean;
  style?: React.CSSProperties;
}> = ({ src, name = "", size = 44, badge, ring = false, style }) => {
  const d = size;
  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div style={{ position: "relative", width: d, height: d, flex: "none", ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "var(--radius-pill)",
          overflow: "hidden",
          background: "var(--brand-mint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: ring ? "2.5px solid var(--surface)" : "none",
          boxShadow: ring ? "var(--shadow-low)" : "none",
        }}
      >
        {src ? (
          <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span
            style={{
              font: `var(--fw-bold) ${Math.round(d * 0.38)}px var(--font-display)`,
              color: "var(--brand-deep)",
            }}
          >
            {initials}
          </span>
        )}
      </div>
      {badge === "verified" && (
        <span
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: Math.max(16, d * 0.34),
            height: Math.max(16, d * 0.34),
            borderRadius: "50%",
            background: "var(--brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid var(--surface)",
          }}
        >
          <Icon name="check" size={Math.max(8, d * 0.18)} color="var(--white)" />
        </span>
      )}
    </div>
  );
};
