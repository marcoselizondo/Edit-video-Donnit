import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";
import { Grain } from "./atmosphere";

// ═══════════════════════════════════════════════════════════════════════════
//  GlowReveal — revelado de marca con glow (estética ref. Higgsfield MCP)
//  100% Remotion (sin servicios externos, sin créditos). Parametrizable para
//  reutilizarlo como cierre de cualquier video (p.ej. el institucional).
//
//  Capas (de atrás hacia delante):
//   1. Fondo radial oscuro de marca.
//   2. Aros de energía que se expanden.
//   3. Halo desenfocado que "respira" (pulso sinusoidal).
//   4. Logo con glow + wordmark.
//   5. Tagline a dos colores (donar / alquilar) que se revela.
//   6. Subtítulo/CTA opcional.
//   7. Grano de película.
// ═══════════════════════════════════════════════════════════════════════════

export type TaglinePart = { text: string; color: string };

export const GlowReveal: React.FC<{
  logoSrc?: string;
  title: string;
  tagline?: TaglinePart[];
  subline?: string;
  bgInner?: string;
  bgOuter?: string;
  glow?: string;
  ring?: string;
  titleColor?: string;
}> = ({
  logoSrc = "DonnitLogo.png",
  title,
  tagline,
  subline,
  bgInner = COLORS.green600,
  bgOuter = COLORS.green900,
  glow = "rgba(143,214,120,",
  ring = "rgba(143,214,120,",
  titleColor = "#fff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logo = spring({ frame, fps, config: { damping: 13, mass: 0.9 } });
  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 10);
  const line = interpolate(frame, [22, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub = spring({ frame: frame - 48, fps, config: { damping: 16 } });
  const ringIn = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(80% 60% at 50% 42%, ${bgInner} 0%, ${bgOuter} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 70px",
        overflow: "hidden",
      }}
    >
      {/* aros de energía */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            width: 420 + i * 220,
            height: 420 + i * 220,
            marginLeft: -(420 + i * 220) / 2,
            marginTop: -(420 + i * 220) / 2,
            borderRadius: "50%",
            border: `2px solid ${ring}${0.25 - i * 0.07})`,
            transform: `scale(${interpolate(ringIn, [0, 1], [0.4, 1])})`,
            opacity: ringIn,
          }}
        />
      ))}

      {/* halo que respira */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 700,
          height: 700,
          transform: "translate(-50%,-50%)",
          filter: "blur(90px)",
          background: `radial-gradient(circle, ${glow}${0.45 * glowPulse}) 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      {logoSrc ? (
        <Img
          src={staticFile(logoSrc)}
          style={{
            width: 250,
            height: 250,
            borderRadius: 58,
            transform: `scale(${logo})`,
            boxShadow: `0 0 ${60 + glowPulse * 40}px ${glow}0.7), 0 30px 70px rgba(0,0,0,0.4)`,
            position: "relative",
          }}
        />
      ) : null}

      <div
        style={{
          marginTop: 26,
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 118,
          color: titleColor,
          letterSpacing: -4,
          opacity: logo,
          position: "relative",
        }}
      >
        {title}
      </div>

      {tagline ? (
        <div
          style={{
            marginTop: 18,
            maxWidth: 900,
            textAlign: "center",
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1.18,
            opacity: line,
            position: "relative",
          }}
        >
          {tagline.map((p, i) => (
            <span key={i} style={{ color: p.color }}>
              {p.text}
            </span>
          ))}
        </div>
      ) : null}

      {subline ? (
        <>
          <div style={{ height: 48 }} />
          <div
            style={{
              fontFamily: FONTS.body,
              fontWeight: 700,
              fontSize: 40,
              color: "rgba(255,255,255,0.88)",
              opacity: sub,
              transform: `translateY(${(1 - sub) * 20}px)`,
              position: "relative",
              textAlign: "center",
            }}
          >
            {subline}
          </div>
        </>
      ) : null}

      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
