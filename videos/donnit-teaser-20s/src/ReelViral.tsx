import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "./theme";
import { loadFonts } from "./load-fonts";
import { Grain } from "./cine/atmosphere";
import { GlowReveal } from "./cine/GlowReveal";

// ═══════════════════════════════════════════════════════════════════════════
//  ReelViral — Reel de Instagram optimizado para retención/viralidad.
//  Footage real (silla de oficina encontrada en la calle) + capas de texto de
//  marca Donnit. Arco: HOOK → desarrollo (subtítulos) → giro → cierre + CTA.
//
//  Recursos "pro-algoritmo":
//   · Hook de texto en <1s (frena el scroll).
//   · Subtítulos narrativos legibles sin sonido (la mayoría mira en mudo).
//   · Palabras clave resaltadas + tipografía de marca (DM Sans / Inter).
//   · Scrim para contraste, watermark @donnit para reconocimiento.
//   · Cierre con CTA de guardado/seguimiento/comentario (engagement).
// ═══════════════════════════════════════════════════════════════════════════

const SRC = "footage/WhatsApp Video 2026-07-30 at 19.42.02.mp4";
const VIDEO_END = 720; // 24s @30fps
const OUTRO = 160;

// Zona segura de Instagram: dejamos margen arriba (usuario) y abajo (UI/caption).
const SAFE = { hookY: 15, capY: 74 };

// ── Fondo: video con relleno desenfocado 9:16 + audio original ────────────────
const VideoLayer: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0c1a12" }}>
    <OffthreadVideo
      src={staticFile(SRC)}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(30px) brightness(0.5)", transform: "scale(1.1)" }}
    />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <OffthreadVideo
        src={staticFile(SRC)}
        volume={(f) => interpolate(f, [VIDEO_END - 30, VIDEO_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </AbsoluteFill>
  </AbsoluteFill>
);

// Scrim superior/inferior para que el texto siempre se lea.
const Scrim: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 460, background: "linear-gradient(180deg, rgba(8,20,14,0.72) 0%, rgba(8,20,14,0) 100%)" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 620, background: "linear-gradient(0deg, rgba(8,20,14,0.82) 0%, rgba(8,20,14,0) 100%)" }} />
  </AbsoluteFill>
);

// Watermark de marca (reconocimiento).
const Watermark: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [10, 25], [0, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 54, left: 46, display: "flex", alignItems: "center", gap: 16, opacity: op }}>
      <Img src={staticFile("DonnitLogo.png")} style={{ width: 66, height: 66, borderRadius: 18, boxShadow: "0 6px 18px rgba(0,0,0,0.4)" }} />
      <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 40, color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>@donnit</span>
    </div>
  );
};

// Badge de guardado (empuja el "save", señal fuerte para el algoritmo).
const SaveBadge: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const inS = interpolate(frame, [from, from + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outS = interpolate(frame, [to - 8, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  const op = inS * outS;
  if (op <= 0) return null;
  return (
    <div style={{ position: "absolute", top: 150, right: 46, opacity: op, transform: `scale(${pulse})`, padding: "12px 22px", borderRadius: 999, background: COLORS.freeGreen, color: COLORS.greenInk, fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, boxShadow: "0 10px 26px rgba(0,0,0,0.35)" }}>
      Guardalo 🔖
    </div>
  );
};

// Palabra/segmento con resaltado opcional en verde (chip).
type Seg = { t: string; hi?: boolean };
const renderSegs = (segs: Seg[]) =>
  segs.map((s, i) =>
    s.hi ? (
      <span key={i} style={{ background: COLORS.freeGreen, color: COLORS.greenInk, padding: "2px 14px", borderRadius: 12, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
        {s.t}
      </span>
    ) : (
      <span key={i}>{s.t}</span>
    )
  );

// HOOK: texto grande arriba, entrada con impacto.
const Hook: React.FC<{ from: number; to: number; segs: Seg[]; size?: number }> = ({ from, to, segs, size = 96 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - from, fps, config: { damping: 12, mass: 0.8, stiffness: 120 } });
  const outO = interpolate(frame, [to - 10, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const inO = interpolate(frame - from, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = inO * outO;
  if (op <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: `${SAFE.hookY}%`, textAlign: "center", opacity: op, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})` }}>
      <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: size, lineHeight: 1.06, color: "#fff", letterSpacing: -1.5, textShadow: "0 4px 20px rgba(0,0,0,0.55)" }}>
        {renderSegs(segs)}
      </span>
    </div>
  );
};

// Subtítulo narrativo (abajo, dentro de zona segura).
const Cap: React.FC<{ from: number; to: number; segs: Seg[]; size?: number }> = ({ from, to, segs, size = 62 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - from, fps, config: { damping: 200, mass: 0.6 } });
  const inO = interpolate(frame - from, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outO = interpolate(frame, [to - 8, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = inO * outO;
  if (op <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: `${SAFE.capY}%`, textAlign: "center", opacity: op, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)` }}>
      <span
        style={{
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.22,
          color: "#fff",
          letterSpacing: -0.5,
          background: "rgba(8,20,14,0.55)",
          padding: "10px 8px",
          borderRadius: 16,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          textShadow: "0 3px 14px rgba(0,0,0,0.5)",
        }}
      >
        {renderSegs(segs)}
      </span>
    </div>
  );
};

// Cierre con CTA de engagement encima del revelado de marca.
const OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cta = spring({ frame: frame - 70, fps: 30, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <GlowReveal
        title="donnit"
        tagline={[
          { text: "Dona lo que no usás", color: COLORS.green },
          { text: ", ", color: "rgba(255,255,255,0.8)" },
          { text: "alquila lo que necesitás", color: COLORS.turq300 },
        ]}
      />
      <div style={{ position: "absolute", left: 60, right: 60, bottom: 260, textAlign: "center", opacity: cta, transform: `translateY(${(1 - cta) * 20}px)` }}>
        <div style={{ display: "inline-block", padding: "18px 34px", borderRadius: 999, background: COLORS.freeGreen, color: COLORS.greenInk, fontFamily: FONTS.display, fontWeight: 800, fontSize: 46, boxShadow: "0 14px 34px rgba(0,0,0,0.35)" }}>
          Seguí @donnit · Guardá este video 🔖
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ReelViral: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a12" }}>
      <Sequence from={0} durationInFrames={VIDEO_END + 12}>
        <VideoLayer />
        <Scrim />
        <Watermark />

        {/* HOOK (0–2.6s) */}
        <Hook from={2} to={78} segs={[{ t: "Esto estaba " }, { t: "TIRADO", hi: true }, { t: " en la calle 🗑️" }]} />
        <SaveBadge from={40} to={150} />

        {/* Desarrollo */}
        <Cap from={86} to={196} segs={[{ t: "Una silla de oficina. " }, { t: "Impecable", hi: true }, { t: "." }]} />
        <Cap from={204} to={320} segs={[{ t: "La probé… " }, { t: "anda perfecta ✅", hi: true }]} />
        <Cap from={330} to={452} segs={[{ t: "¿Lo mejor? Es " }, { t: "GRATIS", hi: true }, { t: "." }]} />

        {/* Giro / mensaje de marca */}
        <Cap from={462} to={588} segs={[{ t: "Lo que uno tira, " }, { t: "para otro es un tesoro", hi: true }]} />
        <Cap from={598} to={716} segs={[{ t: "Eso que ya no usás, " }, { t: "a un vecino le sirve 🌱", hi: true }]} />
      </Sequence>

      {/* Cierre + CTA (crossfade con el final del video) */}
      <Sequence from={VIDEO_END} durationInFrames={OUTRO}>
        <OutroCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

export const REEL_VIRAL_TOTAL = VIDEO_END + OUTRO;
