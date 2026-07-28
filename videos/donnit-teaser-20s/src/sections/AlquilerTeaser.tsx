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

const ObjectChip: React.FC<{ label: string; delay: number }> = ({
  label,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
  return (
    <div
      style={{
        transform: `translateY(${(1 - s) * 40}px)`,
        opacity: s,
        padding: "20px 34px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.18)",
        border: "2px solid rgba(255,255,255,0.55)",
        color: "#fff",
        fontFamily: FONTS.body,
        fontWeight: 700,
        fontSize: 40,
      }}
    >
      {label}
    </div>
  );
};

// ALQUILAR · teaser "Moments" (turquesa) — 100% motion graphics, "llega pronto"
export const AlquilerTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useEdgeFade();

  const pill = spring({ frame: frame - 4, fps, config: { damping: 16 } });
  const title = spring({ frame: frame - 16, fps, config: { damping: 18, mass: 0.8 } });
  const titleClip = interpolate(title, [0, 1], [100, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `linear-gradient(160deg, ${COLORS.turquoise} 0%, ${COLORS.turquoiseDeep} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 70px",
      }}
    >
      <div
        style={{
          transform: `scale(${pill})`,
          padding: "14px 30px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.22)",
          color: "#fff",
          fontFamily: FONTS.body,
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: 4,
          marginBottom: 34,
        }}
      >
        PRÓXIMAMENTE
      </div>

      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            transform: `translateY(${titleClip}px)`,
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: 180,
            color: "#fff",
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          Moments
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          maxWidth: 900,
          textAlign: "center",
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: 60,
          color: "#fff",
          lineHeight: 1.1,
          opacity: interpolate(frame, [30, 44], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Alquila lo que necesitas
      </div>

      <div
        style={{
          marginTop: 44,
          display: "flex",
          gap: 22,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ObjectChip label="Un taladro" delay={44} />
        <ObjectChip label="Una tabla de paddle" delay={52} />
        <ObjectChip label="Una tienda de campaña" delay={60} />
      </div>

      <div
        style={{
          marginTop: 40,
          fontFamily: FONTS.body,
          fontWeight: 600,
          fontSize: 38,
          color: "rgba(255,255,255,0.9)",
          opacity: interpolate(frame, [66, 80], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        …en vez de comprarlo. Llega pronto.
      </div>
    </AbsoluteFill>
  );
};
