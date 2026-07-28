import React from "react";

// Portado de MapPin.jsx (Donnit DS) — teardrop por categoría con la "d".
const CATEGORY_COLORS: Record<string, string> = {
  hogar: "var(--brand)",
  ropa: "var(--green-500)",
  tecnologia: "var(--info)",
  movilidad: "var(--amber)",
  default: "var(--brand)",
};

export const MapPin: React.FC<{
  category?: string;
  label?: string;
  selected?: boolean;
  style?: React.CSSProperties;
}> = ({ category = "default", label = "d", selected = false, style }) => {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  const d = 40;
  return (
    <div
      style={{
        position: "relative",
        width: d,
        height: d,
        transform: selected ? "scale(1.5)" : "scale(1)",
        transformOrigin: "bottom center",
        filter: "drop-shadow(0 4px 6px rgba(27,67,50,0.28))",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          borderRadius: "50% 50% 50% 4px",
          transform: "rotate(45deg)",
          border: selected ? "2.5px solid var(--green-500)" : "2px solid var(--white)",
          boxSizing: "border-box",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--white)",
        }}
      >
        <span style={{ font: "var(--fw-bold) 20px var(--font-display)", lineHeight: 1, marginTop: -2 }}>
          {label}
        </span>
      </span>
    </div>
  );
};
