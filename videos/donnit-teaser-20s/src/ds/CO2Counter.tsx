import React from "react";

// Portado de CO2Counter.jsx (Donnit DS). La animación RAF se sustituye por el
// valor `value` que controla Remotion frame a frame.
export const CO2Counter: React.FC<{
  value?: number;
  unit?: string;
  caption?: string;
  title?: string;
  style?: React.CSSProperties;
}> = ({
  value = 0,
  unit = "kg CO₂",
  caption,
  title = "Tu impacto en Donnit",
  style,
}) => {
  const t = { bg: "var(--green-100)", border: "var(--green-300)", num: "var(--brand)" };
  return (
    <div
      style={{
        background: t.bg,
        border: `1.5px solid ${t.border}`,
        borderRadius: "var(--radius-xl)",
        padding: "20px 24px",
        textAlign: "center",
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            font: "var(--fw-bold) 16px var(--font-display)",
            color: "var(--text-strong)",
            marginBottom: 6,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          font: "var(--fw-bold) 34px/1.1 var(--font-display)",
          color: t.num,
          letterSpacing: "-0.01em",
        }}
      >
        {Math.round(value).toLocaleString("es-ES")} {unit}{" "}
        <span style={{ color: t.num }}>ahorrados</span>
      </div>
      {caption && (
        <div
          style={{
            font: "var(--fw-regular) 15px var(--font-body)",
            color: "var(--text-secondary)",
            marginTop: 8,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};
