import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../theme";

// Subtítulo grande y legible (la mayoría ve sin sonido).
export const Caption: React.FC<{
  children: React.ReactNode;
  accent?: string;
  color?: string;
  bottom?: number;
  size?: number;
  startAt?: number;
}> = ({
  children,
  accent = COLORS.greenDeep,
  color = COLORS.ink,
  bottom = 150,
  size = 74,
  startAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - startAt,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  const y = interpolate(s, [0, 1], [40, 0]);
  const opacity = interpolate(frame - startAt, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom,
        textAlign: "center",
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "22px 34px",
          borderRadius: 28,
          background: "rgba(255,255,255,0.86)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 18px 50px rgba(23,51,31,0.16)",
          borderBottom: `6px solid ${accent}`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: size,
            lineHeight: 1.05,
            color,
            letterSpacing: -1,
          }}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

// Palabra resaltada dentro de un Caption.
export const Hi: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = COLORS.greenDeep,
}) => <span style={{ color }}>{children}</span>;
