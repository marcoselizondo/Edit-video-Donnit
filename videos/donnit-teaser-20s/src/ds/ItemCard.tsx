import React from "react";
import { Icon } from "./Icon";
import { Badge } from "./Badge";

// Portado de ItemCard.jsx (Donnit DS) — la card de donar (feed). Verde.
export const ItemCard: React.FC<{
  image?: string;
  emoji?: string; // alternativa a foto: emoji sobre gradiente de marca
  emojiBg?: string;
  title: string;
  neighborhood?: string;
  distance?: string;
  badge?: { label: string; tone?: string };
  dots?: number;
  activeDot?: number;
  style?: React.CSSProperties;
}> = ({ image, emoji, emojiBg, title, neighborhood, distance, badge, dots = 0, activeDot = 0, style }) => {
  const meta = [neighborhood, distance].filter(Boolean).join(" · ");
  return (
    <article
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius-xl)",
        padding: 12,
        boxShadow: "var(--shadow-low)",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          aspectRatio: "4 / 3",
          background: "var(--surface-sunken)",
        }}
      >
        {image ? (
          <img
            src={image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : emoji ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                emojiBg || "linear-gradient(160deg, var(--green-200), var(--green-100))",
              fontFamily: '"Noto Color Emoji"',
              fontSize: 72,
            }}
          >
            {emoji}
          </div>
        ) : null}
        {badge && (
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <Badge tone={badge.tone}>{badge.label}</Badge>
          </div>
        )}
      </div>
      {dots > 1 && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "12px 0 4px" }}>
          {Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: i === activeDot ? "var(--brand)" : "var(--brand-deep)",
                opacity: i === activeDot ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      )}
      <div style={{ padding: "10px 6px 6px" }}>
        <h3
          style={{
            margin: 0,
            font: "var(--fw-bold) 19px var(--font-display)",
            color: "var(--text-brand)",
          }}
        >
          {title}
        </h3>
        {meta && (
          <p
            style={{
              margin: "8px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 6,
              font: "var(--fw-regular) 15px var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            <Icon name="map-pin" size={18} color="var(--brand)" />
            {meta}
          </p>
        )}
      </div>
    </article>
  );
};
