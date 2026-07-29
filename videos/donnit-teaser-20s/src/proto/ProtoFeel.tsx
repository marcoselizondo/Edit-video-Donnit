import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFonts } from "../load-fonts";
import { COLORS, FONTS } from "../theme";
import { KineticWords, Token } from "../components/Kinetic";
import { PressButton } from "./PressButton";
import { IntroChat } from "./IntroChat";

// glow blanco para texto verde bosque sobre fondo oscuro (legible en oscuro y claro)
const GLOW = "0 0 2px #fff, 0 0 14px rgba(255,255,255,0.92), 0 0 34px rgba(255,255,255,0.5)";

const Co2Callout: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 12 } });
  const up = interpolate(frame - at, [0, 40], [0, -70], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(frame - at, [0, 8, 70, 82], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 300, top: 560, transform: `translateY(${up}px) scale(${s})`, opacity: o, padding: "16px 26px", borderRadius: 999, background: COLORS.green, color: COLORS.greenInk, fontFamily: FONTS.display, fontWeight: 800, fontSize: 46, boxShadow: "0 16px 50px rgba(143,214,120,0.6)", whiteSpace: "nowrap" }}>
      +60 créditos CO₂
    </div>
  );
};

const pulse = (frame: number, at: number, amp: number) =>
  interpolate(frame - at, [0, 8, 20], [0, amp, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = 680, H = 1400, bez = 18;
  const enter = spring({ frame, fps, config: { damping: 18, mass: 1.2, stiffness: 55 } });
  const focus = interpolate(enter, [0, 1], [1.34, 1]);
  const blur = interpolate(frame, [0, 22], [16, 0], { extrapolateRight: "clamp" });
  const push = interpolate(frame, [22, 150], [0, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const co2 = pulse(frame, 46, 0.07);
  const bz = interpolate(frame, [100, 120, 150, 168], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const btnScale = bz * 0.26;
  const btnPanY = bz * -320;
  const pull = interpolate(frame, [158, 178], [0, -0.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = focus * (1 + push + co2 + btnScale + pull);
  const driftX = Math.sin(frame / 22) * 5;
  const driftY = Math.cos(frame / 27) * 5;
  const driftR = Math.sin(frame / 33) * 0.4;

  return (
    <div style={{ position: "absolute", left: (1080 - W - bez * 2) / 2, top: (1920 - H - bez * 2) / 2, transformOrigin: "center center", transform: `translate(${driftX}px, ${btnPanY + driftY}px) rotate(${driftR}deg) scale(${scale})`, opacity: enter, filter: blur ? `blur(${blur}px)` : undefined }}>
      <div style={{ width: W + bez * 2, height: H + bez * 2, borderRadius: 84, background: "linear-gradient(160deg,#20242b,#0c0e12)", padding: bez, boxShadow: "0 50px 120px rgba(0,0,0,0.6)" }}>
        <div style={{ width: W, height: H, borderRadius: 66, overflow: "hidden", background: "#fff", position: "relative" }}>
          <Img src={staticFile("clip2/item_detail.png")} style={{ width: "100%", display: "block" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 42, display: "flex", justifyContent: "center" }}>
            <PressButton pressAt={112} width={W - 120} />
          </div>
          <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 116, height: 32, borderRadius: 999, background: "#000" }} />
        </div>
      </div>
    </div>
  );
};

const intro: Token[] = [
  { text: "Dona", x: 27, y: 15, size: 172, delay: 6, color: COLORS.green, weight: 900, entrance: "assemble", perChar: 3, exitAt: 92 },
  { text: "hoy", x: 67, y: 26, size: 120, delay: 24, color: COLORS.green, weight: 900, entrance: "bounce", exitAt: 92 },
];
const mid: Token[] = [
  { text: "suma impacto", x: 32, y: 40, size: 70, delay: 52, color: "#1B4332", shadow: GLOW, entrance: "typewriter", perChar: 3, exitAt: 150 },
];
const payoff: Token[] = [
  { text: "para cuando llegue", x: 35, y: 70, size: 54, delay: 158, color: "#1B4332", shadow: GLOW, weight: 700, entrance: "fromLeft" },
  { text: "Moments", x: 55, y: 83, size: 176, delay: 168, color: "#1B4332", shadow: GLOW, weight: 900, entrance: "assemble", perChar: 3 },
];

// Sección del móvil sobre fondo OSCURO (resalta la pantalla)
const FeelSection: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(160deg, #0C1611, #080D0A)" }}>
    {/* glow verde detrás del móvil */}
    <AbsoluteFill style={{ background: "radial-gradient(42% 40% at 50% 46%, rgba(143,214,120,0.22), rgba(0,0,0,0) 70%)" }} />
    <Phone />
    <Co2Callout at={46} />
    <KineticWords tokens={intro} />
    <KineticWords tokens={mid} />
    <KineticWords tokens={payoff} />
  </AbsoluteFill>
);

export const ProtoFeel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ background: "#0C1611" }}>
      <Sequence from={0} durationInFrames={150}>
        <IntroChat />
      </Sequence>
      <Sequence from={150} durationInFrames={220}>
        <FeelSection />
      </Sequence>
    </AbsoluteFill>
  );
};
