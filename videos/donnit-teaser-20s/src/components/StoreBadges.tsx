import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../theme";

const Badge: React.FC<{ top: string; big: string; delay: number }> = ({
  top,
  big,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        transform: `translateY(${(1 - s) * 30}px)`,
        opacity: s,
        padding: "16px 30px",
        borderRadius: 20,
        background: "#17331F",
        color: "#fff",
        minWidth: 290,
        textAlign: "left",
        lineHeight: 1.1,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.body,
          fontWeight: 500,
          fontSize: 24,
          opacity: 0.85,
        }}
      >
        {top}
      </div>
      <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 40 }}>
        {big}
      </div>
    </div>
  );
};

// NOTA: para publicar, reemplazar por los badges oficiales de Apple/Google.
export const StoreBadges: React.FC = () => (
  <div style={{ display: "flex", gap: 26, justifyContent: "center" }}>
    <Badge top="Descárgala en" big="App Store" delay={8} />
    <Badge top="Disponible en" big="Google Play" delay={14} />
  </div>
);
