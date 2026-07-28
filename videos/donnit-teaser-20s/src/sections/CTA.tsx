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
import { StoreBadges } from "../components/StoreBadges";
import { useEdgeFade } from "../util";

// CIERRE · logo + frase de marca + CTA (app actual)
export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useEdgeFade(8, 6);

  const logo = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const line = interpolate(frame, [18, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const cta = spring({ frame: frame - 40, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `linear-gradient(160deg, ${COLORS.bgLight} 0%, ${COLORS.bgWarm} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 70px",
      }}
    >
      <Img
        src={staticFile("DonnitLogo.png")}
        style={{
          width: 260,
          height: 260,
          borderRadius: 60,
          transform: `scale(${logo})`,
          boxShadow: "0 30px 70px rgba(79,169,91,0.4)",
        }}
      />
      <div
        style={{
          marginTop: 26,
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 100,
          color: COLORS.greenInk,
          letterSpacing: -3,
          opacity: logo,
        }}
      >
        donnit
      </div>

      {/* frase de marca: verde = donar, turquesa = alquilar (con criterio) */}
      <div
        style={{
          marginTop: 20,
          maxWidth: 860,
          textAlign: "center",
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.15,
          opacity: line,
        }}
      >
        <span style={{ color: COLORS.greenDeep }}>Dona lo que no usas</span>
        <span style={{ color: COLORS.ink }}>, </span>
        <span style={{ color: COLORS.turquoiseDeep }}>
          alquila lo que necesitas
        </span>
      </div>

      <div style={{ height: 56 }} />
      <div style={{ transform: `translateY(${(1 - cta) * 24}px)`, opacity: cta }}>
        <StoreBadges />
      </div>
      <div
        style={{
          marginTop: 34,
          fontFamily: FONTS.body,
          fontWeight: 700,
          fontSize: 40,
          color: COLORS.inkSoft,
          opacity: cta,
        }}
      >
        Descarga Donnit · ya disponible
      </div>
    </AbsoluteFill>
  );
};
