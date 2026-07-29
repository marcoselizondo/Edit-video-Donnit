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

const PROMPT = "¿Qué hago con los objetos\nque ya no uso?";

// INTRO: se escribe una frase (estilo prompt de IA) y la respuesta es "Donnit".
export const IntroChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxIn = spring({ frame, fps, config: { damping: 16 } });
  const chars = [...PROMPT];
  const shown = Math.max(0, Math.min(chars.length, Math.floor((frame - 8) / 1.9)));
  const typedDone = shown >= chars.length; // ~ frame 86
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  // el prompt se va hacia arriba al "enviar"
  const sendUp = interpolate(frame, [92, 104], [0, -140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const promptFade = interpolate(frame, [92, 108], [1, 0.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "pensando" (puntos) entre enviar y responder
  const thinking = interpolate(frame, [96, 104, 116, 122], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // respuesta: Donnit
  const rev = spring({ frame: frame - 120, fps, config: { damping: 12, mass: 0.9 } });
  const revO = interpolate(frame - 120, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#0C1611", justifyContent: "center", alignItems: "center", fontFamily: FONTS.display }}>
      {/* glow verde de fondo */}
      <AbsoluteFill style={{ background: "radial-gradient(50% 40% at 50% 46%, rgba(143,214,120,0.18), rgba(0,0,0,0) 70%)" }} />

      {/* caja del prompt */}
      <div
        style={{
          position: "absolute",
          width: 820,
          transform: `translateY(${sendUp}px) scale(${interpolate(boxIn, [0, 1], [0.9, 1])})`,
          opacity: boxIn * promptFade,
          background: "rgba(255,255,255,0.05)",
          border: "1.5px solid rgba(255,255,255,0.14)",
          borderRadius: 26,
          padding: "34px 38px",
          backdropFilter: "blur(4px)",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, color: COLORS.green, marginBottom: 16, textTransform: "uppercase" }}>
          Tú
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#EAF3EC", lineHeight: 1.25, whiteSpace: "pre-wrap" }}>
          {chars.slice(0, shown).join("")}
          <span style={{ opacity: caretOn && !typedDone ? 1 : (typedDone ? 0 : 0), color: COLORS.green }}>|</span>
        </div>
      </div>

      {/* pensando */}
      <div style={{ position: "absolute", top: "42%", display: "flex", gap: 14, opacity: thinking }}>
        {[0, 1, 2].map((i) => {
          const p = interpolate((frame - i * 5) % 30, [0, 15, 30], [0.3, 1, 0.3]);
          return <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: COLORS.green, opacity: p }} />;
        })}
      </div>

      {/* respuesta: Donnit */}
      <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", opacity: revO, transform: `scale(${interpolate(rev, [0, 1], [0.7, 1])})` }}>
        <Img src={staticFile("DonnitLogo.png")} style={{ width: 150, height: 150, borderRadius: 36, marginBottom: 20, boxShadow: "0 0 60px rgba(143,214,120,0.6)" }} />
        <div style={{ fontSize: 190, fontWeight: 900, color: COLORS.green, letterSpacing: -4, textShadow: "0 0 40px rgba(143,214,120,0.55)" }}>
          Donnit
        </div>
      </div>
    </AbsoluteFill>
  );
};
