import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";
import { useEdgeFade } from "../util";

const Line: React.FC<{ text: string; delay: number; size: number }> = ({
  text,
  delay,
  size,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, mass: 0.6 },
  });
  return (
    <div
      style={{
        transform: `translateY(${(1 - s) * 60}px)`,
        opacity: interpolate(frame - delay, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        fontFamily: FONTS.display,
        fontWeight: 800,
        fontSize: size,
        color: "#fff",
        lineHeight: 1.02,
        letterSpacing: -2,
        textShadow: "0 10px 30px rgba(23,51,31,0.25)",
      }}
    >
      {text}
    </div>
  );
};

// HOOK (0–2s): tipográfico, en verde (lado donación).
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = useEdgeFade(1, 8);
  const zoom = interpolate(frame, [0, 66], [1, 1.08]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `linear-gradient(155deg, ${COLORS.green} 0%, ${COLORS.greenDeep} 100%)`,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 90px",
        transform: `scale(${zoom})`,
      }}
    >
      <div style={{ textAlign: "left" }}>
        <Line text="Eso que" delay={2} size={150} />
        <Line text="no usas…" delay={8} size={150} />
        <div style={{ height: 26 }} />
        <Line text="le sirve a" delay={30} size={110} />
        <Line text="tu vecino." delay={36} size={110} />
      </div>
    </AbsoluteFill>
  );
};
