import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";
import { useHandheld } from "./atmosphere";

// ── Teléfono héroe cinematográfico ───────────────────────────────────────────
// Marco realista + entrada 3D + deriva "en mano" + derrame de luz de pantalla.
export const HeroPhone: React.FC<{
  src: string;
  startFrom?: number;
  playbackRate?: number;
  tint?: string;
  glow?: string;
  height?: number;
  entrance?: "up" | "left" | "right" | "none";
  handheld?: number;
  offsetX?: number;
}> = ({
  src,
  startFrom = 0,
  playbackRate = 1,
  tint,
  glow = "rgba(143,214,120,0.55)",
  height = 1300,
  entrance = "up",
  handheld = 1,
  offsetX = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hh = useHandheld(handheld);

  const p = spring({ frame, fps, config: { damping: 18, mass: 1.5, stiffness: 60 } });
  let inX = 0;
  let inY = 0;
  let inRot = 0;
  const inScale = interpolate(p, [0, 1], [0.86, 1]);
  if (entrance === "up") inY = interpolate(p, [0, 1], [520, 0]);
  if (entrance === "left") {
    inX = interpolate(p, [0, 1], [-720, 0]);
    inRot = interpolate(p, [0, 1], [22, 0]);
  }
  if (entrance === "right") {
    inX = interpolate(p, [0, 1], [720, 0]);
    inRot = interpolate(p, [0, 1], [-22, 0]);
  }

  const width = height * 0.492;
  const bezel = 18;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", perspective: 2000 }}>
      {/* derrame de luz de la pantalla sobre el ambiente */}
      <div
        style={{
          position: "absolute",
          width: width * 2.6,
          height: height * 1.5,
          left: `calc(50% + ${offsetX + hh.x * 2}px)`,
          top: "50%",
          transform: "translate(-50%,-50%)",
          filter: "blur(120px)",
          background: `radial-gradient(50% 42% at 50% 45%, ${glow}, rgba(0,0,0,0) 72%)`,
          opacity: interpolate(p, [0, 1], [0, 1]),
        }}
      />
      <div
        style={{
          transform: `translate(${inX + offsetX + hh.x}px, ${inY + hh.y}px) rotateY(${inRot}deg) rotate(${hh.rot}deg) scale(${inScale})`,
          width: width + bezel * 2,
          height: height + bezel * 2,
          borderRadius: 82,
          background: "linear-gradient(155deg,#252a31,#0a0c10)",
          padding: bezel,
          boxShadow:
            "0 70px 140px rgba(12,32,20,0.5), 0 20px 50px rgba(12,32,20,0.4), inset 0 0 0 2px rgba(255,255,255,0.10)",
          position: "relative",
        }}
      >
        <div
          style={{
            width,
            height,
            borderRadius: 66,
            overflow: "hidden",
            background: "#000",
            position: "relative",
          }}
        >
          <OffthreadVideo
            src={staticFile(src)}
            startFrom={startFrom}
            playbackRate={playbackRate}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
          {tint ? (
            <AbsoluteFill style={{ background: tint, mixBlendMode: "soft-light" }} />
          ) : null}
          {/* isla dinámica */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              width: 108,
              height: 31,
              borderRadius: 999,
              background: "#000",
            }}
          />
          {/* reflejo de vidrio que se mueve con la cámara */}
          <AbsoluteFill
            style={{
              background: `linear-gradient(${112 + hh.rot * 6}deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 34%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Pastilla de subtítulo estilo editorial (ref. ElevenLabs) ──────────────────
// Etiqueta gris/blanca pequeña, discreta: deja el protagonismo a la imagen y
// respira para la voz en off.
export const PillLabel: React.FC<{
  children: React.ReactNode;
  x?: number;
  y?: number;
  delay?: number;
  dark?: boolean;
  size?: number;
}> = ({ children, x = 50, y = 86, delay = 0, dark = false, size = 46 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200, mass: 0.6 } });
  const op = interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%,-50%) translateY(${(1 - s) * 16}px)`,
        opacity: op,
        padding: "16px 30px",
        borderRadius: 999,
        background: dark ? "rgba(16,34,22,0.82)" : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 14px 40px rgba(12,32,20,0.18)",
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: size,
        color: dark ? "#EFF6EE" : COLORS.ink,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};

// ── Tarjeta flotante con línea conectora (ref. ElevenLabs) ────────────────────
// Un panel (imagen) que se despega y flota en el espacio, unido por una línea fina.
export const FloatCard: React.FC<{
  img: string;
  x: number;
  y: number;
  w?: number;
  delay?: number;
  rot?: number;
  from?: { x: number; y: number };
}> = ({ img, x, y, w = 300, delay = 0, rot = 0, from = { x: 50, y: 50 } }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hh = useHandheld(0.6);
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, mass: 0.9, stiffness: 90 } });
  const px = interpolate(s, [0, 1], [from.x, x]);
  const py = interpolate(s, [0, 1], [from.y, y]);
  const line = interpolate(frame - delay, [6, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <line
          x1={`${from.x}%`}
          y1={`${from.y}%`}
          x2={`${px}%`}
          y2={`${py}%`}
          stroke={COLORS.sage300}
          strokeWidth={2}
          strokeDasharray="4 7"
          opacity={line * 0.7}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: `${px + hh.x * 0.15}%`,
          top: `${py + hh.y * 0.12}%`,
          transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
          width: w,
          opacity: interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          borderRadius: 22,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 26px 60px rgba(12,32,20,0.22)",
        }}
      >
        <Img src={staticFile(img)} style={{ width: "100%", display: "block" }} />
      </div>
    </>
  );
};

// ── Panel de impacto full-bleed (ref. Compile countdown) ──────────────────────
// Color pleno + número/palabra grande que golpea. Un solo concepto por plano.
export const ImpactPanel: React.FC<{
  bg: string;
  children: React.ReactNode;
}> = ({ bg, children }) => {
  const frame = useCurrentFrame();
  const wipe = spring({ frame, fps: 30, config: { damping: 200, mass: 0.5 } });
  return (
    <AbsoluteFill style={{ background: bg, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.12) 100%)",
          transform: `translateY(${interpolate(wipe, [0, 1], [-40, 0])}px)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

// Número tipo odómetro (grande, marca). Sube de `from` a `to`.
export const BigCounter: React.FC<{
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  size?: number;
  over?: number;
  delay?: number;
}> = ({ from = 0, to, prefix = "", suffix = "", color = "#fff", size = 340, over = 55, delay = 6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const val = Math.round(
    interpolate(frame - delay, [0, over], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );
  const pop = spring({ frame: frame - delay, fps, config: { damping: 12, mass: 0.8 } });
  return (
    <div
      style={{
        fontFamily: FONTS.display,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1,
        color,
        letterSpacing: -6,
        transform: `scale(${interpolate(pop, [0, 1], [0.7, 1])})`,
        textShadow: "0 18px 60px rgba(0,0,0,0.22)",
      }}
    >
      {prefix}
      {val}
      {suffix}
    </div>
  );
};
