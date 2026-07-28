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
import { loadFonts } from "../load-fonts";
import { COLORS, FONTS } from "../theme";
import { KineticWords, Token } from "../components/Kinetic";
import { PressButton } from "./PressButton";

// Callout de CO₂ que sale del badge de la ficha
const Co2Callout: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 12 } });
  const up = interpolate(frame - at, [0, 40], [0, -70], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(frame - at, [0, 8, 70, 82], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 300,
        top: 560,
        transform: `translateY(${up}px) scale(${s})`,
        opacity: o,
        padding: "16px 26px",
        borderRadius: 999,
        background: COLORS.green,
        color: COLORS.greenInk,
        fontFamily: FONTS.display,
        fontWeight: 800,
        fontSize: 46,
        boxShadow: "0 16px 40px rgba(111,191,106,0.5)",
        whiteSpace: "nowrap",
      }}
    >
      +60 créditos CO₂
    </div>
  );
};

// Teléfono con la ficha real + botón que se hunde
const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, mass: 1.2, stiffness: 60 } });
  const y = interpolate(enter, [0, 1], [120, 0]);
  const W = 680, H = 1400, bez = 18;
  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - W - bez * 2) / 2,
        top: (1920 - H - bez * 2) / 2,
        transform: `translateY(${y}px)`,
        opacity: enter,
      }}
    >
      <div
        style={{
          width: W + bez * 2,
          height: H + bez * 2,
          borderRadius: 84,
          background: "linear-gradient(160deg,#20242b,#0c0e12)",
          padding: bez,
          boxShadow: "0 50px 110px rgba(23,51,31,0.34)",
        }}
      >
        <div style={{ width: W, height: H, borderRadius: 66, overflow: "hidden", background: "#fff", position: "relative" }}>
          <Img src={staticFile("clip2/item_detail.png")} style={{ width: "100%", display: "block" }} />
          {/* botón dibujado en la zona blanca inferior */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 42, display: "flex", justifyContent: "center" }}>
            <PressButton pressAt={112} width={W - 120} />
          </div>
          {/* isla dinámica */}
          <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 116, height: 32, borderRadius: 999, background: "#000" }} />
        </div>
      </div>
    </div>
  );
};

// Demo de las 3 animaciones nuevas + verde libre (#8FD678) / verde bosque (#1B4332)
const intro: Token[] = [
  // ensamblado: las letras forman "Dona" (verde libre, sobre la foto oscura)
  { text: "Dona", x: 27, y: 15, size: 158, delay: 6, color: COLORS.green, entrance: "assemble", perChar: 3, exitAt: 92 },
  // rebote
  { text: "hoy", x: 67, y: 26, size: 110, delay: 24, color: COLORS.green, entrance: "bounce", exitAt: 92 },
];
const mid: Token[] = [
  // máquina de escribir (verde bosque, sobre zona clara)
  { text: "suma impacto", x: 32, y: 41, size: 70, delay: 52, color: COLORS.ink, entrance: "typewriter", perChar: 3, exitAt: 150 },
];
const payoff: Token[] = [
  { text: "para cuando llegue", x: 35, y: 72, size: 52, delay: 158, color: COLORS.ink, entrance: "fromLeft" },
  // ensamblado en turquesa para la palabra estrella
  { text: "Moments", x: 60, y: 82, size: 150, delay: 168, color: COLORS.turquoiseDeep, entrance: "assemble", perChar: 3 },
];

export const ProtoFeel: React.FC = () => {
  loadFonts();
  const frame = useCurrentFrame();
  // leve tinte turquesa al final (aparece Moments)
  const turq = interpolate(frame, [160, 200], [0, 0.16], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, var(--bg-app-tint), var(--bg-app))` }}>
      <AbsoluteFill style={{ background: COLORS.turquoise, opacity: turq }} />
      <Phone />
      <Co2Callout at={46} />
      <KineticWords tokens={intro} />
      <KineticWords tokens={mid} />
      <KineticWords tokens={payoff} />
    </AbsoluteFill>
  );
};
